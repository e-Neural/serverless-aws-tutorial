'use strict';
const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
    console.log("Receieved request to list all candidates. Event is", event);
    var params = {
        TableName: process.env.CANDIDATE_TABLE,
        ProjectionExpression: "id, fullname, email"
    };
    const onScan = (err, data) => {
        if (err) {
            console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Scan succeeded.");
            return callback(null, successResponseBuilder(JSON.stringify({
                    candidates: data.Items,
                    config: process.env.ENE_CONFIG,
                    region: process.env.AWS_REGION,
                })
            ));
        }
    };
    dynamoDb.scan(params, onScan);
};

const successResponseBuilder = (body) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: body
    };
};