import {Ligand} from './ligand';
import {Publication} from './publication';

/**
 * Ligand Activity class, acts as a wrapper around a Ligand object
 */
export class LigandActivity {
  /**
   * optional internal activity ID
   */
  actid?: number;

  /**
   * ligand Activity type
   */
  type?: string;

  /**
   * activity value
   */
  value?: number;

  /**
   * ligand Mechanism of Action
   */
  moa?: string;

  /**
   * activity reference
   */
  reference?: string;

  /**
   * ligand object itself
   */
  ligand?: Ligand;

  /**
   * list of publications that this ligand activity is relevant to
   */
  pubs?: Publication[];
}
