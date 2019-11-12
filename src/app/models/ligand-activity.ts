import {Ligand} from './ligand';
import {Publication} from './publication';

export class LigandActivity {
  actid?: number;
  type?: string;
  value?: number;
  moa?: string;
  reference?: string;
  ligand?: Ligand;
  pubs?: Publication[];
}
