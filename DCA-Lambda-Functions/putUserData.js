'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "af-south-1"});

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "af-south-1"});

  let responseBody = "";
  let statusCode = 0;

  const { id, datastorename, type, location, container, fieldname, category } = JSON.parse(event.body);

  const params = {
    TableName: "Data-Records",
    Item: {
      id: id,
      datastorename: datastorename,
      type: type,
      location: location,
      container: container,
      fieldname: fieldname,
      category: category
    }
  }

  try {
    const data = await documentClient.put(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}