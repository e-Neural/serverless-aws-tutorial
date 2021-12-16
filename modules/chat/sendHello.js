module.exports.helloHandler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        return {
            statusCode: 200,
            body: `Hello, ${body.name}`,
            config: process.env.ENE_CONFIG,
            region: process.env.AWS_REGION,
        };
    } catch (error) {
        return {
            statusCode: 200,
            body: `Failed`,
            config: process.env.ENE_CONFIG,
            region: process.env.AWS_REGION,
        };
    }
    
};