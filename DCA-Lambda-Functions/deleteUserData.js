'use strict'
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id } = event.pathParameters;

    const params = {
        TableName: "Data-Records",
        Key: {
            id: id
        }
      };

    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch (error) {
        responseBody = `Unable to delete the data record: ${error}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {"Content-Type": "application/json"},
        body: responseBody
    };

    return response;
};