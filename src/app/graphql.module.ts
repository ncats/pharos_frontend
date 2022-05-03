import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {environment} from '../environments/environment';

/**
 * default graphql instance url
 */
const uri = environment.graphqlUrl; // <-- add the URL of the GraphQL server here

/**
 * initialize graphQL instance
 * @param httpLink
 */
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(
      {
        typePolicies: {
          Disease: {
            keyFields: ['name']
          }
        }
      }),
    connectToDevTools: !environment.production
  };
}

@NgModule({
  // exports: [ApolloModule, HttpLinkModule],
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
}
