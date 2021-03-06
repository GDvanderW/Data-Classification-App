'use strict'
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

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
      };

    try {
        const data = await documentClient.get(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch (error) {
        responseBody = `Unable to post to data records: ${error}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {"Content-Type": "application/json"},
        body: responseBody
    };

    return response;
};