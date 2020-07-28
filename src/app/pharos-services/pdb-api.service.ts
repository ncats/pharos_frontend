import {Injectable} from '@angular/core';
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {HttpLink} from "apollo-angular-link-http";
import gql from "graphql-tag";

@Injectable({
  providedIn: 'root'
})
export class PdbApiService {

  apollo: any;
  uri: string = "https://data.rcsb.org/graphql";

  constructor(private httpLink: HttpLink) {
    this.apollo = new ApolloClient({
      link: httpLink.create({uri: this.uri}),
      cache: new InMemoryCache(),
    });
  }

  getEntries(pdbIDs: string[]) {
    const variables = {pdbIDs: pdbIDs};
    return this.apollo.query({query: this.getEntriesQuery, variables});
  }

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
          molecular_weight
          resolution_combined
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
}
