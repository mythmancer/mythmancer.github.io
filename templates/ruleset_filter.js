const SEARCH_TAG_NAMES = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
const SEARCH_BAR_ID = "searchBar";
let RULESET_ELEMENTS = null;
let NODE_MAP = null;

function treeifyHeaders() {
  const stack = [{domNode: {tagName: "H0"}, children: [], parent: null}];
  const nodeMap = new Map();
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
    });
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
    } else {
      rulesetElement.classList.remove("hidden");
    }
  });
}

window.onload = function() {
  [RULESET_ELEMENTS, NODE_MAP] = treeifyHeaders();
  document.getElementById(SEARCH_BAR_ID).addEventListener("input", filterRuleset);
}
