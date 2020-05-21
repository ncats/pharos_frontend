
/**
 * Main host of the pharos api
 * @type {string}
 * @private
 */
const _HOST = 'https://pharos.ncats.nih.gov/idg/';

/**
 * API version string
 * @type {string}
 * @private
 */
const _API = 'api/v1/';
/**
 * environment object to set basic urls and firebase configuration
 */
export const environment = {
  production: false,
  host: _HOST,
  api: _API,
  // graphqlUrl: 'https://ncatsidg-dev.appspot.com/graphql',
  graphqlUrl: 'http://localhost:4000/graphql',
  firebase: {
    apiKey: 'AIzaSyAT2FJEc7Ju_yqwZ8xhEK9HBbyc010th78',
    authDomain: 'ncatsidg.firebaseapp.com',
    databaseURL: 'https://ncatsidg.firebaseio.com',
    projectId: 'ncatsidg',
    storageBucket: 'ncatsidg.appspot.com',
    messagingSenderId: '511313064782'
  }
};
