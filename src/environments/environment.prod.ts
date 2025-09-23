/**
 * environment object to set basic urls and firebase configuration
 */
export const backend = 'https://ifxdev.ncats.nih.gov/pharos-graphql';
// export const backend = 'https://pharos-api.ncats.io';
// export const backend = 'http://localhost:4444';

export const environment = {
  rendererUrl: `${backend}/render`,
// @ts-ignore
  production: (backend === 'https://pharos-api.ncats.io'),
  graphqlUrl: `${backend}/graphql`,
  maxDownload: 250000,
  firebase: {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }
};


