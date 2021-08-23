const axios = require('axios');
const tunnel = require('tunnel');
const {
  githubOAth
} = require('../config');

// const proxy = 'http://127.0.0.1:1087';
const tunnelProxy = tunnel.httpsOverHttp({
  proxy: {
    host: '127.0.0.1',
    port: '1087'
  }
});
module.exports.getAccessToken = (code) => new Promise(async (reslove) => {
  console.log('result---', 9999);
  const body = {
    client_id: githubOAth.client_id,
    client_secret: githubOAth.client_secret,
    code
  };
  const res = await axios({
    url: githubOAth.url,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json'
    },
    httpsAgent: tunnelProxy,
    data: body
  });
  const { data } = res;
  if (data && !data.error) {
    reslove(data);
  } else {
    reslove(false);
  }
});

module.exports.getUserInfo = ({ access_token, token_type }) => {
  console.log(`${token_type} ${access_token}`);
  return new Promise(async (reslove) => {
    const res = await axios({
      method: 'GET',
      url: githubOAth.userUrl,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });
    console.log('res----', res.dta);
    if (res.data && !res.data.error) {
      reslove(res.data);
    } else {
      reslove(false);
    }
  });
};
