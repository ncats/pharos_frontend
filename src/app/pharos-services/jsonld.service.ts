import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {Target} from '../models/target';
import {Disease} from '../models/disease';
import {Pathway} from '../models/pathway';
import {Ligand} from '../models/ligand';
import {LigandActivity} from '../models/ligand-activity';
import {UseCaseData} from '../use-cases/use-case-data';
import {Task} from '../models/use-case-step';

@Injectable({
  providedIn: 'root'
})
export class JsonldService {
  baseUrl = 'https://pharos.nih.gov';
  scriptType = 'application/ld+json';

  orgSchema() {
    const dataObj = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: this.baseUrl,
      logo: this.baseUrl + '/assets/images/Pharos_Logo_Rd8.svg',
      name: 'Pharos : Illuminating the Druggable Genome',
      sameAs: [
        'https://twitter.com/idg_pharos',
        "https://www.youtube.com/c/DruggableGenomeIDG"
      ],
      description: 'Pharos is the web interface for data collected by the Illuminating the Druggable Genome initiative. Target, disease and ligand information are collected and displayed.',
      potentialAction: {
        "@type": "SearchAction",
        "target": this.baseUrl + "/search?q={query}",
        "query": "required"
      }
    }
    return dataObj;
  };

  property(name: string, value: string | number, externalLink?: string) {
    const dataObj: any = {
      '@type': 'PropertyValue',
      name: name,
      value: value
    };
    if (externalLink) {
      dataObj.url = externalLink;
    }
    return dataObj;
  }

  goSchema(goTerm: any, termType: string) {
    const dataObj: any = {
      '@type': 'DefinedTerm',
      termCode: goTerm.term,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        maintainer: {
          '@type': 'Organization',
          name: 'Gene Ontology',
          url: 'http://geneontology.org/'
        },
        name: 'GO ' + termType
      }
    }
    return dataObj;
  }

  pathwaySchema(pathway: Pathway) {
    const dataObj: any = {
      '@type': 'BioChemEntity',
      name: pathway.name,
      mainEntityOfPage: pathway.url
    }
    dataObj.identifier = [this.property("Pathway Source", pathway.type)];
    if (pathway.sourceID) {
      dataObj.identifier.push(this.property("Pathway ID", pathway.sourceID));
    }
    return dataObj;
  }

  ligandSchema(ligand: Ligand, root = true) {
    const getIdentifiers = () => {
      const list = ligand.synonymLabels().filter(synonym => synonym.label !== 'LyCHI');
      const ids = [];
      list.forEach(syn => {
        ids.push(this.property(syn.label, syn.term, syn.externalLink));
      })
      return ids;
    }
    const primeActivity: LigandActivity = ligand.activities[0].activities.find(a => a.moa);
    const dataObj: any = {
      '@type': 'ChemicalSubstance',
      name: ligand.name,
      mainEntityOfPage: this.baseUrl + '/ligands/' + encodeURIComponent(ligand.isdrug ? ligand.name : ligand.ligid),
      url: this.baseUrl + '/ligands/' + encodeURIComponent(ligand.isdrug ? ligand.name : ligand.ligid),
      chemicalComposition: ligand.smiles,
      identifier: getIdentifiers()
    }
    if (ligand.isdrug) {
      dataObj.potentialUse = 'FDA Approved Drug';
    }
    if (primeActivity && !root) {
      dataObj.chemicalRole = primeActivity.moa;
    }
    if (root) {
      dataObj['@context'] = 'https://schema.org';
    }
    return dataObj;
  }

  diseaseSchema(disease: Disease, root = true) {
    const getIdentifiers = () => {
      const ids = [];
      ids.push(this.property('MONDO ID', disease.mondoID));
      disease.mondoEquivalents?.forEach(did => {
        ids.push(this.property(did.name, did.id));
      })
      return ids;
    }
    const dataObj: any = {
      '@type': 'MedicalCondition',
      name: disease.name,
      mainEntityOfPage: this.baseUrl + '/diseases/' + encodeURIComponent(disease.name),
      url: this.baseUrl + '/diseases/' + encodeURIComponent(disease.name),
      description: disease.mondoDescription || disease.doDescription || disease.uniprotDescription,
      identifier: getIdentifiers()
    }
    if (root) {
      dataObj['@context'] = 'https://schema.org';
    }
    return dataObj;
  }

  targetSchema(target: Target, root = true) {
    const getIdentifiers = () => {
      const ids = [];
      if (target.gene) {
        ids.push(this.property("Gene Symbol", target.gene));
      }
      ids.push(this.property("UniProt ID", target.accession));
      return ids;
    }
    const dataObj: any = {
      '@type': 'Protein',
      name: target.name,
      identifier: getIdentifiers(),
      mainEntityOfPage: this.baseUrl + '/targets/' + target.preferredSymbol,
      url: this.baseUrl + '/targets/' + target.preferredSymbol,
      description: target.description,
      hasBioPolymerSequence: target.sequence
    };
    if (root) {
      dataObj['@context'] = 'https://schema.org';
      if (target.ppiCount > 0) {
        dataObj.bioChemInteraction = [];
        target.ppis.forEach(ppi => {
          dataObj.bioChemInteraction.push(this.targetSchema(ppi, false));
        })
      }

      if (target.diseaseCount > 0) {
        dataObj.associatedDisease = [];
        target.diseases.forEach(disease => {
          dataObj.associatedDisease.push(this.diseaseSchema(disease, false));
        })
      }

      if (target.pathways?.length > 0) {
        dataObj.hasBioChemEntityPart = [];
        target.pathways.forEach(pathway => {
          dataObj.hasBioChemEntityPart.push(this.pathwaySchema(pathway));
        })
      }

      if (target.goFunction?.length > 0) {
        dataObj.hasMolecularFunction = [];
        target.goFunction.forEach(goFunction => {
          dataObj.hasMolecularFunction.push(this.goSchema(goFunction, 'Function'));
        })
      }

      if (target.goProcess?.length > 0) {
        dataObj.isInvolvedInBiologicalProcess = [];
        target.goProcess.forEach(goProcess => {
          dataObj.isInvolvedInBiologicalProcess.push(this.goSchema(goProcess, 'Process'));
        })
      }

      if (target.goComponent?.length > 0) {
        dataObj.isLocatedInSubcellularLocation = [];
        target.goComponent.forEach(goComponent => {
          dataObj.isLocatedInSubcellularLocation.push(this.goSchema(goComponent, 'Component'));
        })
      }

      if (target.drugs?.length > 0) {
        dataObj.bioChemInteraction = dataObj.bioChemInteraction || [];
        target.drugs.forEach(drug => {
          dataObj.bioChemInteraction.push(this.ligandSchema(drug, false));
        })
      }
      if (target.ligands?.length > 0) {
        dataObj.bioChemInteraction = dataObj.bioChemInteraction || [];
        target.ligands.forEach(drug => {
          dataObj.bioChemInteraction.push(this.ligandSchema(drug, false));
        })
      }
    }

    return dataObj;
  };

  ratingSchema(tdl: string) {
    const getExplanation = () => {
      switch (tdl) {
        case 'Tdark':
          return 'These are targets about which virtually nothing is known. They do not have known drug or small molecule activities.';
        case 'Tbio':
          return 'These are targets that do not have known drug or small molecule activities, but some details are known about their biological role. ' +
            'There may be literature references into their function, or other resources for experimentation.';
        case 'Tchem':
          return 'These are targets that have at least one ChEMBL compound with an activity cutoff of < 30 nM, and satisfy the criteria for ' +
            'lower categories.';
        case 'Tclin':
          return 'These are targets that have at least one approved drug, and satisfy the criteria for lower categories.';
      }
    };
    const dataObj = {
      '@context': 'http://schema.org',
      '@type': 'Rating',
      ratingValue: tdl,
      ratingExplanation: getExplanation(),
      reviewAspect: 'The degree of understanding of the biological role of this protein.',
      author: {
        '@type': 'Organization',
        name: 'Illuminating the Druggable Genome (IDG)',
        logo: 'https://commonfund.nih.gov/sites/default/files/IDG_LOGO_UPRIGHT_3.png',
        url: 'https://commonfund.nih.gov/idg'
      }
    }
    return dataObj;
  }

  usecaseSchema(usecase: string) {
    const usecaseData = UseCaseData.getUseCases().find(c => c.anchor === usecase);
    if (usecaseData) {
      const dataObj = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: usecaseData.title,
        step: [],
        keywords: usecaseData.keywords.join(', '),
        url: this.baseUrl + '/usecases/' + usecaseData.anchor
      }
      let position = 0;
      usecaseData.steps.forEach(step => {
        if (step instanceof Task) {
          dataObj.step.push({
            '@type': 'HowToStep',
            position: ++position,
            itemListElement: {
              '@type': 'HowToDirection',
              position: 1,
              text: step.title
            }
          })
        }
      })
      return dataObj;
    }
    return;
  }

  dynamicClasses = ['structured-data-dynamic', 'structured-data-usecase', 'structured-data-tdl']

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  removeStructuredData(): void {
    const els = [];
    this.dynamicClasses.forEach(c => {
      els.push(...Array.from(this._document.head.getElementsByClassName(c)));
    });
    els.forEach(el => this._document.head.removeChild(el));
  }

  insertSchema(schema: Record<string, any>, className = 'structured-data-dynamic'): void {
    let script;
    let shouldAppend = false;
    if (this._document.head.getElementsByClassName(className).length) {
      script = this._document.head.getElementsByClassName(className)[0];
    } else {
      script = this._document.createElement('script');
      shouldAppend = true;
    }
    script.setAttribute('class', className);
    script.type = this.scriptType;
    script.text = JSON.stringify(schema);
    if (shouldAppend) {
      this._document.head.appendChild(script);
    }
  }

}
