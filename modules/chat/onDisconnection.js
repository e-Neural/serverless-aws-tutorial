const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
    const deleteParams = {
        TableName: process.env.CHAT_TABLE,
        Key: {
            connectionId: event.requestContext.connectionId
        }
    };

    try {
        await ddb.delete(deleteParams).promise();
    } catch (err) {
        return { statusCode: 500, body: 'Failed to disconnect: ' + JSON.stringify(err) };
    }

    return { statusCode: 200, body: 'Disconnected.' };
};