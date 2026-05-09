import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ExpertSync API Documentation',
      version: '1.0.0',
      description: 'The complete API documentation for ExpertSync Real-time Booking Platform.',
      contact: {
        name: 'ExpertSync Support',
        url: 'https://expertsync.com',
        email: 'dev@expertsync.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/server.js', './src/routes/*.js', './src/controllers/*.js'], // Included server.js for root paths
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
