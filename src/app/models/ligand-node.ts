
import {Node, NodeSerializer} from '../tools/force-directed-graph/fdg-core/graph-component/models/node';

export class LigandNode extends Node {
  type = 'ligand';
  Data_Source: string;
  Ligand_Activity_Source: string;
  LyChI_L1: string;
  LyChI_L2: string;
  LyChI_L3: string;
  LyChI_L4: string;
  Ligand_Source: string;
  Ligand_Activity: string;
  CHEMBL_Canonical_SMILES: string;
  image: string;
  IC50: number;
  IDG_Ligand: number;
}

export class LigandNodeSerializer implements NodeSerializer {
  fromJson (obj: any, id?: string): LigandNode {
    const node = new LigandNode();
    Object.entries((obj)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }

  toJson() {}

  mergeNodes(node: LigandNode, data: any): LigandNode {
    Object.entries((data)).forEach((prop) => node[prop[0]] = prop[1]);
    return node;
  }
}

