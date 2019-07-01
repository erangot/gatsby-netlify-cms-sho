'use strict';
import pathChecking from './pathChecking'
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