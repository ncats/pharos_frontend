import {PharosBase, PharosSerializer} from './pharos-base';
import {DataProperty} from '../tools/generic-table/components/property-display/data-property';
import {Publication, PublicationSerializer} from './publication';
import {Disease, DiseaseSerializer} from './disease';
import {Generif, GenerifSerializer} from './generif';
import {Ortholog, OrthologSerializer} from './ortholog';
import {Ligand, LigandSerializer} from './ligand';
import {TARGETDETAILSFIELDS, TARGETDETAILSQUERY, TARGETLISTEXTRAS, TARGETLISTFIELDS} from "./target-components";
import {Facet} from "./facet";
import {InteractionDetails} from "./interaction-details";
import {DiseaseAssocationSerializer, DiseaseAssociation} from "./disease-association";
import {VirusDetails, VirusDetailsSerializer} from "./virus-interactions";
import {Pathway, PathwaySerializer} from "./pathway";
import {PantherClass} from "./pantherClass";
import {SimilarityDetails} from "./similarityDetails";


/**
 * main target object
 */
export class Target extends PharosBase {
    /**
     * fragment of common fields. fetched by the route resolver
     */
    static targetListFragments = TARGETLISTFIELDS;
    static targetListExtras = TARGETLISTEXTRAS;
    /**
     * fragment of common fields. fetched by the route resolver
     */
    static targetDetailsFragments = TARGETDETAILSFIELDS;

    static targetDetailsQuery = TARGETDETAILSQUERY;
    /**
     * target name
     */
    name: string;

    /**
     * target gene name
     */
    gene: string;

    /**
     * target accession id
     */
    accession: string;

    /**
     * target description
     */
    description: string;

    /**
     * idg family distinction
     */
    idgFamily: string;

    /**
     * idg development level
     */
    idgTDL: string;

    /**
     * idg novelty score
     */
    novelty: number;
    logNovelty: number;

    /**
     * text mined publication score
     */
    jensenScore: number;

    /**
     * list of uniprot ids
     */
    uniprotIds: string[] | any[];

    /**
     * list of gene symbols
     */
    symbols: string[];

    /**
     * gene sequence
     */
    sequence: string;

    /**
     * list of pdb ids
     */
    pdbs: any[];

    /**
     * list of harmonizome data
     */
    hgdata: any[];

    /**
     * antibodipedia.org antibody count
     */
    antibodyCount: number;
    antibodyURL: string;
    /**
     * Gene RiF count
     */
    generifCount: number;

    /**
     * list of approved drugs
     */
    drugs: Ligand[];

    /**
     * list of active ligands
     */
    ligands: Ligand[];

    /**
     * array of pubtator scores for timeline
     */
    pubTatorScores: [{ year, score }];

    /**
     * array of pubmed scores for timeline
     */
    pubmedScores: [{ year, score }];

    /**
     * array of patent counts for timeline
     */
    patentCounts: [{ year, count }];

    /**
     * list of ensembl ids
     */
    ensemblIDs: any[];

    /**
     * count og GO terms
     */
    goCount: GoCounts;

    /**
     * number of OMIM phenotypes
     */
    omimCount: number;

    /**
     * monoclonal count
     * // todo: not used
     */
    monoclonalCount: number;

    /**
     * number of publications
     */
    pubmedCount: number;

    /**
     * pageable list of associated diseases
     * todo see how this relates to the disease association object
     */
    diseases: Disease[];

    /**
     * number of associated diseases
     */
    diseaseCount: number;

    /**
     * tin-x data
     */
    tinx: any;

    /**
     * number of patents
     */
    patentCount: number;

    /**
     * knowledge availability score
     */
    knowledgeAvailability: number;

    /**
     * pubtator literature score
     */
    pubTatorScore: number;

    /**
     * number of associated publications
     */
    publicationCount: number;

    /**
     * pageable list of associated publications
     */
    publications: Publication[];

