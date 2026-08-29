import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Hotel Management API",
            version: "1.0.0",
            description: "API documentation for Hotel Management System"
        },

        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },

    apis: ["./Routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;