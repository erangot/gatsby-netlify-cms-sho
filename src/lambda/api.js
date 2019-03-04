const http = require('http');
const https = require('https');

const dev_host = 'localhost';
const prod_host = 'sho.test.sparkol-dev.co.uk';
const mock_host = '5c7cce79dd19010014c8e925.mockapi.io';

let options = {
    host : mock_host,
    // port : 6970,
    path:  "/api/globalstats",
    // headers: {
    //     "Authorization": "Basic Y29saW46cGFzc3dvcmQ="
    //     },
};


export function handler(event, context, callback) {
  console.log('queryStringParameters', event.queryStringParameters)
  if(event.queryStringParameters.path) {
      options.path = event.queryStringParameters.path;
  }

  http.get(options, function(res) {
    let body1 = '';
    console.log("Got response: " + res.statusCode);
    res.on('data', (chunk) => body1 += chunk);
    res.on('end', () => {
      console.log('Successfully processed HTTPS response');
     
      if (res.headers['content-type'] === 'application/json') 
          body1 = JSON.parse(body1);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(body1),
      })
    })
  }).on('error', function(e) {
    console.log("Got error: " + e.message);

    callback(null, {
      statusCode: 500,
      body: JSON.stringify(e),
    })
  });
  
}

