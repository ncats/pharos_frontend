import {Injectable} from '@angular/core';

import gql from "graphql-tag";
import {ApolloClient, InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";

@Injectable({
  providedIn: 'root'
})
export class PdbApiService {

  constructor(private httpLink: HttpLink) {
    this.apollo = new ApolloClient({
      link: httpLink.create({uri: this.uri}),
      cache: new InMemoryCache(),
    });
  }

  apollo: any;
  uri = 'https://data.rcsb.org/graphql';

  getEntriesQuery = gql`
    query getEntries($pdbIDs:[String!]!)
    {
      entries(entry_ids:$pdbIDs){
        exptl {
          method
        }
        structureId:rcsb_id
        citation:rcsb_primary_citation {
          pubmedId:pdbx_database_id_PubMed
          title
          journal:journal_abbrev
          year
        }
        entryInfo:rcsb_entry_info{
          assembly_count
          molecular_weight
          resolution_combined
        }
        peptides:polymer_entities {
          entity_poly {
            pdbx_strand_id
          }
          alignments:rcsb_polymer_entity_align {
            regions:aligned_regions{
              refStart:ref_beg_seq_id
              entityStart:entity_beg_seq_id
              length
            }
            peptideAccession:reference_database_accession
          }
        }
        ligands:nonpolymer_entities{
          nonpolymer_comp{
            rcsb_id
            chem_comp{
              type
            }
            smiles:pdbx_chem_comp_descriptor {
              descriptor
              type
              program
              program_version
            }
            synonyms:rcsb_chem_comp_synonyms {
              name
              provenance_source
              comp_id
            }
          }
        }
      }
    }`;

  getEntries(pdbIDs: string[]) {
    const variables = {pdbIDs};
    return this.apollo.query({query: this.getEntriesQuery, variables});
  }
}
