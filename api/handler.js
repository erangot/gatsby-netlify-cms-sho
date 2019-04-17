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
    result = await pathChecking(event); 
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


async function pathChecking(event) {
  return new Promise(resolve => {
    switch (event.queryStringParameters.api) {  
      case 'getGlobalStats':
          
        connection.query("call shocogatsbymnl.get_global_statistics()", function(err, rows, fields) {
          if(err) {
            resolve(err);
          }
          
          resolve(rows[0]);
        });         
        break;
      
      case 'getBestInSho':
        
        connection.query("call shocogatsbymnl.get_best_in_sho_statistics()", function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
            
          
          var output = [];
          for (var i=0; i<rows[0].length; i++) {
            var firstElement = rows[0][i].videoId;
            output.push(firstElement);
          }
          console.log(`call shocogatsbymnl.get_video_details_for_shortId_list(${output})`);
          connection.query(`call shocogatsbymnl.get_video_details_for_shortId_list('${output}')`, function(err, rows, fields) {
            if(err) {
              resolve(err);
            }
            
            resolve(rows);
          });
          // resolve(output);      
        });
 
        break;
       
      case 'create':
        var body = JSON.parse(event.body);
        
        connection.query(`call shocogatsbymnl.create_short_url('${body.renderRequestId}', '${body.createdBy}', '${body.username}', '${body.applicationName}', '${body.visibility}')`, function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
          
          var output = {
            shorturl: rows[0][0],
            media: ""
          }

          connection.query(`call shocogatsbymnl.add_media_for_shortId('${rows[0][0].shortId}', '${body.thumbnail}', 'thumbnails', '${body.thumbnail}')`, function(err, rows, fields) {
            if(err) {
              resolve(err);
            }
          });
          
          
          connection.query(`call shocogatsbymnl.add_media_for_shortId('${rows[0][0].shortId}', '${body.video}', 'mp4', '${body.video}')`, function(err, rows, fields) {
            if(err) {
              resolve(err);
            }
            output.media = rows;
            
            var args = " -d '{ }' https://api.netlify.com/build_hooks/5cb060185c8ee50189b4609f";

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

      case 'getMyVideos':

        var createdBy = event.queryStringParameters.createdBy;
        
        console.log(`SELECT * FROM shocogatsbymnl.shortUrls where createdBy = '${createdBy}'`);
        connection.query(`SELECT * FROM shocogatsbymnl.shortUrls where createdBy = '${createdBy}'`, function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
          
          console.log(rows);
          
          var output = [];
          for (var i=0; i<rows.length; i++) {
            
            var firstElement = rows[i].shortId;
            console.log(firstElement);
            output.push(firstElement);
          }
          console.log(`call shocogatsbymnl.get_video_details_for_shortId_list('${output}')`);
          connection.query(`call shocogatsbymnl.get_video_details_for_shortId_list('${output}')`, function(err, rows, fields) {
            if(err) {
              resolve(err);
            }
            
            resolve(rows);
          });  
        });
 
      break;

      case 'checkSetEmailCompletion':

        var shortId = event.queryStringParameters.shortId;
        console.log(`SELECT completionEmailSent FROM shocogatsbymnl.shortUrls where shortId ='${shortId}'`);
        connection.query(`SELECT completionEmailSent FROM shocogatsbymnl.shortUrls where shortId ='${shortId}'`, function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
          
          console.log(rows[0].completionEmailSent);
          if(rows[0].completionEmailSent) {

            console.log(`SELECT * FROM shocogatsbymnl.shortUrls su inner JOIN shocogatsbymnl.media m ON m.shortUrlId = su.id WHERE su.shortId ='${shortId}'`)
            connection.query(`SELECT * FROM shocogatsbymnl.shortUrls su inner JOIN shocogatsbymnl.media m ON m.shortUrlId = su.id WHERE su.shortId ='${shortId}'`, function (err, rows, fields) {          
             if(err) {
                resolve(err);
              }
              console.log(rows);
              resolve(rows);
            });
          } else {
            resolve( false );
          }
          
        });
      break;

      case 'setEmailCompletion':

        var shortId = event.queryStringParameters.shortId;
        console.log(`call shocogatsbymnl.set_completion_email_sent('${shortId}', 1)`);
        connection.query(`call shocogatsbymnl.set_completion_email_sent('${shortId}', 1)`, function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
            resolve( true );
          
        });
      break;

    }
  });
}