    /**
     * pageable list of generifs
     */
    generifs: Generif[];

    /**
     * pageable list of orthologs
     */
    orthologs: Ortholog[];

    /**
     * number of orthologs
     */
    orthologCounts: number;

    /**
     * pageable list of protein-protein interactions
     */
    ppis: Target[];

    /**
     * number of protein-protein interactions
     */
    ppiCount: number | any[];

    /**
     * list of expression data
     */
    expressions: any[];

    ligandCount = 0;

    drugCount = 0;

    goComponent: string[];
    goFunction: string[];
    goProcess: string[];
    uniprotKeyword: string[];
    gwasTrait: string[];
    mgiPhenotype: string[];
    hpaTissueSpecificityIndex: [{ name, value }];
    hpmProteinTissueSpecificityIndex: [{ name, value }];
    gtexTissueSpecificityIndex: [{ name, value }];
    hpaRNATissueSpecificityIndex: [{ name, value }];
    hpaProteinTissueSpecificity: [{ name, value }];
    hpmGeneTissueSpecificityIndex: [{ name, value }];
    pantherClasses: PantherClass[] = [];
    dto: string[];

    properties: DataProperty[] = [];
    interactionDetails?: InteractionDetails;
    diseaseAssociationDetails?: DiseaseAssociation[] = [];
    similarityDetails?: SimilarityDetails;
    interactingViruses?: VirusDetails[];

    pathways?: Pathway[] = [];
    pathwayMap?: Map<string, Pathway[]>;
    pathwayCount?: number;
    pathwayCounts?: any[];

    dataSources?: String[] = [];

    sequence_variants?: {startResidue: number, residue_info: {aa: string, bits: number}[]};
}

export class GoCounts {
    components: number;
    functions: number;
    processes: number;

    TBioCount() {
        return this.functions + this.processes;
    }

    total() {
        return this.functions + this.processes + this.components;
    }

    constructor(json: any) {
        this.processes = json.find(type => {
            return type.name === "P";
        })?.value || 0;
        this.functions = json.find(type => {
            return type.name === "F";
        })?.value || 0;
        this.components = json.find(type => {
            return type.name === "C";
        })?.value || 0;
    }
}

/**
 * serializer for target object operations
 */
export class TargetSerializer implements PharosSerializer {

    /**
     * no args constructor
     */
    constructor() {
    }

