/**
 * environment object to set basic urls and firebase configuration
 */
export const backend = 'https://pharos-api.ncats.io';

export const environment = {
  rendererUrl: `${backend}/render`,
// @ts-ignore
  production: (backend === 'https://pharos-api.ncats.io'),
  graphqlUrl: `${backend}/graphql`,
  maxDownload: 250000,
  firebase: {
    apiKey: "",
    authDomain: "ncatsidg.firebaseapp.com",
    databaseURL: "https://ncatsidg.firebaseio.com",
    projectId: "ncatsidg",
    storageBucket: "ncatsidg.appspot.com",
    messagingSenderId: "511313064782",
    appId: "1:511313064782:web:ad3da8eb3b6474d7bea41f",
    measurementId: "G-8YP4D52PC6"
  }
};


