
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
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  }
};