    /**
     * create target object from json
     * @param json
     * @return {Target}
     */
    fromJson(json: any): Target {
        if (json.parsed) { // cached data is sometimes already parsed
            return json;
        }
        const obj = new Target();
        obj.parsed = true;
        Object.entries((json)).forEach((prop) => obj[prop[0]] = prop[1]);

        if (json.interactingViruses) {
            const virusDetailsSerializer = new VirusDetailsSerializer();
            obj.interactingViruses = json.interactingViruses.map(virus => virusDetailsSerializer.fromJson(virus));
            obj.interactingViruses = obj.interactingViruses.sort((a, b) => {
                return VirusDetails.sort(b, a);
            });
        }

        if (json.pathways && json.pathways.length > 0) {
            obj.pathwayCounts = obj.pathwayCounts.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            let pathwaySerializer = new PathwaySerializer();
            obj.pathwayMap = new Map<string, Pathway[]>();
            json.pathways.forEach(jpath => {
                const pathObj = pathwaySerializer.fromJson(jpath);
                const pwType = pathObj.type.split(':')[0];
                let pathList: Pathway[];
                if (obj.pathwayMap.has(pwType)) {
                    pathList = obj.pathwayMap.get(pwType);
                } else {
                    pathList = [];
                    obj.pathwayMap.set(pwType, pathList);
                }
                pathList.push(pathObj);
            });
        }

        if (json.expressions) { // deduplicate expresssions, and translate uberon ID
            let map = new Map<string, any>();
            for (let i = 0; i < json.expressions.length; i++) {
                if (json.expressions[i].uberon && json.expressions[i].uberon.uid) {
                    json.expressions[i].uberon.uid = json.expressions[i].uberon.uid.replace(':', '_');
                }
                map.set(JSON.stringify(json.expressions[i]), json.expressions[i]);
            }
            obj.expressions = Array.from(map.values());
        }
        /**
         * mapping graphql responses, since they are returned as arrays
         */
        if (json.novelty) {
            obj.novelty = +json.novelty.toFixed(2);
            obj.logNovelty = +Math.log(json.novelty).toFixed(2);
        }

        if (json.jensenScore && json.jensenScore.length) {
            obj.jensenScore = +(+json.jensenScore[0].value).toFixed(2);
        }

        if (json.pubTatorScore && json.pubTatorScore.length) {
            obj.pubTatorScore = +(+json.pubTatorScore[0].value).toFixed(2);
        }

        if (json.antibodyCount && json.antibodyCount.length) {
            obj.antibodyCount = +(+json.antibodyCount[0].value).toFixed(2);
        }

        if (json.antibodyURL && json.antibodyURL.length) {
            obj.antibodyURL = json.antibodyURL[0].value;
        }

        if (json.ppiCount) {
            if (json.ppiCount.length > 0) {
                obj.ppiCount = json.ppiCount.reduce((prev, cur) => Math.max(prev, cur.value), 0);
            }
        }

        if (json.interactionDetails) {
            obj.interactionDetails = {
                dataSources: json.interactionDetails.ppitypes ? json.interactionDetails.ppitypes.split(",") : [],
                evidence: json.interactionDetails.evidence,
                interaction_type: json.interactionDetails.interaction_type,
                score: json.interactionDetails.score,
                p_int: json.interactionDetails.p_int,
                p_ni: json.interactionDetails.p_ni,
                p_wrong: json.interactionDetails.p_wrong
            };
        }

        if (json.diseaseAssociationDetails) {
            const assocationSerializer = new DiseaseAssocationSerializer();
            obj.diseaseAssociationDetails = json.diseaseAssociationDetails.map(assoc => assocationSerializer.fromJson(assoc));
        }

        if (json.uniprotIds) {
            obj.uniprotIds = [{uniprotId: obj.accession}, ...json.uniprotIds.map(id => id = {uniprotId: id.value})];
        } else {
            obj.uniprotIds = [{uniprotId: obj.accession}];
        }

        if (json.ensemblIDs) {
            obj.ensemblIDs = json.ensemblIDs.map(id => id = {ensemblId: id.name});
        }

        if (json.pdbs) {
            obj.pdbs = json.pdbs.map(id => id = {pdbs: id.name});
        }

        if (json.dto) {
            obj.dto = json.dto.map(id => id = id.name).reverse();
        }

        if (json.pantherClasses) {
            obj.pantherClasses = PantherClass.traslateFromJson(json.pantherClasses);
        }

        if (json.symbols) {
            obj.symbols = [...new Set<string>(json.symbols.map(sym => sym = {symbol: sym.value}))];
        }

        if (json.uniProtFunction && json.uniProtFunction.length > 0) {
            obj.description = `${(json.uniProtFunction.map(id => id.value)).join(' ')}${!!obj.description ? ' ' + obj.description : ''}`;
        }

        if (json.goCounts) {
            obj.goCount = new GoCounts(json.goCounts);
        }

        if (json.hgdata && json.hgdata.summary) {
            obj.hgdata = json.hgdata.summary.map(hg => {
                hg.value = +hg.value.toFixed(2);
                return hg;
            });
        }

        if (json.diseaseCounts) {
            obj.diseaseCount = json.diseaseCounts.length;
        }

        if (json.orthologCounts) {
            obj.orthologCounts = json.orthologCounts.length;
        }

        if (json.ppis) {
            const targetSerializer = new TargetSerializer();
            obj.ppis = json.ppis.map(ppi => targetSerializer.fromJson(ppi.target));
            for (let i = 0; i < obj.ppis.length; i++) {
                obj.ppis[i].properties = [];
                if (json.ppis[i].props && json.ppis[i].props.length > 0) {
                    for (let j = 0; j < json.ppis[i].props.length; j++) {
                        obj.ppis[i].properties.push(
                            new DataProperty(
                                {label: json.ppis[i].props[j].name, term: json.ppis[i].props[j].value}
                            )
                        );
                    }
                }
            }
        }

        if (json.ligandCounts) {
            json.ligandCounts.forEach(count => {
                if (count.name === 'drug') {
                    obj.drugCount = count.value;
                }
                if (count.name === 'ligand') {
                    obj.ligandCount = count.value;
                }
            });
        }

        if (json.ligands) {
            const ligandSerializer = new LigandSerializer();
            obj.ligands = json.ligands
                .map(ligand => ligandSerializer.fromJson(ligand));
        }

        if (json.drugs) {
            const ligandSerializer = new LigandSerializer();
            obj.drugs = json.drugs.map(ligand => ligandSerializer.fromJson(ligand));
        }

        if (json.publications) {
            const pubSerializer = new PublicationSerializer();
            obj.publications = json.publications.map(pub => pubSerializer.fromJson(pub));
        }

        if (json.generifs) {
            const generifSerializer = new GenerifSerializer();
            obj.generifs = json.generifs.map(rif => generifSerializer.fromJson(rif));
        }

        if (json.diseases) {
            const diseaseSerializer = new DiseaseSerializer();
            obj.diseases = json.diseases.map(disease => diseaseSerializer.fromJson(disease));
        }

        if (json.orthologs) {
            const orthologSerializer = new OrthologSerializer();
            obj.orthologs = json.orthologs.map(ortholog => orthologSerializer.fromJson(ortholog));
        }

        return obj;
    }

