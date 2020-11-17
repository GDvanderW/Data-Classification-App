'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "af-south-1"});

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "af-south-1"});

  const params = {
    TableName: "Data-Records",
    Key: {
      id: "1"
    }
  }

  try {
    const data = await documentClient.get(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}