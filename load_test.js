const axios = require('axios');

let count = 0;
async function load_test() {
  // await axios.get('http://localhost:4000/targets/drd2').then(res => {
  //   console.log(++count);
  // }).catch(err => {
  //   console.log('error on ' + count);
  //   // console.log(err);
  // });
  // await axios.get('http://localhost:4000/targets').then(res => {
  //   console.log(++count);
  // }).catch(err => {
  //   console.log('error on ' + count);
  //   // console.log(err);
  // });
  // await axios.get('http://localhost:4000/analyze/targets').then(res => {
  //   console.log(++count);
  // }).catch(err => {
  //   console.log('error on ' + count);
  //   // console.log(err);
  // });
  await axios.get('http://localhost:4000').then(res => {
    console.log(++count);
  }).catch(err => {
    console.log('error on ' + count);
    // console.log(err);
  });
}

load_test();
load_test();
load_test();
load_test();
load_test();
setInterval(() => {
  load_test();
  load_test();
  load_test();
  load_test();
  load_test();
}, 10000);