    /**
     * flatten target to json
     * @param {PharosBase} obj
     * @return {any}
     */
    toJson(obj: PharosBase): any {
        return [];
    }

    /**
     * return target as properties
     * @param {PharosBase} obj
     * @return {any}
     * @private
     */
    _asProperties(obj: Target): any {
        const newObj: any = this._mapField(obj);
        if (newObj.accession && newObj.accession.term) {
            newObj.name.internalLink = ['/targets', newObj.accession.term];
        }

        if (newObj.gene && newObj.gene.term) {
            newObj.gene.externalLink = `https://www.genenames.org/data/gene-symbol-report/#!/symbol/${newObj.gene.term}`;
        }

        if (newObj.uniprotIds && newObj.uniprotIds.length) {
            newObj.uniprotIds.map(uniprot => uniprot.uniprotId.externalLink = `https://www.uniprot.org/uniprot/${uniprot.uniprotId.term}`);
        }

        if (newObj.publications) {
            const pubSerializer = new PublicationSerializer();
            newObj.publications = obj.publications.map(pub => pubSerializer._asProperties(pub));
        }

        if (newObj.ppis) {
            const targetSerializer = new TargetSerializer();
            newObj.ppis = obj.ppis.map(ppi => targetSerializer._asProperties(ppi));
        }

        if (newObj.generifs) {
            const generifSerializer = new GenerifSerializer();
            newObj.generifs = obj.generifs.map(generif => generifSerializer._asProperties(generif));
        }

        if (newObj.diseases) {
            const diseaseSerializer = new DiseaseSerializer();
            newObj.diseases = obj.diseases.map(disease => diseaseSerializer._asProperties(disease));
        }

        if (newObj.drugs && newObj.drugs.length > 0) {
            const drugSerializer = new LigandSerializer();
            newObj.drugs = obj.drugs.map(drug => drugSerializer._asProperties(drug));
        }

        if (newObj.ligands && newObj.ligands.length > 0) {
            const ligandSerializer = new LigandSerializer();
            newObj.ligands = obj.ligands.map(ligand => ligandSerializer._asProperties(ligand));
        }

        if (newObj.orthologs) {
            const orthologSerializer = new OrthologSerializer();
            newObj.orthologs = obj.orthologs.map(ortholog => orthologSerializer._asProperties(ortholog));
        }

        if (newObj.goComponent) {
            newObj.goComponent.forEach(component => {
                if (component.explanation?.term) {
                    component.explanation.term = component.explanation.term + ` (${component.evidence.term})`;
                }
                component.term.internalLink = ['/targets'];
                component.term.queryParams = {facet: `GO Component${Facet.separator}${component.term.term}`};
                return component;
            });
        }

        if (newObj.goProcess) {
            newObj.goProcess.forEach(component => {
                if (component.explanation?.term) {
                    component.explanation.term = component.explanation.term + ` (${component.evidence.term})`;
                }
                component.term.internalLink = ['/targets'];
                component.term.queryParams = {facet: `GO Process${Facet.separator}${component.term.term}`};
                return component;
            });
        }

        if (newObj.goFunction) {
            newObj.goFunction.forEach(component => {
                if (component.explanation?.term) {
                    component.explanation.term = component.explanation.term + ` (${component.evidence.term})`;
                }
                component.term.internalLink = ['/targets'];
                component.term.queryParams = {facet: `GO Function${Facet.separator}${component.term.term}`};
                return component;
            });
        }
        if (newObj.uniprotKeyword) {
            newObj.uniprotKeyword.forEach(component => {
                component.value.internalLink = ['/targets'];
                component.value.externalLink = `https://www.uniprot.org/keywords/${component.name.term}`;
                component.value.queryParams = {facet: `UniProt Keyword${Facet.separator}${component.value.term}`};
                return component.value;
            });
        }
        if (obj.gwasTrait) {
            newObj.gwasTrait = obj.gwasTrait.map(trait => {
                const prop: any = {};
                prop.value = {
                    term: trait,
                    internalLink: ['/targets'],
                    queryParams: {facet: `GWAS${Facet.separator}${trait}`}
                };
                return prop;
            });
        }
        if (obj.mgiPhenotype) {
            newObj.mgiPhenotype = obj.mgiPhenotype.map(phen => {
                const prop: any = {};
                prop.value = {
                    term: phen,
                    internalLink: ['/targets'],
                    queryParams: {facet: `JAX/MGI Phenotype${Facet.separator}${phen}`}
                };
                return prop;
            });
        }

        if (newObj.pathways && newObj.pathways.length > 0) {
            const pathwaySerializer = new PathwaySerializer();
            newObj.pathwayMap = new Map<string, any[]>();
            obj.pathways.forEach(path => {
                const pathObj = pathwaySerializer._asProperties(path);
                const pwType = path.type.split(':')[0];
                let pathList: any[];
                if (newObj.pathwayMap.has(pwType)) {
                    pathList = newObj.pathwayMap.get(pwType);
                } else {
                    pathList = [];
                    newObj.pathwayMap.set(pwType, pathList);
                }
                pathList.push(pathObj);
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
        const retObj: any = Object.assign({}, obj);
        Object.keys(obj).map(objField => {
            if (Array.isArray(obj[objField])) {
                retObj[objField] = obj[objField].map(arrObj => this._mapField(arrObj));
            } else if (obj[objField] && obj[objField]["__typename"]) {
                retObj[objField] = {};
                for (const prop in obj[objField]) {
                    retObj[objField][prop] = new DataProperty({name: prop, label: prop, term: obj[objField][prop]});
                }
            } else {
                retObj[objField] = new DataProperty({name: objField, label: objField, term: obj[objField]});
            }
        });
        if (obj.__typename) {
            delete retObj.__typename;
        }
        return retObj;
    }

  parseExtras(res: any): any {
    if (res.similarityTarget) {
      return {similarityTarget: this.fromJson(res.similarityTarget)};
    }
    return null;
  }
}




