/**
 * environment object to set basic urls and firebase configuration
 */
const backend = 'https://ncatsidg-dev.appspot.com';

export const environment = {
  rendererUrl: `${backend}/render`,
  production: false,
  graphqlUrl: `${backend}/graphql`,
  maxDownload: 250000,
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  }
};
