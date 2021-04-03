import {PharosBase, PharosSerializer} from './pharos-base';
import {LigActSerializer, LigandActivity} from './ligand-activity';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';
import {LIGANDDETAILSFIELDS, LIGANDDETAILSQUERY, LIGANDLISTFIELDS} from './target-components';

/**
 * ligand object
 */
export class Ligand extends PharosBase {

  /**
   * fragment of common fields. fetched by the route resolver
   */
  static ligandListFragments = LIGANDLISTFIELDS;
  static ligandDetailsFragments = LIGANDDETAILSFIELDS;
  static ligandDetailsQuery = LIGANDDETAILSQUERY;

  ligid: string;
  description?: string;
  synonyms?: any[];
  chemblName: string;
  pubChemID?: string;
  smiles?: string;
  activityCount: number;
  isdrug: boolean;

  /**
   * name of ligand
   */
  name?: string;

  /**
   * list of activities
   * not returned by api
   */
  activities?: any;
  activitiesMap: Map<string, { target: any, activities: LigandActivity[] }>;

  /**
   * url for structure image
   */
  imageUrl?: string;

  /*
  Retrieves an array of synonyms suitable for displaying as a property
   */
  public synonymLabels() {
    const labels = [];
    const linkName = (this.isdrug ? this.name : null);
    if (linkName) {
      labels.push({label: 'NCATS Inxight: Drugs', term: linkName, externalLink: `https://drugs.ncats.io/drug/${linkName}`});
    }
    if (!this.isdrug){
      labels.push({label: 'Name', term: this.name});
    }

    for (const syn of this.synonyms) {
      const source = syn.name;
      const id = syn.value;
      let link = '';
      if (source === 'DrugCentral') {
        link = 'http://drugcentral.org/drugcard/' + id;
      } else if (source === 'ChEMBL') {
        link = 'https://www.ebi.ac.uk/chembl/compound_report_card/' + id + '/';
      } else if (source === 'PubChem') {
        link = 'https://pubchem.ncbi.nlm.nih.gov/compound/' + id;
      } else if (source === 'Guide to Pharmacology') {
        link = 'http://www.guidetopharmacology.org/GRAC/LigandDisplayForward?ligandId=' + id;
      }
      labels.push({label: source, term: id, externalLink: link});
    }
    return labels;
  }

}

/**
 * serializer for ligand object operations
 */
export class LigandSerializer implements PharosSerializer {

  /**
   * no args constructor
   */
  constructor() {
  }

  /**
   * create ligand object from json
   * @param json
   * @return {Ligand}
   */
  fromJson(json: any): Ligand {
    if (json.parsed) { // cached data is sometimes already parsed
      return json;
    }
    const obj = new Ligand();
    obj.parsed = true;

    Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

    if (json.synonyms) {
      json.synonyms.forEach(syn => {
        if (syn.name === 'ChEMBL') {
          obj.chemblName = syn.value;
        }
        if (syn.name === 'PubChem') {
          obj.pubChemID = syn.value;
        }
      });
    }

    if (json.activities) {
      const actMap: Map<string, { target: any, activities: LigandActivity[] }> =
        new Map<string, { target: any, activities: LigandActivity[] }>();
      const ligActSerializer: LigActSerializer = new LigActSerializer();
      json.activities.forEach(act => {
        const currSymbol = act.target?.symbol || 'default';
        if (actMap.has(currSymbol)) {
          const acts = actMap.get(currSymbol);
          acts.activities.push(ligActSerializer.fromJson(act));
          actMap.set(currSymbol, acts);
        } else {
          actMap.set(currSymbol, {target: act.target, activities: [ligActSerializer.fromJson(act)]});
        }
      });
      obj.activities = [...actMap.values()].sort((a, b) => b.activities.length - a.activities.length);
      obj.activitiesMap = actMap;
    }

    return obj;
  }

  /**
   * flatten object to json
   * @param {PharosBase} obj
   * @return {any}
   */
  toJson(obj: PharosBase): any {
    return [];
  }

  /**
   * return objec as pharos properties
   * @param {PharosBase} obj
   * @return {any}
   * @private
   */
  _asProperties(obj: any): any {
    const newObj: any = this._mapField(obj);

    if (newObj.activities) {
      newObj.activities.forEach(activity => {
        if (activity.activities) {
          activity.activities.forEach(act => {
            if (act.pmids) {
              const dpArray = [];
              for (const pmid of act.pmids.term.split(',')) {
                const cleanPmid = pmid.trim();
                dpArray.push(new DataProperty({
                  term: cleanPmid, name: 'pmids', label: 'pmids',
                  externalLink: `http://www.ncbi.nlm.nih.gov/pubmed/${cleanPmid}`
                }));
              }
              act.pmids = dpArray;
            }
            if (act.reference && act.reference.term) {
              if (act.reference.term.substring(0, 7) === 'http://' || act.reference.term.substring(0, 8) === 'https://') {
                act.reference.externalLink = act.reference.term;
              }
            }
          });
        }
      });
    }

    return newObj;
  }

  /**
   * recursive mapping function
   * @param obj
   * @return {{}}
   * @private
   */
  private _mapField(obj: any) {
    const retObj: {} = Object.assign({}, obj);
    Object.keys(obj).map(objField => {
      if (Array.isArray(obj[objField])) {
        retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
      } else {
        retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
      }
    });
    return retObj;
  }
}
