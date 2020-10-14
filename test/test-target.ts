import {Target, TargetSerializer} from '../src/app/models/target';

export const TESTTARGET: Target = new TargetSerializer().fromJson(
  {
  _tcrdid: 17782,
  name: 'Huntingtin',
  gene: 'HTT',
  accession: 'P42858',
  idgFamily: null,
  idgTDL: 'Tchem',
  novelty: 0.00040613,
  description: 'Huntingtin is a disease gene linked to Huntington\'s disease, a neurodegenerative disorder characterized by loss of striatal neurons. This is thought to be caused by an expanded, unstable trinucleotide repeat in the huntingtin gene, which translates as a polyglutamine repeat in the protein product. A fairly broad range of trinucleotide repeats (9-35) has been identified in normal controls, and repeat numbers in excess of 40 have been described as pathological. The huntingtin locus is large, spanning 180 kb and consisting of 67 exons. The huntingtin gene is widely expressed and is required for normal development. It is expressed as 2 alternatively polyadenylated forms displaying different relative abundance in various fetal and adult tissues. The larger transcript is approximately 13.7 kb and is expressed predominantly in adult and fetal brain whereas the smaller transcript of approximately 10.3 kb is more widely expressed. The genetic defect leading to Huntington\'s disease may not necessarily eliminate transcription, but may confer a new property on the mRNA or alter the function of the protein. One candidate is the huntingtin-associated protein-1, highly expressed in brain, which has increased affinity for huntingtin protein with expanded polyglutamine repeats. This gene contains an upstream open reading frame in the 5\' UTR that inhibits expression of the huntingtin gene product through translational repression. [provided by RefSeq, Jul 2016]',
  uniProtFunction: [
    {value: 'May play a role in microtubule-mediated transport or vesicle function.', __typename: 'Prop'}],
  jensenScore: [{value: '2471.197993', __typename: 'Prop'}],
  pubTatorScore: [{value: '1895.5972', __typename: 'Prop'}],
  antibodyCount: [{value: '738', __typename: 'Prop'}],
  ppiCount: [{value: 1875, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}],
    drugs: [],
    ligands: [],
  hgdata: {
    summary: [{name: 'biological process', value: 0.99983015662837, __typename: 'FloatProp'}, {
      name: 'biological term',
      value: 0.9167089423350455,
      __typename: 'FloatProp'
    }, {name: 'cell line', value: 0.6088107208600838, __typename: 'FloatProp'}, {
      name: 'cell type or tissue',
      value: 0.4045912786865124,
      __typename: 'FloatProp'
    }, {name: 'cellular component', value: 0.8194143644095958, __typename: 'FloatProp'}, {
      name: 'chemical',
      value: 0.52002248457186,
      __typename: 'FloatProp'
    }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
      name: 'co-expressed gene',
      value: 0.354316968619692,
      __typename: 'FloatProp'
    }, {name: 'disease', value: 0.569611463902829, __typename: 'FloatProp'}, {
      name: 'disease perturbation',
      value: 0.946554314538946,
      __typename: 'FloatProp'
    }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
      name: 'drug perturbation',
      value: 0.251704062868879,
      __typename: 'FloatProp'
    }, {name: 'gene perturbation', value: 0.560227838229723, __typename: 'FloatProp'}, {
      name: 'histone modification site profile',
      value: 0.8469079513280565,
      __typename: 'FloatProp'
    }, {name: 'hub protein', value: 0.987194777365029, __typename: 'FloatProp'}, {
      name: 'interacting protein',
      value: 0.963088511907014,
      __typename: 'FloatProp'
    }, {name: 'kinase', value: 0.646949208662942, __typename: 'FloatProp'}, {
      name: 'kinase perturbation',
      value: 0.538650359031387,
      __typename: 'FloatProp'
    }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
      name: 'ligand (protein)',
      value: 0,
      __typename: 'FloatProp'
    }, {name: 'ligand (protein) perturbation', value: 0.104172631403475, __typename: 'FloatProp'}, {
      name: 'metabolite',
      value: 0,
      __typename: 'FloatProp'
    }, {name: 'microRNA', value: 0.632120933685442, __typename: 'FloatProp'}, {
      name: 'molecular function',
      value: 0.598310302564486,
      __typename: 'FloatProp'
    }, {name: 'pathway', value: 0.3623139208602766, __typename: 'FloatProp'}, {
      name: 'phenotype',
      value: 0.5943061216107938,
      __typename: 'FloatProp'
    }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
      name: 'protein complex',
      value: 0.5401502137444425,
      __typename: 'FloatProp'
    }, {name: 'protein domain', value: 0.726832550956576, __typename: 'FloatProp'}, {
      name: 'PubMedID',
      value: 0.2363548067568925,
      __typename: 'FloatProp'
    }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
      name: 'small molecule perturbation',
      value: 0.4520528860089965,
      __typename: 'FloatProp'
    }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
      name: 'tissue',
      value: 0.6250901174645235,
      __typename: 'FloatProp'
    }, {name: 'tissue sample', value: 0.5338739924166392, __typename: 'FloatProp'}, {
      name: 'trait',
      value: 0.455196099481567,
      __typename: 'FloatProp'
    }, {
      name: 'transcription factor',
      value: 0.6774047553392798,
      __typename: 'FloatProp'
    }, {
      name: 'transcription factor binding site profile',
      value: 0.8721629884238545,
      __typename: 'FloatProp'
    }, {name: 'transcription factor perturbation', value: 0.46775268555406, __typename: 'FloatProp'}, {
      name: 'viral protein',
      value: 0,
      __typename: 'FloatProp'
    }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {name: 'virus perturbation', value: 0.826169672485904, __typename: 'FloatProp'}],
    __typename: 'Harmonizome'
  },
  diseaseCounts: [
    {value: 5, __typename: 'IntProp'}, {value: 2, __typename: 'IntProp'}, {value: 2, __typename: 'IntProp'}, {
      value: 2,
      __typename: 'IntProp'
    }, {value: 2, __typename: 'IntProp'}, {value: 2, __typename: 'IntProp'}, {value: 2, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}],
  __typename: 'Target',
  symbols: [
    {name: 'symbol', value: 'HD', __typename: 'Prop'}, {name: 'symbol', value: 'IT15', __typename: 'Prop'}, {
      name: 'symbol',
      value: 'HD',
      __typename: 'Prop'
    }, {name: 'symbol', value: 'IT15', __typename: 'Prop'}, {name: 'symbol', value: 'LOMARS', __typename: 'Prop'}],
  uniprotIds: [{name: 'uniprot', value: 'Q9UQB7', __typename: 'Prop'}],
  ensemblIDs: [
    {value: 'ENST00000355072', __typename: 'Xref'}, {value: 'ENSP00000347184', __typename: 'Xref'}, {
      value: 'ENSG00000197386',
      __typename: 'Xref'
    }],
  pdbs: [
    {value: '2D3X', __typename: 'Xref'}, {value: '2LD0', __typename: 'Xref'}, {value: '2LD2', __typename: 'Xref'}, {
      value: '3IO4',
      __typename: 'Xref'
    }, {value: '3IO6', __typename: 'Xref'}, {value: '3IOR', __typename: 'Xref'}, {value: '3IOT', __typename: 'Xref'}, {
      value: '3IOU',
      __typename: 'Xref'
    }, {value: '3IOV', __typename: 'Xref'}, {value: '3IOW', __typename: 'Xref'}, {value: '3LRH', __typename: 'Xref'}, {
      value: '4FE8',
      __typename: 'Xref'
    }, {value: '4FEB', __typename: 'Xref'}, {value: '4FEC', __typename: 'Xref'}, {value: '4FED', __typename: 'Xref'}, {
      value: '4RAV',
      __typename: 'Xref'
    }, {value: '6EZ8', __typename: 'Xref'}],
  ppis: [
    {
      target: {
        _tcrdid: 18981,
        name: 'Olfactory receptor 10J3',
        gene: 'OR10J3',
        accession: 'Q5JRS4',
        idgFamily: 'oGPCR',
        idgTDL: 'Tdark',
        novelty: 15,
        description: 'Olfactory receptors interact with odorant molecules in the nose, to initiate a neuronal response that triggers the perception of a smell. The olfactory receptor proteins are members of a large family of G-protein-coupled receptors (GPCR) arising from single coding-exon genes. Olfactory receptors share a 7-transmembrane domain structure with many neurotransmitter and hormone receptors and are responsible for the recognition and G protein-mediated transduction of odorant signals. The olfactory receptor gene family is the largest in the genome. The nomenclature assigned to the olfactory receptor genes and proteins for this organism is independent of other organisms. [provided by RefSeq, Jul 2008]',
        uniProtFunction: [{value: 'Odorant receptor.', __typename: 'Prop'}],
        jensenScore: [{value: '0.227273', __typename: 'Prop'}],
        pubTatorScore: [{value: '0.792158', __typename: 'Prop'}],
        antibodyCount: [{value: '126', __typename: 'Prop'}],
        ppiCount: [{value: 104, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0.222839719199924, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.370911768997381, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.3708678065718905,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.16048608733156325, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0.3489170380480655, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.0768075587378784, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.078678662289095,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.100410626211325,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.282434752718707,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0.322281097029204, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0.470251427395343,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.412098228404416, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.169840527638395,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.6416336849998283,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.3532799311777536, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.22246618530985454,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.1247828483157977,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {name: 'virus perturbation', value: 0, __typename: 'FloatProp'}],
          __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 18308,
        name: 'Putative protein PTGES3L',
        gene: 'PTGES3L',
        accession: 'E9PB15',
        idgFamily: null,
        idgTDL: 'Tdark',
        novelty: 4.95833333,
        description: null,
        uniProtFunction: [],
        jensenScore: [{value: '0.090909', __typename: 'Prop'}],
        pubTatorScore: [{value: '0.1', __typename: 'Prop'}],
        antibodyCount: [{value: '0', __typename: 'Prop'}],
        ppiCount: [{value: 578, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.5426526806740022, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.5570147779987595,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.466823610577823, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.207266085583982,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0.446063683493211, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.262760874067397, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.246442285204799,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.15392382235842,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.31246462611496034,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.5202849936933375, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.11041380977604112,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.11270976482409945,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0.328551381777019, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.206392956796501,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 16843,
        name: 'CAP-Gly domain-containing linker protein 4',
        gene: 'CLIP4',
        accession: 'Q8N3C7',
        idgFamily: null,
        idgTDL: 'Tdark',
        novelty: 4,
        description: null,
        uniProtFunction: [],
        jensenScore: [{value: '0.4', __typename: 'Prop'}],
        pubTatorScore: [{value: '7.972421', __typename: 'Prop'}],
        antibodyCount: [{value: '112', __typename: 'Prop'}],
        ppiCount: [{value: 1216, __typename: 'IntProp'}, {value: 2, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.44642374449881583, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.6402957214126825,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.3414265049177623, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0.5535086385337793, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0.492290468802509,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.7973939861666105, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.5367588226896195,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0.398087708922514,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.303405004071616,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0.702040512904773, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.150630095971798,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0.522375118534358,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0.406749568598513,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.575562957216094, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.579579053547472,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.520934857090619,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.422331570801123,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.44930329886200276, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0.304024966930917,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.5031711920828175,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.4035502563481665,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0.678523688947061, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.547232549308235,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 6585,
        name: 'Histone H4-like protein type G',
        gene: 'HIST1H4G',
        accession: 'Q99525',
        idgFamily: null,
        idgTDL: 'Tdark',
        novelty: 3,
        description: 'Histones are basic nuclear proteins that are responsible for the nucleosome structure of the chromosomal fiber in eukaryotes. Two molecules of each of the four core histones (H2A, H2B, H3, and H4) form an octamer, around which approximately 146 bp of DNA is wrapped in repeating units, called nucleosomes. The linker histone, H1, interacts with linker DNA between nucleosomes and functions in the compaction of chromatin into higher order structures. This gene is intronless and encodes a replication-dependent histone that is a member of the histone H4 family. Transcripts from this gene lack polyA tails but instead contain a palindromic termination element. This gene is found in the large histone gene cluster on chromosome 6. [provided by RefSeq, Aug 2015]',
        uniProtFunction: [{
          value: 'Core component of nucleosome. Nucleosomes wrap and compact DNA into chromatin, limiting DNA accessibility to the cellular machineries which require DNA as a template. Histones thereby play a central role in transcription regulation, DNA repair, DNA replication and chromosomal stability. DNA accessibility is regulated via a complex set of post-translational modifications of histones, also called histone code, and nucleosome remodeling (By similarity).',
          __typename: 'Prop'
        }],
        jensenScore: [{value: '148.42468', __typename: 'Prop'}],
        pubTatorScore: [{value: '60.333332', __typename: 'Prop'}],
        antibodyCount: [{value: '0', __typename: 'Prop'}],
        ppiCount: [{value: 2909, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0.171341108114366, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.3320738759937279, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.578166946133945,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.570515952172201, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0.414149145813184,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0.159062969454641,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.213427285112315, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.0835330316534049,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0.307634689989947,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.205975399947364,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0.0709071480470465, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.314192371268597,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0.303780580268156, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0.403281144822994,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.412098228404416, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.165964914276699,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.1832055472672815,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.3611086114311522,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.2412884361439248, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.1190750372898913,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.1007233470133838,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.120874097149315,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 6122,
        name: 'Haloacid dehalogenase-like hydrolase domain-containing protein 3',
        gene: 'HDHD3',
        accession: 'Q9BSH5',
        idgFamily: 'Enzyme',
        idgTDL: 'Tdark',
        novelty: 2.25,
        description: null,
        uniProtFunction: [],
        jensenScore: [{value: '0.333334', __typename: 'Prop'}],
        pubTatorScore: [{value: '0.142857', __typename: 'Prop'}],
        antibodyCount: [{value: '128', __typename: 'Prop'}],
        ppiCount: [{value: 286, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0.175317374737364, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.6791486719977523, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.6776594807976474,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.38675715255804866, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0.430228242370525,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0.601695634345529, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0.305438749165367,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.402401948811878, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.6313562558318265,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0.307634689989947,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.538650359031387,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0.17739019986131, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.197526261739298,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.412098228404416, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.272469455383836,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.40406078408122065,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.48305543783757376,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.5419400593862674, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.497713599954011,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.377749331128276,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0.209858225566603, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.320116376330845,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 337,
        name: 'Uncharacterized protein C5orf34',
        gene: 'C5orf34',
        accession: 'Q96MH7',
        idgFamily: null,
        idgTDL: 'Tdark',
        novelty: 2.22222222,
        description: null,
        uniProtFunction: [],
        jensenScore: [{value: '0.819048', __typename: 'Prop'}],
        pubTatorScore: [{value: '0.2', __typename: 'Prop'}],
        antibodyCount: [{value: '22', __typename: 'Prop'}],
        ppiCount: [{value: 100, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {name: 'tissue', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue sample',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'trait', value: 0, __typename: 'FloatProp'}, {
            name: 'transcription factor',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {name: 'virus perturbation', value: 0, __typename: 'FloatProp'}],
          __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 7332,
        name: 'Palmitoyltransferase ZDHHC18',
        gene: 'ZDHHC18',
        accession: 'Q9NUE0',
        idgFamily: 'Enzyme',
        idgTDL: 'Tdark',
        novelty: 1.62162162,
        description: null,
        uniProtFunction: [{value: 'Has palmitoyltransferase activity towards HRAS and LCK.', __typename: 'Prop'}],
        jensenScore: [{value: '0.492064', __typename: 'Prop'}],
        pubTatorScore: [{value: '0.5', __typename: 'Prop'}],
        antibodyCount: [{value: '86', __typename: 'Prop'}],
        ppiCount: [{value: 214, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0.266656396911176, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.5525140929221222, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.5162425256757885,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.5087111724839316, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0.242962128797347,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0.286788248829409, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0.492290468802509,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.622451482505917, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.55072896658792,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.948046460709423,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0.447932156217729,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0.553793299748237, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.52620422563176,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.147420006030058, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.2878248079647505,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.594608964338148,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.5778263999837479,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.544975403799122, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.4482975657112502,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.5645959410368405,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0.540057268700201, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.279414219721691,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 7791,
        name: 'Spermatogenesis-associated protein 5-like protein 1',
        gene: 'SPATA5L1',
        accession: 'Q9BVQ7',
        idgFamily: 'Enzyme',
        idgTDL: 'Tdark',
        novelty: 1.5,
        description: null,
        uniProtFunction: [],
        jensenScore: [{value: '0.819444', __typename: 'Prop'}],
        pubTatorScore: [{value: '0.75', __typename: 'Prop'}],
        antibodyCount: [{value: '94', __typename: 'Prop'}],
        ppiCount: [{value: 981, __typename: 'IntProp'}, {value: 7, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.45959541177793, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.555021932915324,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.405838011446242, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0.414149145813184,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0.210551025224746,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0.2628220973850856, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0.159062969454641,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.708509354340669, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.6561015085621755,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0.5209837142181265,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.417302550082491,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0.23122502584156, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.730876062433608,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0.3218587891678493,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0.445327288004627,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.575562957216094, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.2957778487393245,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.4376635224048327,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.3924134725896887,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.37709851871910144, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0.304024966930917,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.41360881559691176,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.5955000456122815,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0.39649940181955, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.90160723802039,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 11894,
        name: 'Leukocyte receptor cluster member 8',
        gene: 'LENG8',
        accession: 'Q96PV6',
        idgFamily: null,
        idgTDL: 'Tdark',
        novelty: 1.43610201,
        description: null,
        uniProtFunction: [],
        jensenScore: [{value: '0.435529', __typename: 'Prop'}],
        pubTatorScore: [{value: '0.121277', __typename: 'Prop'}],
        antibodyCount: [{value: '43', __typename: 'Prop'}],
        ppiCount: [{value: 450, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.718979334607284, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.4320910523842945,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.641602815078164, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0.414149145813184,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0.3016172466922433, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0.364800539583284,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.404649679571586, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.712084584923804,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0.30325197788743, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0.334102094426194,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0.267759229356313, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.303405004071616,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0.45967140770536735, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.150630095971798,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0.399360051319574,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0.355771076546497,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.147420006030058, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.305338572243915,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.308493892652501,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.40606575703273257,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.6063580141513106, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.6018381640504572,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.824851351018801,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0.328551381777019, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.320116376330845,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }, {
      target: {
        _tcrdid: 17114,
        name: 'ATPase family AAA domain-containing protein 2B',
        gene: 'ATAD2B',
        accession: 'Q9ULI0',
        idgFamily: 'Epigenetic',
        idgTDL: 'Tchem',
        novelty: 1.42465753,
        description: 'The protein encoded by this gene belongs to the AAA ATPase family. This family member includes an N-terminal bromodomain. It has been found to be localized to the nucleus, partly to replication sites, consistent with a chromatin-related function. Alternative splicing of this gene results in multiple transcript variants. [provided by RefSeq, Jul 2014]',
        uniProtFunction: [],
        jensenScore: [{value: '1.058334', __typename: 'Prop'}],
        pubTatorScore: [{value: '2.125', __typename: 'Prop'}],
        antibodyCount: [{value: '21', __typename: 'Prop'}],
        ppiCount: [{value: 2604, __typename: 'IntProp'}],
        hgdata: {
          summary: [{name: 'biological process', value: 0.395121571377806, __typename: 'FloatProp'}, {
            name: 'biological term',
            value: 0.323264644260203,
            __typename: 'FloatProp'
          }, {name: 'cell line', value: 0.5305545302247975, __typename: 'FloatProp'}, {
            name: 'cell type or tissue',
            value: 0.5280563294901147,
            __typename: 'FloatProp'
          }, {name: 'cellular component', value: 0.33037102756065273, __typename: 'FloatProp'}, {
            name: 'chemical',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'chemical bioactivity profile', value: 0, __typename: 'FloatProp'}, {
            name: 'co-expressed gene',
            value: 0.210551025224746,
            __typename: 'FloatProp'
          }, {name: 'disease', value: 0.2636358789403753, __typename: 'FloatProp'}, {
            name: 'disease perturbation',
            value: 0.736742246268027,
            __typename: 'FloatProp'
          }, {name: 'drug', value: 0, __typename: 'FloatProp'}, {
            name: 'drug perturbation',
            value: 0.474995796822625,
            __typename: 'FloatProp'
          }, {name: 'gene perturbation', value: 0.3525017043278715, __typename: 'FloatProp'}, {
            name: 'histone modification site profile',
            value: 0.8716826967632095,
            __typename: 'FloatProp'
          }, {name: 'hub protein', value: 0, __typename: 'FloatProp'}, {
            name: 'interacting protein',
            value: 0.306847179310467,
            __typename: 'FloatProp'
          }, {name: 'kinase', value: 0, __typename: 'FloatProp'}, {
            name: 'kinase perturbation',
            value: 0.656477093485461,
            __typename: 'FloatProp'
          }, {name: 'ligand (chemical)', value: 0, __typename: 'FloatProp'}, {
            name: 'ligand (protein)',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'ligand (protein) perturbation', value: 0, __typename: 'FloatProp'}, {
            name: 'metabolite',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'microRNA', value: 0.643833467646006, __typename: 'FloatProp'}, {
            name: 'molecular function',
            value: 0.956821059586967,
            __typename: 'FloatProp'
          }, {name: 'pathway', value: 0, __typename: 'FloatProp'}, {
            name: 'phenotype',
            value: 0.27908101103923233,
            __typename: 'FloatProp'
          }, {name: 'phosphatase', value: 0, __typename: 'FloatProp'}, {
            name: 'protein complex',
            value: 0.410225322540108,
            __typename: 'FloatProp'
          }, {name: 'protein domain', value: 0.845177525083914, __typename: 'FloatProp'}, {
            name: 'PubMedID',
            value: 0.2869219650025865,
            __typename: 'FloatProp'
          }, {name: 'small molecule', value: 0, __typename: 'FloatProp'}, {
            name: 'small molecule perturbation',
            value: 0.473818197344665,
            __typename: 'FloatProp'
          }, {name: 'SNP', value: 0, __typename: 'FloatProp'}, {
            name: 'tissue',
            value: 0.43928017006655956,
            __typename: 'FloatProp'
          }, {name: 'tissue sample', value: 0.4885031863162349, __typename: 'FloatProp'}, {
            name: 'trait',
            value: 0,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor',
            value: 0.5410620695515487,
            __typename: 'FloatProp'
          }, {
            name: 'transcription factor binding site profile',
            value: 0.8217636396217775,
            __typename: 'FloatProp'
          }, {name: 'transcription factor perturbation', value: 0.209858225566603, __typename: 'FloatProp'}, {
            name: 'viral protein',
            value: 0,
            __typename: 'FloatProp'
          }, {name: 'virus', value: 0, __typename: 'FloatProp'}, {
            name: 'virus perturbation',
            value: 0.45392695714692,
            __typename: 'FloatProp'
          }], __typename: 'Harmonizome'
        },
        diseaseCounts: [{value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
          value: 1,
          __typename: 'IntProp'
        }, {value: 1, __typename: 'IntProp'}],
        __typename: 'Target'
      }, __typename: 'TargetNeighbor'
    }],
  generifCount: 448,
  sequence: 'MATLEKLMKAFESLKSFQQQQQQQQQQQQQQQQQQQQQPPPPPPPPPPPQLPQPPPQAQPLLPQPQPPPPPPPPPPGPAVAEEPLHRPKKELSATKKDRVNHCLTICENIVAQSVRNSPEFQKLLGIAMELFLLCSDDAESDVRMVADECLNKVIKALMDSNLPRLQLELYKEIKKNGAPRSLRAALWRFAELAHLVRPQKCRPYLVNLLPCLTRTSKRPEESVQETLAAAVPKIMASFGNFANDNEIKVLLKAFIANLKSSSPTIRRTAAGSAVSICQHSRRTQYFYSWLLNVLLGLLVPVEDEHSTLLILGVLLTLRYLVPLLQQQVKDTSLKGSFGVTRKEMEVSPSAEQLVQVYELTLHHTQHQDHNVVTGALELLQQLFRTPPPELLQTLTAVGGIGQLTAAKEESGGRSRSGSIVELIAGGGSSCSPVLSRKQKGKVLLGEEEALEDDSESRSDVSSSALTASVKDEISGELAASSGVSTPGSAGHDIITEQPRSQHTLQADSVDLASCDLTSSATDGDEEDILSHSSSQVSAVPSDPAMDLNDGTQASSPISDSSQTTTEGPDSAVTPSDSSEIVLDGTDNQYLGLQIGQPQDEDEEATGILPDEASEAFRNSSMALQQAHLLKNMSHCRQPSDSSVDKFVLRDEATEPGDQENKPCRIKGDIGQSTDDDSAPLVHCVRLLSASFLLTGGKNVLVPDRDVRVSVKALALSCVGAAVALHPESFFSKLYKVPLDTTEYPEEQYVSDILNYIDHGDPQVRGATAILCGTLICSILSRSRFHVGDWMGTIRTLTGNTFSLADCIPLLRKTLKDESSVTCKLACTAVRNCVMSLCSSSYSELGLQLIIDVLTLRNSSYWLVRTELLETLAEIDFRLVSFLEAKAENLHRGAHHYTGLLKLQERVLNNVVIHLLGDEDPRVRHVAAASLIRLVPKLFYKCDQGQADPVVAVARDQSSVYLKLLMHETQPPSHFSVSTITRIYRGYNLLPSITDVTMENNLSRVIAAVSHELITSTTRALTFGCCEALCLLSTAFPVCIWSLGWHCGVPPLSASDESRKSCTVGMATMILTLLSSAWFPLDLSAHQDALILAGNLLAASAPKSLRSSWASEEEANPAATKQEEVWPALGDRALVPMVEQLFSHLLKVINICAHVLDDVAPGPAIKAALPSLTNPPSLSPIRRKGKEKEPGEQASVPLSPKKGSEASAASRQSDTSGPVTTSKSSSLGSFYHLPSYLKLHDVLKATHANYKVTLDLQNSTEKFGGFLRSALDVLSQILELATLQDIGKCVEEILGYLKSCFSREPMMATVCVQQLLKTLFGTNLASQFDGLSSNPSKSQGRAQRLGSSSVRPGLYHYCFMAPYTHFTQALADASLRNMVQAEQENDTSGWFDVLQKVSTQLKTNLTSVTKNRADKNAIHNHIRLFEPLVIKALKQYTTTTCVQLQKQVLDLLAQLVQLRVNYCLLDSDQVFIGFVLKQFEYIEVGQFRESEAIIPNIFFFLVLLSYERYHSKQIIGIPKIIQLCDGIMASGRKAVTHAIPALQPIVHDLFVLRGTNKADAGKELETQKEVVVSMLLRLIQYHQVLEMFILVLQQCHKENEDKWKRLSRQIADIILPMLAKQQMHIDSHEALGVLNTLFEILAPSSLRPVDMLLRSMFVTPNTMASVSTVQLWISGILAILRVLISQSTEDIVLSRIQELSFSPYLISCTVINRLRDGDSTSTLEEHSEGKQIKNLPEETFSRFLLQLVGILLEDIVTKQLKVEMSEQQHTFYCQELGTLLMCLIHIFKSGMFRRITAAATRLFRSDGCGGSFYTLDSLNLRARSMITTHPALVLLWCQILLLVNHTDYRWWAEVQQTPKRHSLSSTKLLSPQMSGEEEDSDLAAKLGMCNREIVRRGALILFCDYVCQNLHDSEHLTWLIVNHIQDLISLSHEPPVQDFISAVHRNSAASGLFIQAIQSRCENLSTPTMLKKTLQCLEGIHLSQSGAVLTLYVDRLLCTPFRVLARMVDILACRRVEMLLAANLQSSMAQLPMEELNRIQEYLQSSGLAQRHQRLYSLLDRFRLSTMQDSLSPSPPVSSHPLDGDGHVSLETVSPDKDWYVHLVKSQCWTRSDSALLEGAELVNRIPAEDMNAFMMNSEFNLSLLAPCLSLGMSEISGGQKSALFEAAREVTLARVSGTVQQLPAVHHVFQPELPAEPAAYWSKLNDLFGDAALYQSLPTLARALAQYLVVVSKLPSHLHLPPEKEKDIVKFVVATLEALSWHLIHEQIPLSLDLQAGLDCCCLALQLPGLWSVVSSTEFVTHACSLIYCVHFILEAVAVQPGEQLLSPERRTNTPKAISEEEEEVDPNTQNPKYITAACEMVAEMVESLQSVLALGHKRNSGVPAFLTPLLRNIIISLARLPLVNSYTRVPPLVWKLGWSPKPGGDFGTAFPEIPVEFLQEKEVFKEFIYRINTLGWTSRTQFEETWATLLGVLVTQPLVMEQEESPPEEDTERTQINVLAVQAITSLVLSAMTVPVAGNPAVSCLEQQPRNKPLKALDTRFGRKLSIIRGIVEQEIQAMVSKRENIATHHLYQAWDPVPSLSPATTGALISHEKLLLQINPERELGSMSYKLGQVSIHSVWLGNSITPLREEEWDEEEEEEADAPAPSSPPTSPVNSRKHRAGVDIHSCSQFLLELYSRWILPSSSARRTPAILISEVVRSLLVVSDLFTERNQFELMYVTLTELRRVHPSEDEILAQYLVPATCKAAAVLGMDKAVAEPVSRLLESTLRSSHLPSRVGALHGVLYVLECDLLDDTAKQLIPVISDYLLSNLKGIAHCVNIHSQQHVLVMCATAFYLIENYPLDVGPEFSASIIQMCGVMLSGSEESTPSIIYHCALRGLERLLLSEQLSRLDAESLVKLSVDRVNVHSPHRAMAALGLMLTCMYTGKEKVSPGRTSDPNPAAPDSESVIVAMERVSVLFDRIRKGFPCEARVVARILPQFLDDFFPPQDIMNKVIGEFLSNQQPYPQFMATVVYKVFQTLHSTGQSSMVRDWVMLSLSNFTQRAPVAMATWSLSCFFVSASTSPWVAAILPHVISRMGKLEQVDVNLFCLVATDFYRHQIEEELDRRAFQSVLEVVAAPGSPYHRLLTCLRNVHKVTTC',
  goCounts: [
    {value: 17, name: "C", __typename: 'IntProp'}, {value: 17, name: "F", __typename: 'IntProp'}, {value: 9, name: "P", __typename: 'IntProp'}],
  orthologCounts: [
    {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}, {
      value: 1,
      __typename: 'IntProp'
    }, {value: 1, __typename: 'IntProp'}, {value: 1, __typename: 'IntProp'}],
  orthologs: [
    {
      species: 'Chimp',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: 'VGNC:48910',
      geneid: 461084,
      source: ['OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Macaque',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: null,
      geneid: 700306,
      source: ['OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Mouse',
      sym: 'Htt',
      name: 'huntingtin',
      dbid: 'MGI:96067',
      geneid: 15194,
      source: ['Inparanoid', 'OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Rat',
      sym: 'Htt',
      name: 'huntingtin',
      dbid: 'RGD:68337',
      geneid: 29424,
      source: ['Inparanoid', 'OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Dog',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: 'VGNC:41839',
      geneid: 479074,
      source: ['Inparanoid', 'OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Horse',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: 'VGNC:18914',
      geneid: 100053721,
      source: ['Inparanoid', 'OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Cow',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: 'VGNC:30007',
      geneid: 615059,
      source: ['Inparanoid', 'OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Pig',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: null,
      geneid: 397014,
      source: ['OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Opossum',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: null,
      geneid: 100015315,
      source: ['Inparanoid', 'OMA', 'EggNOG'],
      __typename: 'Ortholog'
    }, {
      species: 'Chicken',
      sym: 'HTT',
      name: 'huntingtin',
      dbid: 'CGNC:11658',
      geneid: 422878,
      source: ['Inparanoid', 'OMA'],
      __typename: 'Ortholog'
    }],
  pubTatorScores: [
    {year: 1993, score: 11.5, __typename: 'TemporalScore'}, {
      year: 1994,
      score: 12.833333,
      __typename: 'TemporalScore'
    }, {year: 1995, score: 30, __typename: 'TemporalScore'}, {year: 1996, score: 25.5, __typename: 'TemporalScore'}, {
      year: 1997,
      score: 27.166667,
      __typename: 'TemporalScore'
    }, {year: 1998, score: 37.559524, __typename: 'TemporalScore'}, {
      year: 1999,
      score: 49.892857,
      __typename: 'TemporalScore'
    }, {year: 2000, score: 31.285714, __typename: 'TemporalScore'}, {
      year: 2001,
      score: 45.666667,
      __typename: 'TemporalScore'
    }, {year: 2002, score: 48.4, __typename: 'TemporalScore'}, {
      year: 2003,
      score: 49.553114,
      __typename: 'TemporalScore'
    }, {year: 2004, score: 43.033333, __typename: 'TemporalScore'}, {
      year: 2005,
      score: 42.933333,
      __typename: 'TemporalScore'
    }, {year: 2006, score: 74.385965, __typename: 'TemporalScore'}, {
      year: 2007,
      score: 68.67619,
      __typename: 'TemporalScore'
    }, {year: 2008, score: 81.619048, __typename: 'TemporalScore'}, {
      year: 2009,
      score: 86.1125,
      __typename: 'TemporalScore'
    }, {year: 2010, score: 99.783333, __typename: 'TemporalScore'}, {
      year: 2011,
      score: 118.267857,
      __typename: 'TemporalScore'
    }, {year: 2012, score: 131.670635, __typename: 'TemporalScore'}, {
      year: 2013,
      score: 114.684524,
      __typename: 'TemporalScore'
    }, {year: 2014, score: 130.555159, __typename: 'TemporalScore'}, {
      year: 2015,
      score: 129.978409,
      __typename: 'TemporalScore'
    }, {year: 2016, score: 133.228312, __typename: 'TemporalScore'}, {
      year: 2017,
      score: 134.81912,
      __typename: 'TemporalScore'
    }, {year: 2018, score: 124.332082, __typename: 'TemporalScore'}, {year: 2019, score: 12.159524, __typename: 'TemporalScore'}],
  pubmedScores: [
    {year: 1955, score: 1, __typename: 'TemporalScore'}, {
      year: 1977,
      score: 2,
      __typename: 'TemporalScore'
    }, {year: 1980, score: 0.5, __typename: 'TemporalScore'}, {year: 1983, score: 1, __typename: 'TemporalScore'}, {
      year: 1987,
      score: 1,
      __typename: 'TemporalScore'
    }, {year: 1988, score: 0.333333, __typename: 'TemporalScore'}, {
      year: 1989,
      score: 0.142857,
      __typename: 'TemporalScore'
    }, {year: 1991, score: 2.5, __typename: 'TemporalScore'}, {
      year: 1992,
      score: 0.40404,
      __typename: 'TemporalScore'
    }, {year: 1993, score: 13.666667, __typename: 'TemporalScore'}, {
      year: 1994,
      score: 15.333333,
      __typename: 'TemporalScore'
    }, {year: 1995, score: 33.084615, __typename: 'TemporalScore'}, {
      year: 1996,
      score: 33.468182,
      __typename: 'TemporalScore'
    }, {year: 1997, score: 30.416947, __typename: 'TemporalScore'}, {
      year: 1998,
      score: 41.052136,
      __typename: 'TemporalScore'
    }, {year: 1999, score: 62.180152, __typename: 'TemporalScore'}, {
      year: 2000,
      score: 39.36759,
      __typename: 'TemporalScore'
    }, {year: 2001, score: 58.803184, __typename: 'TemporalScore'}, {
      year: 2002,
      score: 67.299463,
      __typename: 'TemporalScore'
    }, {year: 2003, score: 67.980514, __typename: 'TemporalScore'}, {
      year: 2004,
      score: 64.409482,
      __typename: 'TemporalScore'
    }, {year: 2005, score: 71.081294, __typename: 'TemporalScore'}, {
      year: 2006,
      score: 95.364835,
      __typename: 'TemporalScore'
    }, {year: 2007, score: 93.700816, __typename: 'TemporalScore'}, {
      year: 2008,
      score: 96.580006,
      __typename: 'TemporalScore'
    }, {year: 2009, score: 101.31584, __typename: 'TemporalScore'}, {
      year: 2010,
      score: 111.316776,
      __typename: 'TemporalScore'
    }, {year: 2011, score: 146.800223, __typename: 'TemporalScore'}, {
      year: 2012,
      score: 170.855217,
      __typename: 'TemporalScore'
    }, {year: 2013, score: 152.52175, __typename: 'TemporalScore'}, {
      year: 2014,
      score: 160.399531,
      __typename: 'TemporalScore'
    }, {year: 2015, score: 166.235729, __typename: 'TemporalScore'}, {
      year: 2016,
      score: 168.155786,
      __typename: 'TemporalScore'
    }, {year: 2017, score: 162.508377, __typename: 'TemporalScore'}, {
      year: 2018,
      score: 185.708371,
      __typename: 'TemporalScore'
    }, {year: 2019, score: 52.710947, __typename: 'TemporalScore'}],
  patentCounts: [],
  publicationCount: 570,
  publications: [
    {
      year: null,
      pmid: '29713895',
      title: 'Mutant Huntingtin Causes a Selective Decrease in the Expression of Synaptic Vesicle Protein 2C.',
      journal: 'Neuroscience bulletin',
      abstract: 'Huntington\'s disease (HD) is a neurodegenerative disease caused by a polyglutamine expansion in the huntingtin (Htt) protein. Mutant Htt causes synaptic transmission dysfunctions by interfering in the expression of synaptic proteins, leading to early HD symptoms. Synaptic vesicle proteins 2 (SV2s), a family of synaptic vesicle proteins including 3 members, SV2A, SV2B, and SV2C, plays important roles in synaptic physiology. Here, we investigated whether the expression of SV2s is affected by mutant Htt in the brains of HD transgenic (TG) mice and Neuro2a mouse neuroblastoma cells (N2a cells) expressing mutant Htt. Western blot analysis showed that the protein levels of SV2A and SV2B were not significantly changed in the brains of HD TG mice expressing mutant Htt with 82 glutamine repeats. However, in the TG mouse brain there was a dramatic decrease in the protein level of SV2C, which has a restricted distribution pattern in regions particularly vulnerable in HD. Immunostaining revealed that the immunoreactivity of SV2C was progressively weakened in the basal ganglia and hippocampus of TG mice. RT-PCR demonstrated that the mRNA level of SV2C progressively declined in the TG mouse brain without detectable changes in the mRNA levels of SV2A and SV2B, indicating that mutant Htt selectively inhibits the transcriptional expression of SV2C. Furthermore, we found that only SV2C expression was progressively inhibited in N2a cells expressing a mutant Htt containing 120 glutamine repeats. These findings suggest that the synaptic dysfunction in HD results from the mutant Htt-mediated inhibition of SV2C transcriptional expression. These data also imply that the restricted distribution and decreased expression of SV2C contribute to the brain region-selective pathology of HD.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29460266',
      title: 'Increased Levels of Rictor Prevent Mutant Huntingtin-Induced Neuronal Degeneration.',
      journal: 'Molecular neurobiology',
      abstract: 'Rictor associates with mTOR to form the mTORC2 complex, which activity regulates neuronal function and survival. Neurodegenerative diseases are characterized by the presence of neuronal dysfunction and cell death in specific brain regions such as for example Huntington\'s disease (HD), which is characterized by the loss of striatal projection neurons leading to motor dysfunction. Although HD is caused by the expression of mutant huntingtin, cell death occurs gradually suggesting that neurons have the capability to activate compensatory mechanisms to deal with neuronal dysfunction and later cell death. Here, we analyzed whether mTORC2 activity could be altered by the presence of mutant huntingtin. We observed that Rictor levels are specifically increased in the striatum of HD mouse models and in the putamen of HD patients. Rictor-mTOR interaction and the phosphorylation levels of Akt, one of the targets of the mTORC2 complex, were increased in the striatum of the R6/1 mouse model of HD suggesting increased mTORC2 signaling. Interestingly, acute downregulation of Rictor in striatal cells in vitro reduced mTORC2 activity, as shown by reduced levels of phospho-Akt, and increased mutant huntingtin-induced cell death. Accordingly, overexpression of Rictor increased mTORC2 activity counteracting cell death. Furthermore, normalization of endogenous Rictor levels in the striatum of R6/1 mouse worsened motor symptoms suggesting an induction of neuronal dysfunction. In conclusion, our results suggest that increased Rictor striatal levels could counteract neuronal dysfunction induced by mutant huntingtin.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29891550',
      title: 'The role of Twist1 in mutant huntingtin-induced transcriptional alterations and neurotoxicity.',
      journal: 'The Journal of biological chemistry',
      abstract: 'Huntington\'s disease (HD) is a fatal neurodegenerative disorder caused by an abnormal expansion of polyglutamine repeats in the huntingtin protein (Htt). Transcriptional dysregulation is an early event in the course of HD progression and is thought to contribute to disease pathogenesis, but how mutant Htt causes transcriptional alterations and subsequent cell death in neurons is not well understood. RNA-Seq analysis revealed that expression of a mutant Htt fragment in primary cortical neurons leads to robust gene expression changes before neuronal death. Basic helix-loop-helix transcription factor Twist1, which is essential for embryogenesis and is normally expressed at low levels in mature neurons, was substantially up-regulated in mutant Htt-expressing neurons in culture and in the brains of HD mouse models. Knockdown of Twist1 by RNAi in mutant Htt-expressing primary cortical neurons reversed the altered expression of a subset of genes involved in neuronal function and, importantly, abrogated neurotoxicity. Using brain-derived neurotrophic factor (Bdnf), which is known to be involved in HD pathogenesis, as a model gene, we found that Twist1 knockdown could reverse mutant Htt-induced DNA hypermethylation at the Bdnf regulatory region and reactivate Bdnf expression. Together, these results suggest that Twist1 is an important upstream mediator of mutant Htt-induced neuronal death and may in part operate through epigenetic mechanisms.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29668904',
      title: 'A whole brain longitudinal study in the YAC128 mouse model of Huntington\'s disease shows distinct trajectories of neurochemical, structural connectivity and volumetric changes.',
      journal: 'Human molecular genetics',
      abstract: 'Huntington\'s disease (HD) is a neurodegenerative disorder causing cognitive and motor impairments, evolving to death within 15-20 years after symptom onset. We previously established a mouse model with the entire human HD gene containing 128 CAG repeats (YAC128) which accurately recapitulates the natural history of the human disease. Defined time points in this natural history enable the understanding of longitudinal trajectories from the neurochemical and structural points of view using non-invasive high-resolution multi-modal imaging. Accordingly, we designed a longitudinal structural imaging (MRI and DTI) and spectroscopy (1H-MRS) study in YAC128, at 3, 6, 9 and 12 months of age, at 9.4 T. Structural analysis (MRI/DTI), confirmed that the striatum is the earliest affected brain region, but other regions were also identified through connectivity analysis (pre-frontal cortex, hippocampus, globus pallidus and thalamus), suggesting a striking homology with the human disease. Importantly, we found for the first time, a negative correlation between striatal and hippocampal changes only in YAC128. In fact, the striatum showed accelerated volumetric decay in HD, as opposed to the hippocampus. Neurochemical analysis of the HD striatum suggested early neurometabolic alterations in neurotransmission and metabolism, with a significant increase in striatal GABA levels, and specifically anticorrelated levels of N-acetyl aspartate and taurine, suggesting that the later is homeostatically adjusted for neuroprotection, as neural loss, indicated by the former, is progressing. These results provide novel insights into the natural history of HD and prove a valuable role for longitudinal multi-modal panels of structural and metabolite/neurotransmission in the YAC128 model.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29619771',
      title: 'A Study of Triplet-Primed PCR for Identification of CAG Repeat Expansion in the HTT Gene in a Cohort of 503 Indian Cases with Huntington\'s Disease Symptoms.',
      journal: 'Molecular diagnosis & therapy',
      abstract: 'Huntington\'s disease (HD) is an autosomal-dominant neurodegenerative disorder with an average age at onset of 40 years. It is a polyglutamine (polyQ) disorder that is caused by an increase in the number of CAG repeats in the huntingtin (HTT) gene. Genetic tests that accurately determine the number of CAG repeats are performed for confirmation of diagnosis, predictive testing of persons at genetic risk for inheriting HD, and prenatal testing. The aim of our study was to evaluate efficacy of triplet-primed polymerase chain reaction (TP-PCR) for routine diagnosis of HD in suspected cases from India.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29526547',
      title: 'Huntingtin protein: A new option for fixing the Huntington\'s disease countdown clock.',
      journal: 'Neuropharmacology',
      abstract: 'Huntington\'s disease is a dreadful, incurable disorder. It springs from the autosomal dominant mutation in the first exon of the HTT gene, which encodes for the huntingtin protein (HTT) and results in progressive neurodegeneration. Thus far, all the attempted approaches to tackle the mutant HTT-induced toxicity causing this disease have failed. The mutant protein comes with the aberrantly expanded poly-glutamine tract. It is primarily to blame for the build-up of β-amyloid-like HTT aggregates, deleterious once broadened beyond the critical ∼35-37 repeats threshold. Recent experimental findings have provided valuable information on the molecular basis underlying this HTT-driven neurodegeneration. These findings indicate that the poly-glutamine siding regions and many post-translation modifications either abet or counter the poly-glutamine tract. This review provides an overall, up-to-date insight into HTT biophysics and structural biology, particularly discussing novel pharmacological options to specifically target the mutated protein and thus inhibit its functions and toxicity.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29401586',
      title: 'PolyQ-expanded huntingtin and ataxin-3 sequester ubiquitin adaptors hHR23B and UBQLN2 into aggregates via conjugated ubiquitin.',
      journal: 'FASEB journal : official publication of the Federation of American Societies for Experimental Biology',
      abstract: 'The components of ubiquitin (Ub)-proteasome system, such as Ub, Ub adaptors, or proteasome subunits, are commonly accumulated with the aggregated proteins in inclusions, but how protein aggregates sequester Ub-related proteins remains elusive. Using N-terminal huntingtin (Htt-N552) and ataxin (Atx)-3 as model proteins, we investigated the molecular mechanism underlying sequestration of Ub adaptors by polyQ-expanded proteins. We found that polyQ-expanded Htt-N552 and Atx-3 sequester endogenous Ub adaptors, human RAD23 homolog B (hHR23B) and ubiquilin (UBQLN)-2, into inclusions. This sequestration effect is dependent on the UBA domains of Ub adaptors and the conjugated Ub of the aggregated proteins. Moreover, polyQ-expanded Htt-N552 and Atx-3 reduce the protein level of xeroderma pigmentosum group C (XPC) by sequestration of hHR23B, suggesting that this process may cut down the available quantity of hHR23B and thus affect its normal function in stabilizing XPC. Our findings demonstrate that polyQ-expanded proteins sequester Ub adaptors or other Ub-related proteins into aggregates or inclusions through ubiquitination of the pathogenic proteins. This study may also provide a common mechanism for the formation of Ub-positive inclusions in cells.-Yang, H., Yue, H.-W., He, W.-T., Hong, J.-Y., Jiang, L.-L., Hu, H.-Y. PolyQ-expanded huntingtin and ataxin-3 sequester ubiquitin adaptors hHR23B and UBQLN2 into aggregates via conjugated ubiquitin.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29727175',
      title: 'Interaction of Huntingtin Exon-1 Peptides with Lipid-Based Micellar Nanoparticles Probed by Solution NMR and Q-Band Pulsed EPR.',
      journal: 'Journal of the American Chemical Society',
      abstract: 'Lipid-based micellar nanoparticles promote aggregation of huntingtin exon-1 peptides. Here we characterize the interaction of two such peptides, httNTQ 7 and httNTQ 10 comprising the N-terminal amphiphilic domain of huntingtin followed by 7 and 10 glutamine repeats, respectively, with 8 nm lipid micelles using NMR chemical exchange saturation transfer (CEST), circular dichroism and pulsed Q-band EPR. Exchange between free and micelle-bound httNTQ  n peptides occurs on the millisecond time scale with a KD ∼ 0.5-1 mM. Upon binding micelles, residues 1-15 adopt a helical conformation. Oxidation of Met7 to a sulfoxide reduces the binding affinity for micelles ∼3-4-fold and increases the length of the helix by a further two residues. A structure of the bound monomer unit is calculated from the backbone chemical shifts of the micelle-bound state obtained from CEST. Pulsed Q-band EPR shows that a monomer-dimer equilibrium exists on the surface of the micelles and that the two helices of the dimer adopt a parallel orientation, thereby bringing two disordered polyQ tails into close proximity which may promote aggregation upon dissociation from the micelle surface.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29685790',
      title: 'Effect of Trinucleotide Repeats in the Huntington\'s Gene on Intelligence.',
      journal: 'EBioMedicine',
      abstract: 'Huntington\'s Disease (HD) is caused by an abnormality in the HTT gene. This gene includes trinucleotide repeats ranging from 10 to 35, and when expanded beyond 39, causes HD. We previously reported that CAG repeats in the normal range had a direct and beneficial effect on brain development with higher repeats being associated with higher cognitive function. The current study now expands this line of inquiry to evaluate the effects of CAG repeat throughout the entire spectrum of repeats from 15 to 58.',
      __typename: 'PubMed'
    }, {
      year: null,
      pmid: '29630769',
      title: 'Does N-terminal huntingtin function as a \'holdase\' for inhibiting cellular protein aggregation?',
      journal: 'The FEBS journal',
      abstract: 'Proteolytic cleavage of huntingtin gives rise to N-terminal fragments. While the role of truncated mutant huntingtin is described in Huntington\'s disease (HD) pathogenesis, the function of N-terminal wild-type protein is less studied. The yeast model of HD is generated by the presence of FLAG tag and absence of polyproline tract as flanking sequences of the elongated polyglutamine stretch. We show that the same sequence derived from wild-type huntingtin exon1 is able to inhibit the aggregation of proteins in vitro and in yeast cells. It is able to stabilize client proteins as varied as luciferase, α-synuclein, and p53 in a soluble but non-native state. This is somewhat similar to the \'holdase\' function of small heat shock proteins and \'nonchaperone proteins\' which are able to stabilize partially unfolded client proteins in a nonspecific manner, slowing down their aggregation. Mutagenesis studies show this property to be localized at the N17 domain preceding the polyglutamine tract. Distortion of this ordered segment, either by deletion of this segment or mutation of a single residue (L4A), leads to decreased stability and increased aggregation of client proteins. It is interesting to note that the helical conformation of the N17 domain is also essential for aggregation of the N-terminal mutant protein. Our results provide evidence for a novel function for the amphipathic helix derived from exon1 of wild-type huntingtin.',
      __typename: 'PubMed'
    }],
  generifs: [
    {
      text: 'Electron microscopy showed that deletion of three CAG triplets or an HTT gene knockout had no significant influence on the cell structure. The insertion of 150 CAG repeats led to substantial changes in quantitative and morphological parameters of mitochondria and increased the association of mitochondria with the smooth and rough endoplasmic reticulum while causing accumulation of small autolysosomes in the cytoplasm.',
      pubs: [{
        year: null,
        pmid: '30332437',
        title: 'Introducing an expanded CAG tract into the huntingtin gene causes a wide spectrum of ultrastructural defects in cultured human cells.',
        journal: 'PloS one',
        abstract: 'Modeling of neurodegenerative diseases in vitro holds great promise for biomedical research. Human cell lines harboring a mutations in disease-causing genes are thought to recapitulate early stages of the development an inherited disease. Modern genome-editing tools allow researchers to create isogenic cell clones with an identical genetic background providing an adequate "healthy" control for biomedical and pharmacological experiments. Here, we generated isogenic mutant cell clones with 150 CAG repeats in the first exon of the huntingtin (HTT) gene using the CRISPR/Cas9 system and performed ultrastructural and morphometric analyses of the internal organization of the mutant cells. Electron microscopy showed that deletion of three CAG triplets or an HTT gene knockout had no significant influence on the cell structure. The insertion of 150 CAG repeats led to substantial changes in quantitative and morphological parameters of mitochondria and increased the association of mitochondria with the smooth and rough endoplasmic reticulum while causing accumulation of small autolysosomes in the cytoplasm. Our data indicate for the first time that expansion of the CAG repeat tract in HTT introduced via the CRISPR/Cas9 technology into a human cell line initiates numerous ultrastructural defects that are typical for Huntington\'s disease.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'These results suggest that Twist1 is an important upstream mediator of mutant Htt-induced neuronal death and may in part operate through epigenetic mechanisms.',
      pubs: [{
        year: null,
        pmid: '29891550',
        title: 'The role of Twist1 in mutant huntingtin-induced transcriptional alterations and neurotoxicity.',
        journal: 'The Journal of biological chemistry',
        abstract: 'Huntington\'s disease (HD) is a fatal neurodegenerative disorder caused by an abnormal expansion of polyglutamine repeats in the huntingtin protein (Htt). Transcriptional dysregulation is an early event in the course of HD progression and is thought to contribute to disease pathogenesis, but how mutant Htt causes transcriptional alterations and subsequent cell death in neurons is not well understood. RNA-Seq analysis revealed that expression of a mutant Htt fragment in primary cortical neurons leads to robust gene expression changes before neuronal death. Basic helix-loop-helix transcription factor Twist1, which is essential for embryogenesis and is normally expressed at low levels in mature neurons, was substantially up-regulated in mutant Htt-expressing neurons in culture and in the brains of HD mouse models. Knockdown of Twist1 by RNAi in mutant Htt-expressing primary cortical neurons reversed the altered expression of a subset of genes involved in neuronal function and, importantly, abrogated neurotoxicity. Using brain-derived neurotrophic factor (Bdnf), which is known to be involved in HD pathogenesis, as a model gene, we found that Twist1 knockdown could reverse mutant Htt-induced DNA hypermethylation at the Bdnf regulatory region and reactivate Bdnf expression. Together, these results suggest that Twist1 is an important upstream mediator of mutant Htt-induced neuronal death and may in part operate through epigenetic mechanisms.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'Lipid-based micellar nanoparticles promote aggregation of huntingtin exon-1 peptides. This study characterizes the interaction of two such peptides, htt(NT)Q7 and htt(NT)Q10 comprising the N-terminal amphiphilic domain of huntingtin followed by 7 and 10 glutamine repeats, respectively, with 8 nm lipid micelles.  Monomer-dimer equilibrium exists on the surface of the micelles.',
      pubs: [{
        year: null,
        pmid: '29727175',
        title: 'Interaction of Huntingtin Exon-1 Peptides with Lipid-Based Micellar Nanoparticles Probed by Solution NMR and Q-Band Pulsed EPR.',
        journal: 'Journal of the American Chemical Society',
        abstract: 'Lipid-based micellar nanoparticles promote aggregation of huntingtin exon-1 peptides. Here we characterize the interaction of two such peptides, httNTQ 7 and httNTQ 10 comprising the N-terminal amphiphilic domain of huntingtin followed by 7 and 10 glutamine repeats, respectively, with 8 nm lipid micelles using NMR chemical exchange saturation transfer (CEST), circular dichroism and pulsed Q-band EPR. Exchange between free and micelle-bound httNTQ  n peptides occurs on the millisecond time scale with a KD ∼ 0.5-1 mM. Upon binding micelles, residues 1-15 adopt a helical conformation. Oxidation of Met7 to a sulfoxide reduces the binding affinity for micelles ∼3-4-fold and increases the length of the helix by a further two residues. A structure of the bound monomer unit is calculated from the backbone chemical shifts of the micelle-bound state obtained from CEST. Pulsed Q-band EPR shows that a monomer-dimer equilibrium exists on the surface of the micelles and that the two helices of the dimer adopt a parallel orientation, thereby bringing two disordered polyQ tails into close proximity which may promote aggregation upon dissociation from the micelle surface.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'Study showed that SV2C is highly expressed in the basal ganglia and hippocampus of mice and that there is a specific and progressive decrease in SV2C mRNA and protein expression in both Huntington\'s disease (HD) mice and a cell model. These findings suggest that the synaptic dysfunction in HD results from the mutant Htt-mediated inhibition of SV2C transcriptional expression.',
      pubs: [{
        year: null,
        pmid: '29713895',
        title: 'Mutant Huntingtin Causes a Selective Decrease in the Expression of Synaptic Vesicle Protein 2C.',
        journal: 'Neuroscience bulletin',
        abstract: 'Huntington\'s disease (HD) is a neurodegenerative disease caused by a polyglutamine expansion in the huntingtin (Htt) protein. Mutant Htt causes synaptic transmission dysfunctions by interfering in the expression of synaptic proteins, leading to early HD symptoms. Synaptic vesicle proteins 2 (SV2s), a family of synaptic vesicle proteins including 3 members, SV2A, SV2B, and SV2C, plays important roles in synaptic physiology. Here, we investigated whether the expression of SV2s is affected by mutant Htt in the brains of HD transgenic (TG) mice and Neuro2a mouse neuroblastoma cells (N2a cells) expressing mutant Htt. Western blot analysis showed that the protein levels of SV2A and SV2B were not significantly changed in the brains of HD TG mice expressing mutant Htt with 82 glutamine repeats. However, in the TG mouse brain there was a dramatic decrease in the protein level of SV2C, which has a restricted distribution pattern in regions particularly vulnerable in HD. Immunostaining revealed that the immunoreactivity of SV2C was progressively weakened in the basal ganglia and hippocampus of TG mice. RT-PCR demonstrated that the mRNA level of SV2C progressively declined in the TG mouse brain without detectable changes in the mRNA levels of SV2A and SV2B, indicating that mutant Htt selectively inhibits the transcriptional expression of SV2C. Furthermore, we found that only SV2C expression was progressively inhibited in N2a cells expressing a mutant Htt containing 120 glutamine repeats. These findings suggest that the synaptic dysfunction in HD results from the mutant Htt-mediated inhibition of SV2C transcriptional expression. These data also imply that the restricted distribution and decreased expression of SV2C contribute to the brain region-selective pathology of HD.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'The number of repeats in HTT, had a non-linear effect on a measure of general intelligence with an inverted U shape pattern. Increasing repeat length was associated with higher GAI scores up until roughly 40-41 repeats. After this peak, increasing repeat length was associated with declining GAI scores.',
      pubs: [{
        year: null,
        pmid: '29685790',
        title: 'Effect of Trinucleotide Repeats in the Huntington\'s Gene on Intelligence.',
        journal: 'EBioMedicine',
        abstract: 'Huntington\'s Disease (HD) is caused by an abnormality in the HTT gene. This gene includes trinucleotide repeats ranging from 10 to 35, and when expanded beyond 39, causes HD. We previously reported that CAG repeats in the normal range had a direct and beneficial effect on brain development with higher repeats being associated with higher cognitive function. The current study now expands this line of inquiry to evaluate the effects of CAG repeat throughout the entire spectrum of repeats from 15 to 58.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'We therefore designed a longitudinal multimodal in vivo MRI, DTI and MRS study to investigate structural and neurochemical alterations associated with the disorder at different stages and brain structures (i.e.  PFC, striatum, GP, hippocampus and thalamus), to understand the nature of neural changes in transgenic YAC128 mice, expressing the human full-length mutant HTT',
      pubs: [{
        year: null,
        pmid: '29668904',
        title: 'A whole brain longitudinal study in the YAC128 mouse model of Huntington\'s disease shows distinct trajectories of neurochemical, structural connectivity and volumetric changes.',
        journal: 'Human molecular genetics',
        abstract: 'Huntington\'s disease (HD) is a neurodegenerative disorder causing cognitive and motor impairments, evolving to death within 15-20 years after symptom onset. We previously established a mouse model with the entire human HD gene containing 128 CAG repeats (YAC128) which accurately recapitulates the natural history of the human disease. Defined time points in this natural history enable the understanding of longitudinal trajectories from the neurochemical and structural points of view using non-invasive high-resolution multi-modal imaging. Accordingly, we designed a longitudinal structural imaging (MRI and DTI) and spectroscopy (1H-MRS) study in YAC128, at 3, 6, 9 and 12 months of age, at 9.4 T. Structural analysis (MRI/DTI), confirmed that the striatum is the earliest affected brain region, but other regions were also identified through connectivity analysis (pre-frontal cortex, hippocampus, globus pallidus and thalamus), suggesting a striking homology with the human disease. Importantly, we found for the first time, a negative correlation between striatal and hippocampal changes only in YAC128. In fact, the striatum showed accelerated volumetric decay in HD, as opposed to the hippocampus. Neurochemical analysis of the HD striatum suggested early neurometabolic alterations in neurotransmission and metabolism, with a significant increase in striatal GABA levels, and specifically anticorrelated levels of N-acetyl aspartate and taurine, suggesting that the later is homeostatically adjusted for neuroprotection, as neural loss, indicated by the former, is progressing. These results provide novel insights into the natural history of HD and prove a valuable role for longitudinal multi-modal panels of structural and metabolite/neurotransmission in the YAC128 model.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'results provide evidence for a novel function for the amphipathic helix derived from exon1 of wild-type huntingtin',
      pubs: [{
        year: null,
        pmid: '29630769',
        title: 'Does N-terminal huntingtin function as a \'holdase\' for inhibiting cellular protein aggregation?',
        journal: 'The FEBS journal',
        abstract: 'Proteolytic cleavage of huntingtin gives rise to N-terminal fragments. While the role of truncated mutant huntingtin is described in Huntington\'s disease (HD) pathogenesis, the function of N-terminal wild-type protein is less studied. The yeast model of HD is generated by the presence of FLAG tag and absence of polyproline tract as flanking sequences of the elongated polyglutamine stretch. We show that the same sequence derived from wild-type huntingtin exon1 is able to inhibit the aggregation of proteins in vitro and in yeast cells. It is able to stabilize client proteins as varied as luciferase, α-synuclein, and p53 in a soluble but non-native state. This is somewhat similar to the \'holdase\' function of small heat shock proteins and \'nonchaperone proteins\' which are able to stabilize partially unfolded client proteins in a nonspecific manner, slowing down their aggregation. Mutagenesis studies show this property to be localized at the N17 domain preceding the polyglutamine tract. Distortion of this ordered segment, either by deletion of this segment or mutation of a single residue (L4A), leads to decreased stability and increased aggregation of client proteins. It is interesting to note that the helical conformation of the N17 domain is also essential for aggregation of the N-terminal mutant protein. Our results provide evidence for a novel function for the amphipathic helix derived from exon1 of wild-type huntingtin.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'Inverse relationship has been found between the length of CAG HTT repeats and age at clinical onset of Huntington\'s Disease in Indian population.',
      pubs: [{
        year: null,
        pmid: '29619771',
        title: 'A Study of Triplet-Primed PCR for Identification of CAG Repeat Expansion in the HTT Gene in a Cohort of 503 Indian Cases with Huntington\'s Disease Symptoms.',
        journal: 'Molecular diagnosis & therapy',
        abstract: 'Huntington\'s disease (HD) is an autosomal-dominant neurodegenerative disorder with an average age at onset of 40 years. It is a polyglutamine (polyQ) disorder that is caused by an increase in the number of CAG repeats in the huntingtin (HTT) gene. Genetic tests that accurately determine the number of CAG repeats are performed for confirmation of diagnosis, predictive testing of persons at genetic risk for inheriting HD, and prenatal testing. The aim of our study was to evaluate efficacy of triplet-primed polymerase chain reaction (TP-PCR) for routine diagnosis of HD in suspected cases from India.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'This review provides an overall, up-to-date insight into HTT biophysics and structural biology, particularly discussing novel pharmacological options to specifically target the mutated protein and thus inhibit its functions and toxicity.',
      pubs: [{
        year: null,
        pmid: '29526547',
        title: 'Huntingtin protein: A new option for fixing the Huntington\'s disease countdown clock.',
        journal: 'Neuropharmacology',
        abstract: 'Huntington\'s disease is a dreadful, incurable disorder. It springs from the autosomal dominant mutation in the first exon of the HTT gene, which encodes for the huntingtin protein (HTT) and results in progressive neurodegeneration. Thus far, all the attempted approaches to tackle the mutant HTT-induced toxicity causing this disease have failed. The mutant protein comes with the aberrantly expanded poly-glutamine tract. It is primarily to blame for the build-up of β-amyloid-like HTT aggregates, deleterious once broadened beyond the critical ∼35-37 repeats threshold. Recent experimental findings have provided valuable information on the molecular basis underlying this HTT-driven neurodegeneration. These findings indicate that the poly-glutamine siding regions and many post-translation modifications either abet or counter the poly-glutamine tract. This review provides an overall, up-to-date insight into HTT biophysics and structural biology, particularly discussing novel pharmacological options to specifically target the mutated protein and thus inhibit its functions and toxicity.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }, {
      text: 'Results show that not only prolonged fasting but also scheduled feeding without forcibly reducing calorie intake alters nutrient-sensing pathways and activates autophagy in mouse brain. This intervention furthermore reduces the amounts of mutant HTT protein, and may thus contribute to its clearance.',
      pubs: [{
        year: null,
        pmid: '29510748',
        title: 'Preventing mutant huntingtin proteolysis and intermittent fasting promote autophagy in models of Huntington disease.',
        journal: 'Acta neuropathologica communications',
        abstract: 'Huntington disease (HD) is caused by the expression of mutant huntingtin (mHTT) bearing a polyglutamine expansion. In HD, mHTT accumulation is accompanied by a dysfunction in basal autophagy, which manifests as specific defects in cargo loading during selective autophagy. Here we show that the expression of mHTT resistant to proteolysis at the caspase cleavage site D586 (C6R mHTT) increases autophagy, which may be due to its increased binding to the autophagy adapter p62. This is accompanied by faster degradation of C6R mHTT in vitro and a lack of mHTT accumulation the C6R mouse model with age. These findings may explain the previously observed neuroprotective properties of C6R mHTT. As the C6R mutation cannot be easily translated into a therapeutic approach, we show that a scheduled feeding paradigm is sufficient to lower mHTT levels in YAC128 mice expressing cleavable mHTT. This is consistent with a previous model, where the presence of cleavable mHTT impairs basal autophagy, while fasting-induced autophagy remains functional. In HD, mHTT clearance and autophagy may become increasingly impaired as a function of age and disease stage, because of gradually increased activity of mHTT-processing enzymes. Our findings imply that mHTT clearance could be enhanced by a regulated dietary schedule that promotes autophagy.',
        __typename: 'PubMed'
      }],
      __typename: 'GeneRIF'
    }],
  omimCount: 3,
  omimTerms: [
    {term: 'HUNTINGTON DISEASE', mimid: 143100, __typename: 'MIM'}, {
      term: 'HUNTINGTIN',
      mimid: 613004,
      __typename: 'MIM'
    }, {term: 'LOPES-MACIEL-RODAN SYNDROME', mimid: 617435, __typename: 'MIM'}],
  expressions: [
    {
      type: 'HPA',
      tissue: 'adrenal gland - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'adrenal gland', uid: 'UBERON:0002369', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'appendix - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'vermiform appendix', uid: 'UBERON:0001154', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'appendix - lymphoid tissue',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'vermiform appendix', uid: 'UBERON:0001154', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'bone marrow - hematopoietic cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'bone marrow', uid: 'UBERON:0002371', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'breast - adipocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'breast', uid: 'UBERON:0000310', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'breast - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'breast', uid: 'UBERON:0000310', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'breast - myoepithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'breast', uid: 'UBERON:0000310', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'bronchus - respiratory epithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'bronchus', uid: 'UBERON:0002185', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'caudate - glial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'caudate nucleus', uid: 'UBERON:0001873', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'caudate - neuronal cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'caudate nucleus', uid: 'UBERON:0001873', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cerebellum - cells in granular layer',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'cerebellum', uid: 'UBERON:0002037', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cerebellum - cells in molecular layer',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'cerebellum', uid: 'UBERON:0002037', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cerebellum - Purkinje cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'Purkinje cell layer of cerebellar cortex', uid: 'UBERON:0002979', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cerebral cortex - endothelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'cerebral cortex', uid: 'UBERON:0000956', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cerebral cortex - glial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'cerebral cortex', uid: 'UBERON:0000956', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cerebral cortex - neuronal cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'cerebral cortex', uid: 'UBERON:0000956', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cerebral cortex - neuropil',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'cerebral cortex', uid: 'UBERON:0000956', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cervix, uterine - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'uterine cervix', uid: 'UBERON:0000002', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'cervix, uterine - squamous epithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'uterine cervix', uid: 'UBERON:0000002', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'colon - endothelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'colon - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'colon - peripheral nerve/ganglion',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'duodenum - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'duodenum', uid: 'UBERON:0002114', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'endometrium - cells in endometrial stroma',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'endometrial stroma', uid: 'UBERON:0002337', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'endometrium - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'endometrium glandular epithelium', uid: 'UBERON:0012276', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'epididymis - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'epididymis', uid: 'UBERON:0001301', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'esophagus - squamous epithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'esophagus squamous epithelium', uid: 'UBERON:0006920', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'fallopian tube - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'fallopian tube', uid: 'UBERON:0003889', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'gallbladder - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'gall bladder', uid: 'UBERON:0002110', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'heart muscle - myocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'myocardium', uid: 'UBERON:0002349', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'hippocampus - glial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'hippocampus fimbria', uid: 'UBERON:0002310', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'hippocampus - neuronal cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'hippocampus fimbria', uid: 'UBERON:0002310', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'kidney - cells in glomeruli',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'renal glomerulus', uid: 'UBERON:0000074', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'kidney - cells in tubules',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'nephron tubule', uid: 'UBERON:0001231', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'liver - bile duct cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'bile duct', uid: 'UBERON:0002394', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'liver - hepatocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'lung - macrophages',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'lung - pneumocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'lymph node - germinal center cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'lymph node', uid: 'UBERON:0000029', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'lymph node - non-germinal center cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'lymph node', uid: 'UBERON:0000029', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'nasopharynx - respiratory epithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'nasopharynx', uid: 'UBERON:0001728', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'oral mucosa - squamous epithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'oral epithelium', uid: 'UBERON:0002424', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'ovary - follicle cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'ovarian follicle', uid: 'UBERON:0001305', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'ovary - ovarian stroma cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'ovary stroma', uid: 'UBERON:0006960', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'pancreas - exocrine glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'pancreas', uid: 'UBERON:0001264', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'pancreas - islets of Langerhans',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'islet of Langerhans', uid: 'UBERON:0000006', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'parathyroid gland - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'parathyroid gland', uid: 'UBERON:0001132', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'placenta - decidual cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'placenta', uid: 'UBERON:0001987', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'placenta - trophoblastic cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'placenta', uid: 'UBERON:0001987', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'prostate - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'prostate gland', uid: 'UBERON:0002367', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'rectum - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'rectum', uid: 'UBERON:0001052', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'salivary gland - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'saliva-secreting gland', uid: 'UBERON:0001044', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'seminal vesicle - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'seminal vesicle', uid: 'UBERON:0000998', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'skeletal muscle - myocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'skeletal muscle tissue', uid: 'UBERON:0001134', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'skin - epidermal cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'skin of body', uid: 'UBERON:0002097', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'skin - fibroblasts',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'skin of body', uid: 'UBERON:0002097', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'skin - keratinocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'skin of body', uid: 'UBERON:0002097', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'skin - Langerhans',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'skin of body', uid: 'UBERON:0002097', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'skin - melanocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'skin of body', uid: 'UBERON:0002097', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'small intestine - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'small intestine', uid: 'UBERON:0002108', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'smooth muscle - smooth muscle cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'smooth muscle tissue', uid: 'UBERON:0001135', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'soft tissue - adipocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'soft tissue - chondrocytes',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'cartilage tissue', uid: 'UBERON:0002418', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'soft tissue - fibroblasts',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'soft tissue - peripheral nerve',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'nerve', uid: 'UBERON:0001021', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'spleen - cells in red pulp',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'red pulp of spleen', uid: 'UBERON:0001250', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'spleen - cells in white pulp',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'white pulp of spleen', uid: 'UBERON:0001959', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'stomach - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'stomach glandular epithelium', uid: 'UBERON:0006924', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'testis - cells in seminiferous ducts',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'seminiferous tubule of testis', uid: 'UBERON:0001343', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'testis - Leydig cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'Leydig cell region of testis', uid: 'UBERON:0005212', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'thyroid gland - glandular cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'thyroid gland', uid: 'UBERON:0002046', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'tonsil - germinal center cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'tonsil', uid: 'UBERON:0002372', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'tonsil - non-germinal center cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'tonsil', uid: 'UBERON:0002372', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'tonsil - squamous epithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'tonsil', uid: 'UBERON:0002372', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'urinary bladder - urothelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'urinary bladder', uid: 'UBERON:0001255', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPA',
      tissue: 'vagina - squamous epithelial cells',
      qual: null,
      value: null,
      evidence: 'Enhanced',
      zscore: null,
      conf: null,
      uberon: {name: 'vagina', uid: 'UBERON:0000996', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Adrenal',
      qual: null,
      value: '1.301099',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'adrenal gland', uid: 'UBERON:0002369', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Colon',
      qual: null,
      value: '0.781676',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Esophagus',
      qual: null,
      value: '0.678067',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'esophagus', uid: 'UBERON:0001043', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Frontal Cortex',
      qual: null,
      value: '1.896829',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'frontal cortex', uid: 'UBERON:0001870', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Gallbladder',
      qual: null,
      value: '0.592595',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'gall bladder', uid: 'UBERON:0002110', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Heart',
      qual: null,
      value: '1.010367',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'heart', uid: 'UBERON:0000948', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Kidney',
      qual: null,
      value: '1.069814',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'kidney', uid: 'UBERON:0002113', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Liver',
      qual: null,
      value: '1.285237',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Lung',
      qual: null,
      value: '0.683146',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Ovary',
      qual: null,
      value: '1.784741',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Pancreas',
      qual: null,
      value: '1.065586',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'pancreas', uid: 'UBERON:0001264', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Prostate',
      qual: null,
      value: '0.805446',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'prostate gland', uid: 'UBERON:0002367', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Rectum',
      qual: null,
      value: '0.885534',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'rectum', uid: 'UBERON:0001052', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Retina',
      qual: null,
      value: '1.575401',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'retina', uid: 'UBERON:0000966', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Spinal Cord',
      qual: null,
      value: '1.279744',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'spinal cord', uid: 'UBERON:0002240', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Testis',
      qual: null,
      value: '1.568001',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Adult Urinary Bladder',
      qual: null,
      value: '1.135471',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'urinary bladder', uid: 'UBERON:0001255', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'B Cells',
      qual: null,
      value: '1.701864',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'CD4 Cells',
      qual: null,
      value: '1.627235',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'CD8 Cells',
      qual: null,
      value: '1.656308',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Fetal Brain',
      qual: null,
      value: '1.478329',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Fetal Gut',
      qual: null,
      value: '0.670636',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'presumptive gut', uid: 'UBERON:0007026', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Fetal Heart',
      qual: null,
      value: '1.019926',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Fetal Liver',
      qual: null,
      value: '0.88478',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Fetal Ovary',
      qual: null,
      value: '1.045232',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Fetal Testis',
      qual: null,
      value: '0.864105',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Monocytes',
      qual: null,
      value: '1.505408',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'NK Cells',
      qual: null,
      value: '1.271195',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Placenta',
      qual: null,
      value: '0.230138',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'placenta', uid: 'UBERON:0001987', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Gene',
      tissue: 'Platelets',
      qual: null,
      value: '1.35743',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Adrenal',
      qual: null,
      value: '1.301099',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'adrenal gland', uid: 'UBERON:0002369', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Colon',
      qual: null,
      value: '0.781676',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Esophagus',
      qual: null,
      value: '0.678067',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'esophagus', uid: 'UBERON:0001043', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Frontal Cortex',
      qual: null,
      value: '1.896829',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'frontal cortex', uid: 'UBERON:0001870', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Gallbladder',
      qual: null,
      value: '0.592595',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'gall bladder', uid: 'UBERON:0002110', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Heart',
      qual: null,
      value: '1.010367',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'heart', uid: 'UBERON:0000948', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Kidney',
      qual: null,
      value: '1.069814',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'kidney', uid: 'UBERON:0002113', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Liver',
      qual: null,
      value: '1.285237',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Lung',
      qual: null,
      value: '0.683146',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Ovary',
      qual: null,
      value: '1.784741',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Pancreas',
      qual: null,
      value: '1.065586',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'pancreas', uid: 'UBERON:0001264', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Prostate',
      qual: null,
      value: '0.805446',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'prostate gland', uid: 'UBERON:0002367', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Rectum',
      qual: null,
      value: '0.885534',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'rectum', uid: 'UBERON:0001052', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Retina',
      qual: null,
      value: '1.575401',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'retina', uid: 'UBERON:0000966', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Spinal Cord',
      qual: null,
      value: '1.279744',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'spinal cord', uid: 'UBERON:0002240', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Testis',
      qual: null,
      value: '1.568001',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Adult Urinary Bladder',
      qual: null,
      value: '1.135471',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'urinary bladder', uid: 'UBERON:0001255', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'B Cells',
      qual: null,
      value: '1.701864',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'CD4 Cells',
      qual: null,
      value: '1.627235',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'CD8 Cells',
      qual: null,
      value: '1.656308',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Fetal Brain',
      qual: null,
      value: '1.478329',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Fetal Gut',
      qual: null,
      value: '0.670636',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'presumptive gut', uid: 'UBERON:0007026', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Fetal Heart',
      qual: null,
      value: '1.019926',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Fetal Liver',
      qual: null,
      value: '0.88478',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Fetal Ovary',
      qual: null,
      value: '1.045232',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Fetal Testis',
      qual: null,
      value: '0.864105',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Monocytes',
      qual: null,
      value: '1.505408',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'NK Cells',
      qual: null,
      value: '1.271195',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Placenta',
      qual: null,
      value: '0.230138',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'placenta', uid: 'UBERON:0001987', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'HPM Protein',
      tissue: 'Platelets',
      qual: null,
      value: '1.35743',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Cardiac proteome',
      tissue: 'Left atrium',
      qual: null,
      value: '1.6E7, 2.9E7, 1.0E7',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'left cardiac atrium', uid: 'UBERON:0002079', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Cardiac proteome',
      tissue: 'Left ventricle',
      qual: null,
      value: '1.6E8, 1.6E8, 1.9E7',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'heart left ventricle', uid: 'UBERON:0002084', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Cardiac proteome',
      tissue: 'Right atrium',
      qual: null,
      value: '1.1E7, 1.6E7, 9.1E6',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'right cardiac atrium', uid: 'UBERON:0002078', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Adipose tissue',
      qual: null,
      value: '172 intensity units',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'adipose tissue', uid: 'UBERON:0001013', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Cerebellum',
      qual: null,
      value: '242 intensity units',
      evidence: null,
      zscore: null,
      conf: 1.2,
      uberon: {name: 'cerebellum', uid: 'UBERON:0002037', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Corpus callosum',
      qual: null,
      value: '209 intensity units',
      evidence: null,
      zscore: null,
      conf: 1.1,
      uberon: {name: 'corpus callosum', uid: 'UBERON:0002336', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Frontal lobe',
      qual: null,
      value: '292 intensity units',
      evidence: null,
      zscore: null,
      conf: 1.4,
      uberon: {name: 'frontal cortex', uid: 'UBERON:0001870', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Heart',
      qual: null,
      value: '112 intensity units',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'heart', uid: 'UBERON:0000948', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Kidney',
      qual: null,
      value: '152 intensity units',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'adult mammalian kidney', uid: 'UBERON:0000082', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Liver',
      qual: null,
      value: '185 intensity units',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Occipital lobe',
      qual: null,
      value: '345 intensity units',
      evidence: null,
      zscore: null,
      conf: 1.5,
      uberon: {name: 'occipital lobe', uid: 'UBERON:0002021', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Ovary',
      qual: null,
      value: '169 intensity units',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Parietal lobe',
      qual: null,
      value: '312 intensity units',
      evidence: null,
      zscore: null,
      conf: 1.4,
      uberon: {name: 'parietal lobe', uid: 'UBERON:0001872', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Skeletal muscle',
      qual: null,
      value: '148 intensity units',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'skeletal muscle organ', uid: 'UBERON:0014892', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Spinal cord',
      qual: null,
      value: '189 intensity units',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'spinal cord', uid: 'UBERON:0002240', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Stomach',
      qual: null,
      value: '150 intensity units',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'stomach', uid: 'UBERON:0000945', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Temporal lobe',
      qual: null,
      value: '322 intensity units',
      evidence: null,
      zscore: null,
      conf: 1.5,
      uberon: {name: 'temporal lobe', uid: 'UBERON:0001871', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Testis',
      qual: null,
      value: '198 intensity units',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment Exon array',
      tissue: 'Vermiform appendix',
      qual: null,
      value: '190 intensity units',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'vermiform appendix', uid: 'UBERON:0001154', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Adrenal cortex',
      qual: null,
      value: '37 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'adrenal cortex', uid: 'UBERON:0001235', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Amygdala',
      qual: null,
      value: '21 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'amygdala', uid: 'UBERON:0001876', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'B-lymphoblastoid cell',
      qual: null,
      value: '62 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Blood',
      qual: null,
      value: '21 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'blood', uid: 'UBERON:0000178', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Bone marrow',
      qual: null,
      value: '22 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'bone marrow', uid: 'UBERON:0002371', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Cerebral peduncle',
      qual: null,
      value: '35 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.2,
      uberon: {name: 'cerebral peduncle', uid: 'UBERON:0002623', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Cingulate cortex',
      qual: null,
      value: '35 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.2,
      uberon: {name: 'cingulate cortex', uid: 'UBERON:0003027', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Cytotoxic T-lymphocyte',
      qual: null,
      value: '28 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'cytotoxic T cell', uid: 'CL:0000910', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Dendritic cell',
      qual: null,
      value: '29 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.2,
      uberon: {name: 'dendritic cell', uid: 'CL:0000451', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Embryonic brain',
      qual: null,
      value: '29 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.2,
      uberon: {name: 'future brain', uid: 'UBERON:0006238', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Erythroid cell',
      qual: null,
      value: '25 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Globus pallidus',
      qual: null,
      value: '23 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'globus pallidus', uid: 'UBERON:0001875', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Heart',
      qual: null,
      value: '21 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'heart', uid: 'UBERON:0000948', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Helper T-lymphocyte',
      qual: null,
      value: '28 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'helper T cell', uid: 'CL:0000912', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Hypothalamus',
      qual: null,
      value: '23 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'hypothalamus', uid: 'UBERON:0001898', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Liver',
      qual: null,
      value: '21 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Medulla oblongata',
      qual: null,
      value: '28 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'medulla oblongata', uid: 'UBERON:0001896', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Monocyte',
      qual: null,
      value: '23 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'monocyte', uid: 'CL:0000576', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Natural killer cell',
      qual: null,
      value: '38 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'natural killer cell', uid: 'CL:0000623', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Occipital lobe',
      qual: null,
      value: '26 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'occipital lobe', uid: 'UBERON:0002021', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Olfactory bulb',
      qual: null,
      value: '22 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'olfactory bulb', uid: 'UBERON:0002264', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Pancreatic islet',
      qual: null,
      value: '22 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'islet of Langerhans', uid: 'UBERON:0000006', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Parenchyma',
      qual: null,
      value: '21 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'cardiac muscle cell', uid: 'CL:0000746', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Parietal lobe',
      qual: null,
      value: '29 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.2,
      uberon: {name: 'parietal lobe', uid: 'UBERON:0001872', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Pineal gland',
      qual: null,
      value: '31 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.2,
      uberon: {name: 'pineal body', uid: 'UBERON:0001905', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Pons',
      qual: null,
      value: '27 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'pons', uid: 'UBERON:0000988', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Prefrontal cortex',
      qual: null,
      value: '72 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'prefrontal cortex', uid: 'UBERON:0000451', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Retina',
      qual: null,
      value: '21 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'retina', uid: 'UBERON:0000966', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Skeletal muscle',
      qual: null,
      value: '35 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.2,
      uberon: {name: 'skeletal muscle organ', uid: 'UBERON:0014892', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Spinal cord',
      qual: null,
      value: '22 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'spinal cord', uid: 'UBERON:0002240', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Subthalamic nucleus',
      qual: null,
      value: '26 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'subthalamic nucleus', uid: 'UBERON:0001906', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Superior cervical ganglion',
      qual: null,
      value: '41 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'superior cervical ganglion', uid: 'UBERON:0001989', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Thalamus',
      qual: null,
      value: '22 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'dorsal plus ventral thalamus', uid: 'UBERON:0001897', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Tonsil',
      qual: null,
      value: '21 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'tonsil', uid: 'UBERON:0002372', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Trigeminal ganglion',
      qual: null,
      value: '22 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0,
      uberon: {name: 'trigeminal ganglion', uid: 'UBERON:0001675', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment GNF',
      tissue: 'Vermiform appendix',
      qual: null,
      value: '25 Intensity units',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'vermiform appendix', uid: 'UBERON:0001154', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Adrenal gland',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'adrenal gland', uid: 'UBERON:0002369', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Bone marrow',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'bone marrow', uid: 'UBERON:0002371', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Breast',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'breast', uid: 'UBERON:0000310', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Bronchus',
      qual: null,
      value: 'High: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 1.2,
      uberon: {name: 'bronchus', uid: 'UBERON:0002185', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Cardiac muscle',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.4,
      uberon: {name: 'cardiac muscle tissue', uid: 'UBERON:0001133', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Cerebellum',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'cerebellum', uid: 'UBERON:0002037', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Cerebral cortex',
      qual: null,
      value: 'High: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 1.6,
      uberon: {name: 'cerebral cortex', uid: 'UBERON:0000956', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Colon',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Connective tissue',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.4,
      uberon: {name: 'connective tissue', uid: 'UBERON:0002384', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Duodenum',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'duodenum', uid: 'UBERON:0002114', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Epididymis',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'epididymis', uid: 'UBERON:0001301', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Esophagus',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'esophagus', uid: 'UBERON:0001043', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Gall bladder',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'gall bladder', uid: 'UBERON:0002110', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Hippocampus',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'hippocampal formation', uid: 'UBERON:0002421', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Kidney',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'adult mammalian kidney', uid: 'UBERON:0000082', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Lateral ventricle',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'telencephalic ventricle', uid: 'UBERON:0002285', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Liver',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Lung',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Lymph node',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'lymph node', uid: 'UBERON:0000029', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Nasopharynx',
      qual: null,
      value: 'High: 1 antibody\\nLow: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'nasopharynx', uid: 'UBERON:0001728', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Oral mucosa',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.4,
      uberon: {name: 'mouth mucosa', uid: 'UBERON:0003729', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Ovary',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Oviduct',
      qual: null,
      value: 'High: 1 antibody\\nLow: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'oviduct', uid: 'UBERON:0000993', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Pancreas',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'pancreas', uid: 'UBERON:0001264', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Parathyroid gland',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'parathyroid gland', uid: 'UBERON:0001132', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Placenta',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'placenta', uid: 'UBERON:0001987', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Prostate gland',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'prostate gland', uid: 'UBERON:0002367', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Rectum',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'rectum', uid: 'UBERON:0001052', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Salivary gland',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'saliva-secreting gland', uid: 'UBERON:0001044', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Seminal vesicle',
      qual: null,
      value: 'High: 1 antibody\\nLow: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'seminal vesicle', uid: 'UBERON:0000998', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Skeletal muscle',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'skeletal muscle organ', uid: 'UBERON:0014892', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Skin',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'skin of body', uid: 'UBERON:0002097', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Smooth muscle',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.1,
      uberon: {name: 'smooth muscle tissue', uid: 'UBERON:0001135', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Spleen',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.4,
      uberon: {name: 'spleen', uid: 'UBERON:0002106', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Stomach',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'stomach', uid: 'UBERON:0000945', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Testis',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Tonsil',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'tonsil', uid: 'UBERON:0002372', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Urinary bladder',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'urinary bladder', uid: 'UBERON:0001255', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Uterine cervix',
      qual: null,
      value: 'Low: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.3,
      uberon: {name: 'uterine cervix', uid: 'UBERON:0000002', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Uterine endometrium',
      qual: null,
      value: 'Medium: 2 antibodies',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'endometrium', uid: 'UBERON:0001295', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Vagina',
      qual: null,
      value: 'Low: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 0.4,
      uberon: {name: 'vagina', uid: 'UBERON:0000996', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA',
      tissue: 'Vermiform appendix',
      qual: null,
      value: 'High: 1 antibody\\nMedium: 1 antibody',
      evidence: null,
      zscore: null,
      conf: 1.2,
      uberon: {name: 'vermiform appendix', uid: 'UBERON:0001154', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Adrenal gland',
      qual: null,
      value: '9.5 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'adrenal gland', uid: 'UBERON:0002369', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Bone marrow',
      qual: null,
      value: '15.7 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'bone marrow', uid: 'UBERON:0002371', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Cardiac muscle',
      qual: null,
      value: '5.7 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'cardiac muscle tissue', uid: 'UBERON:0001133', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Cerebral cortex',
      qual: null,
      value: '15.0 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'cerebral cortex', uid: 'UBERON:0000956', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Colon',
      qual: null,
      value: '16.0 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Duodenum',
      qual: null,
      value: '8.6 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'duodenum', uid: 'UBERON:0002114', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Esophagus',
      qual: null,
      value: '14.0 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'esophagus', uid: 'UBERON:0001043', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Gall bladder',
      qual: null,
      value: '14.1 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'gall bladder', uid: 'UBERON:0002110', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Kidney',
      qual: null,
      value: '13.8 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'adult mammalian kidney', uid: 'UBERON:0000082', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Liver',
      qual: null,
      value: '5.9 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Lung',
      qual: null,
      value: '15.4 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Lymph node',
      qual: null,
      value: '17.9 FPKM',
      evidence: null,
      zscore: null,
      conf: 1.1,
      uberon: {name: 'lymph node', uid: 'UBERON:0000029', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Ovary',
      qual: null,
      value: '9.5 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Pancreas',
      qual: null,
      value: '13.8 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'pancreas', uid: 'UBERON:0001264', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Placenta',
      qual: null,
      value: '10.4 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'placenta', uid: 'UBERON:0001987', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Prostate gland',
      qual: null,
      value: '9.7 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'prostate gland', uid: 'UBERON:0002367', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Salivary gland',
      qual: null,
      value: '6.9 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'saliva-secreting gland', uid: 'UBERON:0001044', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Skin',
      qual: null,
      value: '20.3 FPKM',
      evidence: null,
      zscore: null,
      conf: 1.1,
      uberon: {name: 'skin of body', uid: 'UBERON:0002097', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Spleen',
      qual: null,
      value: '14.5 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'spleen', uid: 'UBERON:0002106', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Stomach',
      qual: null,
      value: '9.8 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'stomach', uid: 'UBERON:0000945', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Testis',
      qual: null,
      value: '16.7 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Thyroid gland',
      qual: null,
      value: '18.2 FPKM',
      evidence: null,
      zscore: null,
      conf: 1.1,
      uberon: {name: 'thyroid gland', uid: 'UBERON:0002046', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Urinary bladder',
      qual: null,
      value: '11.8 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'urinary bladder', uid: 'UBERON:0001255', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Uterus',
      qual: null,
      value: '10.5 FPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'uterus', uid: 'UBERON:0000995', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPA-RNA',
      tissue: 'Vermiform appendix',
      qual: null,
      value: '13.5 FPKM',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'vermiform appendix', uid: 'UBERON:0001154', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Adrenal gland',
      qual: null,
      value: '13 peptides',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'adrenal gland', uid: 'UBERON:0002369', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'B-lymphocyte',
      qual: null,
      value: '50 peptides',
      evidence: null,
      zscore: null,
      conf: 2.2,
      uberon: {name: 'B cell', uid: 'CL:0000236', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Blood platelet',
      qual: null,
      value: '24 peptides',
      evidence: null,
      zscore: null,
      conf: 1.3,
      uberon: {name: 'platelet', uid: 'CL:0000233', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Brain',
      qual: null,
      value: '15 peptides',
      evidence: null,
      zscore: null,
      conf: 1,
      uberon: {name: 'brain', uid: 'UBERON:0000955', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'BTO:0004410',
      qual: null,
      value: '50 peptides',
      evidence: null,
      zscore: null,
      conf: 2.2,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'BTO:0005453',
      qual: null,
      value: '40 peptides',
      evidence: null,
      zscore: null,
      conf: 1.8,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Colon',
      qual: null,
      value: '3 peptides',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Esophagus',
      qual: null,
      value: '2 peptides',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'esophagus', uid: 'UBERON:0001043', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Frontal lobe',
      qual: null,
      value: '81 peptides',
      evidence: null,
      zscore: null,
      conf: 3.2,
      uberon: {name: 'frontal cortex', uid: 'UBERON:0001870', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Gall bladder',
      qual: null,
      value: '2 peptides',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'gall bladder', uid: 'UBERON:0002110', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Gut',
      qual: null,
      value: '6 peptides',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'digestive tract', uid: 'UBERON:0001555', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Heart',
      qual: null,
      value: '7 peptides',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'heart', uid: 'UBERON:0000948', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Liver',
      qual: null,
      value: '13 peptides',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Monocyte',
      qual: null,
      value: '9 peptides',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'monocyte', uid: 'CL:0000576', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Natural killer cell',
      qual: null,
      value: '20 peptides',
      evidence: null,
      zscore: null,
      conf: 1.2,
      uberon: {name: 'natural killer cell', uid: 'CL:0000623', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Ovary',
      qual: null,
      value: '62 peptides',
      evidence: null,
      zscore: null,
      conf: 2.6,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Pancreas',
      qual: null,
      value: '7 peptides',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'pancreas', uid: 'UBERON:0001264', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Prostate gland',
      qual: null,
      value: '4 peptides',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'prostate gland', uid: 'UBERON:0002367', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Rectum',
      qual: null,
      value: '2 peptides',
      evidence: null,
      zscore: null,
      conf: 0.6,
      uberon: {name: 'rectum', uid: 'UBERON:0001052', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Retina',
      qual: null,
      value: '36 peptides',
      evidence: null,
      zscore: null,
      conf: 1.7,
      uberon: {name: 'retina', uid: 'UBERON:0000966', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Spinal cord',
      qual: null,
      value: '10 peptides',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'spinal cord', uid: 'UBERON:0002240', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Testis',
      qual: null,
      value: '40 peptides',
      evidence: null,
      zscore: null,
      conf: 1.8,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment HPM',
      tissue: 'Urinary bladder',
      qual: null,
      value: '5 peptides',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'urinary bladder', uid: 'UBERON:0001255', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Adipose tissue',
      qual: null,
      value: '2.153 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'adipose tissue', uid: 'UBERON:0001013', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Colon',
      qual: null,
      value: '2.076 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'colon', uid: 'UBERON:0001155', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Heart',
      qual: null,
      value: '1.594 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.7,
      uberon: {name: 'heart', uid: 'UBERON:0000948', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Hypothalamus',
      qual: null,
      value: '4.055 RPKM',
      evidence: null,
      zscore: null,
      conf: 1.1,
      uberon: {name: 'hypothalamus', uid: 'UBERON:0001898', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Kidney',
      qual: null,
      value: '2.379 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'adult mammalian kidney', uid: 'UBERON:0000082', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Liver',
      qual: null,
      value: '1.897 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Lung',
      qual: null,
      value: '1.811 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Ovary',
      qual: null,
      value: '1.896 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'ovary', uid: 'UBERON:0000992', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Skeletal muscle',
      qual: null,
      value: '1.804 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.8,
      uberon: {name: 'skeletal muscle organ', uid: 'UBERON:0014892', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Spleen',
      qual: null,
      value: '3.381 RPKM',
      evidence: null,
      zscore: null,
      conf: 1.1,
      uberon: {name: 'spleen', uid: 'UBERON:0002106', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment RNA-seq',
      tissue: 'Testis',
      qual: null,
      value: '2.147 RPKM',
      evidence: null,
      zscore: null,
      conf: 0.9,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment UniGene',
      tissue: 'Brain',
      qual: null,
      value: '88 ESTs',
      evidence: null,
      zscore: null,
      conf: 4,
      uberon: {name: 'brain', uid: 'UBERON:0000955', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment UniGene',
      tissue: 'Eye',
      qual: null,
      value: '21 ESTs',
      evidence: null,
      zscore: null,
      conf: 1.2,
      uberon: {name: 'eye', uid: 'UBERON:0000970', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment UniGene',
      tissue: 'Lung',
      qual: null,
      value: '47 ESTs',
      evidence: null,
      zscore: null,
      conf: 3,
      uberon: {name: 'lung', uid: 'UBERON:0002048', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment UniGene',
      tissue: 'Prostate gland',
      qual: null,
      value: '14 ESTs',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'prostate gland', uid: 'UBERON:0002367', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment UniGene',
      tissue: 'Testis',
      qual: null,
      value: '26 ESTs',
      evidence: null,
      zscore: null,
      conf: 1.7,
      uberon: {name: 'testis', uid: 'UBERON:0000473', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Experiment UniGene',
      tissue: 'Uterus',
      qual: null,
      value: '14 ESTs',
      evidence: null,
      zscore: null,
      conf: 0.5,
      uberon: {name: 'uterus', uid: 'UBERON:0000995', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Blood platelet',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: {name: 'platelet', uid: 'CL:0000233', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Brain',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: {name: 'brain', uid: 'UBERON:0000955', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Caudate nucleus',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: {name: 'caudate nucleus', uid: 'UBERON:0001873', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Cervical carcinoma cell',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Erythroleukemia cell',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Frontal lobe',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: {name: 'frontal cortex', uid: 'UBERON:0001870', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Liver',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Muscle',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: {name: 'musculature', uid: 'UBERON:0001015', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'Retina',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: {name: 'retina', uid: 'UBERON:0000966', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Knowledge UniProtKB-RC',
      tissue: 'T-cell chronic lymphocytic leukemia cell',
      qual: null,
      value: '1',
      evidence: 'CURATED',
      zscore: null,
      conf: 4,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'Adult',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 3.826,
      conf: 1.9,
      uberon: {name: 'fully formed stage', uid: 'UBERON:0000066', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'Brain',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 6.367,
      conf: 3.2,
      uberon: {name: 'brain', uid: 'UBERON:0000955', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'Cpa',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 3.135,
      conf: 1.6,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'Ganglion',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 6.809,
      conf: 3.4,
      uberon: {name: 'ganglion', uid: 'UBERON:0000045', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'Neuro-2a cell',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 4.174,
      conf: 2.1,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'Neuron',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 6.29,
      conf: 3.1,
      uberon: {name: 'neuron', uid: 'CL:0000540', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'non-neuronal cell',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 3.575,
      conf: 1.8,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'PC-12 cell',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 3.898,
      conf: 1.9,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'JensenLab Text Mining',
      tissue: 'Spinal cord',
      qual: null,
      value: '1',
      evidence: null,
      zscore: 4.124,
      conf: 2.1,
      uberon: {name: 'spinal cord', uid: 'UBERON:0002240', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Brain',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'brain', uid: 'UBERON:0000955', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Brain',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'brain', uid: 'UBERON:0000955', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Brain',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'brain', uid: 'UBERON:0000955', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Cervix carcinoma',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Cervix carcinoma',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Cervix carcinoma',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Cervix carcinoma',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Leukemic T-cell',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: null,
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Liver',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'liver', uid: 'UBERON:0002107', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Platelet',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'platelet', uid: 'CL:0000233', __typename: 'Uberon'},
      __typename: 'Expression'
    }, {
      type: 'UniProt Tissue',
      tissue: 'Retina',
      qual: null,
      value: '1',
      evidence: null,
      zscore: null,
      conf: null,
      uberon: {name: 'retina', uid: 'UBERON:0000966', __typename: 'Uberon'},
      __typename: 'Expression'
    }],
    diseaseAssociationDetails: [
      {
        name: "benign ependymoma"
      },
      {
        name: "malignant ependymoma"
      }
    ],
  diseases: [
    {
      name: 'Huntington disease',
      diseaseIDs: [{
        id: "htt",
        dataSources: ["Expression Atlas"]
      }],
      parents: [],
      children: [],
      associationCount: 5,
      associations: [{
        type: 'UniProt Disease',
        name: 'Huntington disease',
        source: null,
        zscore: null,
        evidence: null,
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'Monarch',
        name: 'Huntington Disease',
        source: null,
        zscore: null,
        evidence: 'ECO:0000322|ECO:0000033|ECO:0000220: imported manually asserted information used in automatic assertion|traceable author statement|sequencing assay evidence',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'CTD',
        name: 'Huntington Disease',
        source: null,
        zscore: null,
        evidence: 'marker/mechanism',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'eRAM',
        name: 'huntington disease',
        source: 'CLINVAR|CTD_human|GHR|ORPHANET|UNIPROT',
        zscore: null,
        evidence: null,
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'DisGeNET',
        name: 'Huntington Disease',
        source: 'CTD_human;ORPHANET',
        zscore: null,
        evidence: '11 PubMed IDs; 15 SNPs',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: 0.9,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Huntington\'s disease',
      associationCount: 2,
      associations: [{
        type: 'JensenLab Knowledge GHR',
        name: 'Huntington\'s disease',
        source: null,
        zscore: null,
        evidence: 'CURATED',
        conf: 5,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'JensenLab Text Mining',
        name: 'Huntington\'s disease',
        source: null,
        zscore: 9.383,
        evidence: null,
        conf: 4,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Cadmium Poisoning',
      associationCount: 2,
      associations: [{
        type: 'CTD',
        name: 'Cadmium Poisoning',
        source: null,
        zscore: null,
        evidence: 'marker/mechanism',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'DisGeNET',
        name: 'Cadmium poisoning',
        source: 'CTD_human',
        zscore: null,
        evidence: '1 PubMed IDs',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: 0.3,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Movement Disorders',
      associationCount: 2,
      associations: [{
        type: 'CTD',
        name: 'Movement Disorders',
        source: null,
        zscore: null,
        evidence: 'marker/mechanism',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'DisGeNET',
        name: 'Movement Disorders',
        source: 'CTD_human',
        zscore: null,
        evidence: '1 PubMed IDs',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: 0.43,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Manganese Poisoning',
      associationCount: 2,
      associations: [{
        type: 'CTD',
        name: 'Manganese Poisoning',
        source: null,
        zscore: null,
        evidence: 'therapeutic',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'DisGeNET',
        name: 'Manganese Poisoning',
        source: 'CTD_human',
        zscore: null,
        evidence: '1 PubMed IDs',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: 0.3,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Intellectual disability',
      associationCount: 2,
      associations: [{
        type: 'JensenLab Knowledge UniProtKB-KW',
        name: 'Intellectual disability',
        source: null,
        zscore: null,
        evidence: 'CURATED',
        conf: 4,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'DisGeNET',
        name: 'Intellectual Disability',
        source: 'GENOMICS_ENGLAND',
        zscore: null,
        evidence: '2 PubMed IDs',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: 0.3,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Lopes-Maciel-Rodan syndrome',
      associationCount: 2,
      associations: [{
        type: 'UniProt Disease',
        name: 'Lopes-Maciel-Rodan syndrome',
        source: null,
        zscore: null,
        evidence: '37 38',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }, {
        type: 'DisGeNET',
        name: 'LOPES-MACIEL-RODAN SYNDROME',
        source: 'UNIPROT',
        zscore: null,
        evidence: '2 PubMed IDs; 3 SNPs',
        conf: null,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: 0.4,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Neurodegenerative disease',
      associationCount: 1,
      associations: [{
        type: 'JensenLab Knowledge UniProtKB-KW',
        name: 'Neurodegenerative disease',
        source: null,
        zscore: null,
        evidence: 'CURATED',
        conf: 4,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Endometrial cancer',
      associationCount: 1,
      associations: [{
        type: 'JensenLab Experiment COSMIC',
        name: 'Endometrial cancer',
        source: null,
        zscore: null,
        evidence: '10 samples',
        conf: 0.5,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }, {
      name: 'Kidney cancer',
      associationCount: 1,
      associations: [{
        type: 'JensenLab Experiment COSMIC',
        name: 'Kidney cancer',
        source: null,
        zscore: null,
        evidence: '17 samples',
        conf: 0.7,
        reference: null,
        log2foldchange: null,
        pvalue: null,
        score: null,
        __typename: 'DiseaseAssociation'
      }],
      __typename: 'Disease'
    }]
});

export const TESTTARGETPROPS: Target = new TargetSerializer()._asProperties(TESTTARGET);




