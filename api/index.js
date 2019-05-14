'use strict';

const mysql = require('mysql');
const exec = require('child_process').exec;
const uuidv1 = require('uuid/v1');

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

      case 'changeVisibility':

        var body = JSON.parse(event.body);

        console.log(`call shocogatsbymnl.change_visibility_for_shortId('${body.shortId}', '${body.visibility}', '${body.ownerId}')`);
        connection.query(`call shocogatsbymnl.change_visibility_for_shortId('${body.shortId}', '${body.visibility}', '${body.ownerId}')`, function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
            resolve( rows );
          
        });
      break;
      
      case 'addComment':

        var body = JSON.parse(event.body);
        const uuidComment = uuidv1();
        var query = '';
        if(body.parent) 
          query = `call shocogatsbymnl.add_comment('${body.shortId}', '${uuidComment}', '${body.parent}', '${body.username}', '${body.comment}', '${body.uid}')`;
        else 
          query = `call shocogatsbymnl.add_comment('${body.shortId}', '${uuidComment}', null, '${body.username}', '${body.comment}', '${body.uid}')`;
        
        console.log(query);
        connection.query(query, function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
            resolve( rows );
          
        });
      break;

      case 'blockShortUrl':

        var shortUrlId = event.queryStringParameters.shortUrlId;

        console.log(`call shocogatsbymnl.block_short_url(${shortUrlId})`);
        connection.query(`call shocogatsbymnl.block_short_url(${shortUrlId})`, function (err, rows, fields) {          
          if(err) {
            resolve(err);
          }
            resolve( rows );
          
        });
      break;

      case 'deleteShortUrl':

      var shortUrl = event.queryStringParameters.shortUrl;

      console.log(`call shocogatsbymnl.delete_short_url('${shortUrl}')`);
      connection.query(`call shocogatsbymnl.delete_short_url('${shortUrl}')`, function (err, rows, fields) {          
        if(err) {
          resolve(err);
        }
          resolve( rows );
        
      });
    break;

    case 'getComments':

      var body = event.queryStringParameters;

      console.log(`call shocogatsbymnl.get_comments('${body.shortUrl}', '${body.orderBy}', 0, -1)`);
      connection.query(`call shocogatsbymnl.get_comments('${body.shortUrl}', '${body.orderBy}', 0, -1)`, function (err, rows, fields) {          
        if(err) {
          resolve(err);
        }
          resolve( rows );
      });
    break;

    case 'getDetailsFromShortId':

      var body = event.queryStringParameters;

      console.log(`call shocogatsbymnl.get_details_from_shortId('${body.shortId}')`);
      connection.query(`call shocogatsbymnl.get_details_from_shortId('${body.shortId}')`, function (err, rows, fields) {          
        if(err) {
          resolve(err);
        }
          resolve( rows );
      });
    break;

    case 'saveDetailsForShortId':

    var body = JSON.parse(event.body);

    console.log(`call shocogatsbymnl.save_details_for_shortId('${body.shortId}', '${body.vidTitle}','${body.vidDesc}', '${body.ownerId}')`);
    connection.query(`call shocogatsbymnl.save_details_for_shortId('${body.shortId}', '${body.vidTitle}','${body.vidDesc}', '${body.ownerId}')`, function (err, rows, fields) {          
      if(err) {
        resolve(err);
      }
        resolve( rows );
      
    });
    break;

    case 'getEngagedForShortIdUser':

      var body = event.queryStringParameters;

      console.log(`call shocogatsbymnl.get_engaged_for_shortId_user('${body.shortId}','${body.ownerId}')`);
      connection.query(`call shocogatsbymnl.get_engaged_for_shortId_user('${body.shortId}','${body.ownerId}')`, function (err, rows, fields) {          
        if(err) {
          resolve(err);
        }
          resolve( rows );
      });
    break;

    case 'changedEngagedForShortIdUser':

    var body = JSON.parse(event.body);

    console.log(`call shocogatsbymnl.change_engaged_for_shortId_user('${body.shortId}', '${body.ownerId}', ${body.engaged})`);
    connection.query(`call shocogatsbymnl.change_engaged_for_shortId_user('${body.shortId}', '${body.ownerId}', ${body.engaged})`, function (err, rows, fields) {          
      if(err) {
        resolve(err);
      }
        resolve( rows );
      
    });
    break;
  
    }
  });
}

