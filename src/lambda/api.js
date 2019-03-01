const http = require('http');
const https = require('https');

const dev_host = 'localhost';
const prod_host = 'sho.test.sparkol-dev.co.uk';

let options = {
    host : dev_host,
    port : 6970,
    path:  "/api/globalstats",
    headers: {
        "Authorization": "Basic Y29saW46cGFzc3dvcmQ="
        },
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
      // If we know it's JSON, parse it
      if (res.headers['content-type'] === 'application/json') {
          body1 = JSON.parse(body1);
      }
      callback(null, {
        statusCode: 200,
        body: body1,
      })
    })
    // context.succeed();
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        msg: 'Hello, World! err http ' + Math.round(Math.random() * 10),
      }),
    })
    // context.done(null, 'FAILURE');
  });
  
  // const req = https.request(options, (res) => {
  //   let body = '';
  //   console.log('Status:', res.statusCode);
  //   console.log('Headers:', JSON.stringify(res.headers));
  //   res.setEncoding('utf8');
  //   res.on('data', (chunk) => body += chunk);
  //   res.on('end', () => {
  //       console.log('Successfully processed HTTPS response');
  //       // If we know it's JSON, parse it
  //       if (res.headers['content-type'] === 'application/json') {
  //           body = JSON.parse(body);
  //       }
  //       callback(null, body);
  //   });
  // });
  // req.on('error', callback);
  // req.write(JSON.stringify(event.data));
  // req.end();

}
