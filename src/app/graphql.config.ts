import {environment} from '../environments/environment';
import {HttpLink} from 'apollo-angular/http';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';

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
