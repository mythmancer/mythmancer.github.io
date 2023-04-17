#!/usr/bin/env python

import argparse
import json
import sys

from bs4 import BeautifulSoup

def parse_spells(spells_type, output_dir):
    with open(f"{spells_type}_spells.html") as f:
        bs = BeautifulSoup(f.read(), "html.parser")

    bs_nodes = [c for c in bs.children]

    # parse HTML into nice friendly JSON
    spells = [(bs_nodes[4*i], bs_nodes[4*i + 2]) for i in range(len(bs_nodes) // 4)]
    spells = [([c for c in s[0].children][0].get_text(), s[1]) for s in spells]
    spells_d = {s[0]: s[1] for s in spells}

    # to make sure no spells names are repeated across levels
    assert len(spells) == len(spells_d)
    spells = spells_d
    spells = {s[0]: [c for c in s[1].children] for s in spells.items()}
    spells = {
        s[0]: {
            "Type": s[1][1].get_text().strip(),
            "Details": "\n".join([s.get_text() for s in s[1][4:]]).strip(),

            # temporary, will be cleaned up and removed next
            "table": [t.get_text() for t in s[1][3].findAll("td")],
        }
        for s in spells.items()
    }

    for k in spells:
        td = {spells[k]["table"][2*i][:-1]: spells[k]["table"][2*i+1] for i in range(len(spells[k]["table"]) // 2)}
        td["Components"] = ''.join(td["Components"].split(','))
        td["Level"] = td["Level"].split()[-1]
        for td_k in td:
            assert td_k not in spells[k]
            spells[k][td_k] = td[td_k]
        del spells[k]["table"]

    json_string = json.dumps(spells, indent=2)
    if output_dir:
        with open(f"{output_dir}/{spells_type}_spells.json", "w") as f:
            f.write(json_string)
    else:
        print(json_string)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('-t', '--spells-type')
    parser.add_argument('-d', '--dir')

    args = parser.parse_args()
    spells_type = args.spells_type
    output_dir = args.dir

    parse_spells(spells_type, output_dir)
