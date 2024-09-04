const SEARCH_TAG_NAMES = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
const SEARCH_BAR_ID = "searchBar";
const NO_RESULTS_DIV_ID = "ruleset-no-results";
let NO_RESULTS_DIV = null;
let RULESET_ELEMENTS = null;
let NODE_MAP = null;
let HEAD_NODE = "H0";

function treeifyHeaders() {
  const stack = [{domNode: {tagName: "H0"}, children: [], parent: null}];
  const nodeMap = new Map();
  nodeMap[HEAD_NODE] = stack[0];
  const rulesetElements = document.querySelectorAll(SEARCH_TAG_NAMES.join(","))
  for (const rulesetElement of rulesetElements) {
    const node = {
      domNode: rulesetElement,
      children: [],
      parent: null
    };

    // find parent header; happens to work because "P" > "H6"
    let last = stack.at(-1);
    while (last.domNode.tagName >= node.domNode.tagName) {
      stack.pop();
      last = stack.at(-1);
    }
    last.children.push(node);
    node.parent = last;
    stack.push(node);
    nodeMap[`${node.domNode.tagName}-${node.domNode.textContent}`] = node;
  }
  return [rulesetElements, nodeMap];
};

function getAllChildren(node) {
  return node.children.reduce((acc, child) => acc.concat(child, getAllChildren(child)), []);
}

function getAllParents(node) {
  return node.parent ? [node.parent].concat(getAllParents(node.parent)) : [];
}

function filterRuleset() {
  const filter = this.value.toLowerCase().trim();
  if (filter == "") {
    RULESET_ELEMENTS.forEach(rulesetElement => {
      rulesetElement.classList.remove("hidden");
      if (rulesetElement.tagName != "P") {
        document.getElementById(`navigation-${rulesetElement.tagName}-${rulesetElement.id}`).classList.remove("hidden");
      }
    });
    NO_RESULTS_DIV.classList.remove("hidden");
    return;
  }

  const toShow = new Set();
  RULESET_ELEMENTS.forEach(rulesetElement => {
    if (rulesetElement.textContent.toLowerCase().includes(filter)) {
      toShow.add(rulesetElement);
      const headingTreeNode = NODE_MAP[`${rulesetElement.tagName}-${rulesetElement.textContent}`];

      // if a heading matches, all content under it should be shown
      getAllChildren(headingTreeNode).forEach(child => {
        toShow.add(child.domNode);
      });

      // if any element matches, all the headings leading to it should be shown
      getAllParents(headingTreeNode).forEach(parent => {
        toShow.add(parent.domNode);
      });
    }
  });

  RULESET_ELEMENTS.forEach(rulesetElement => {
    if (!toShow.has(rulesetElement)) {
      rulesetElement.classList.add("hidden");
      if (rulesetElement.tagName != "P") {
        document.getElementById(`navigation-${rulesetElement.tagName}-${rulesetElement.id}`).classList.add("hidden");
      }
    } else {
      rulesetElement.classList.remove("hidden");
      if (rulesetElement.tagName != "P") {
        document.getElementById(`navigation-${rulesetElement.tagName}-${rulesetElement.id}`).classList.remove("hidden");
      }
    }
  });

  let allHidden = true;
  RULESET_ELEMENTS.forEach(rulesetElement => {
    if (!rulesetElement.classList.contains("hidden")) {
      allHidden = false;
    }
  });

  if (allHidden) {
    NO_RESULTS_DIV.classList.remove("hidden");
  } else {
    NO_RESULTS_DIV.classList.add("hidden");
  }

}

function generateList(headNodes) {
  let list = `<ul>`;
  headNodes.forEach(child => {
    if (child.domNode.tagName != "P") {
      list += `<li id="navigation-${child.domNode.tagName}-${child.domNode.id}"><a href="#${child.domNode.id}">${child.domNode.textContent}</a>${generateList(child.children)}</li>`;
    }
  });
  return list + '</ul>';
}

function generateAnchors(headNodes) {
  getAllChildren(NODE_MAP[HEAD_NODE]).forEach(rulesetElement => {
    if (rulesetElement.domNode.tagName != "P") {
      const anchor = rulesetElement.domNode.textContent
                                   .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                                   .replace(/ /g, "-")
                                   .toLowerCase();
      rulesetElement.domNode.id = anchor;
    }
  });
}

window.onload = function() {
  [RULESET_ELEMENTS, NODE_MAP] = treeifyHeaders();
  document.getElementById(SEARCH_BAR_ID).addEventListener("input", filterRuleset);
  generateAnchors();
  document.getElementById("navigator").innerHTML = generateList(NODE_MAP[HEAD_NODE].children);
  NO_RESULTS_DIV = document.getElementById(NO_RESULTS_DIV_ID);
}
