'use strict';

const mysql = require('mysql');
const exec = require('child_process').exec;

var connection = mysql.createConnection({
    host     : process.env.dbhost,
    port     : process.env.dbport,
    user     : process.env.dbuser,
    password : process.env.dbpass
});

connection.connect();
    
  
exports.handler = async (event, context) => {

  console.log('Received event:', JSON.stringify(event, null, 2));
  var result;
  if(event.queryStringParameters != null )
    result = await pathChecking(event.queryStringParameters.api,event.body); 
  else 
    result = "success";

  
  context.succeed({
          'statusCode': 200,
          'headers': { 'Content-Type': 'application/json' },
          'body': JSON.stringify(result)
  });

  return {
      'statusCode': 200,
      'headers': { 'Content-Type': 'application/json' },
      'body': JSON.stringify(result)
  };
    
};


async function pathChecking(path, bodyString) {
  return new Promise(resolve => {
    switch (path) {  
      case 'getGlobalStats':
          
        connection.query("call shocogatsbymnl.get_global_statistics()", function(err, rows, fields) {
          resolve(rows[0]);
        });         
        break;
      
      case 'getBestInSho':
        
        connection.query("call shocogatsbymnl.get_best_in_sho_statistics()", function (err, rows, fields) {          
          var output = [];
          for (var i=0; i<rows[0].length; i++) {
            var firstElement = rows[0][i].videoId;
            output.push(firstElement);
          }
          console.log(`call shocogatsbymnl.get_video_details_for_shortId_list(${output})`);
          connection.query(`call shocogatsbymnl.get_video_details_for_shortId_list('${output}')`, function(err, rows, fields) {

            resolve(rows);
          });
          // resolve(output);      
        });
 
        break;
       
      case 'create':
        var body = JSON.parse(bodyString);
        
        connection.query(`call shocogatsbymnl.create_short_url('${body.renderRequestId}', '${body.createdBy}', '${body.username}', '${body.applicationName}', '${body.visibility}')`, function (err, rows, fields) {          
          var output = {
            shorturl: rows[0][0],
            media: ""
          }
          
          console.log(`call shocogatsbymnl.add_media_for_shortId('${rows[0][0].shortId}', '${body.path}', '${body.format}', '${body.bucketPath}')`);
          connection.query(`call shocogatsbymnl.add_media_for_shortId('${rows[0][0].shortId}', '${body.path}', '${body.format}', '${body.bucketPath}')`, function(err, rows, fields) {
            
            console.log(rows);
            output.media = rows;
            
            var args = " -d '{ }' https://api.netlify.com/build_hooks/5caee94d280d0f5886f22e9a";

            exec('curl ' + args, function (error, stdout, stderr) {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);
              if (error !== null) {
                console.log('exec error: ' + error);
              }
              resolve(output);
            });

          });
          // resolve(output);      
        });
 
        break;
    }
  });
}

