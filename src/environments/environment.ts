/**
 * environment object to set basic urls and firebase configuration
 */
const backend = 'https://ncatsidg-dev.appspot.com';

export const environment = {
  rendererUrl: `${backend}/render`,
  production: false,
  graphqlUrl: `${backend}/graphql`,
  firebase: {
    apiKey: 'AIzaSyAT2FJEc7Ju_yqwZ8xhEK9HBbyc010th78',
    authDomain: 'ncatsidg.firebaseapp.com',
    databaseURL: 'https://ncatsidg.firebaseio.com',
    projectId: 'ncatsidg',
    storageBucket: 'ncatsidg.appspot.com',
    messagingSenderId: '511313064782'
  }
};
