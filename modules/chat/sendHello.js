module.exports.helloHandler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        return {
            statusCode: 200,
            body: `Hello, ${body.name}`,
        };
    } catch (error) {
        return {
            statusCode: 200,
            body: `Failed`,
        };
    }
    
};