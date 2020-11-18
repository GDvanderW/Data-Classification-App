'use strict'
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const { id, datastorename, type, location, container, fieldname, category } = JSON.parse(event.body);

    const params = {
        TableName: "Data-Records",
    };

    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch (error) {
        responseBody = `Unable to get the data records: ${error}`;
        statusCode = 403;
    }

    const response = {
        statusCode: statusCode,
        headers: {"Content-Type": "application/json"},
        body: responseBody
    };

    return response;
};