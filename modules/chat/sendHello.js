module.exports.helloHandler = async (event, context) => {
    const body = JSON.parse(event.body);
    return {
        statusCode: 200,
        body: `Hello, ${body.name}`,
    };
};