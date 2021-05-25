/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const {
  connectDB,
} = require('./db/index');

const routes = require('./routes/index');

const app = express();

// Extended: https://swagger.io/specification/#info-object
// Define configuration object
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Clothes store API',
      description: 'Web app for clothes shop management and clothes purchases',
      version: '1.0.1',
      contact: {
        keaID: 'mada0193, malg0102, said0390',
      },
      servers: ['http://localhost:8080'],
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'Bearer',
          description: 'Enter JWT Bearer token **_only_**',
          in: 'header',
          name: 'auth-token',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['app.js', './routes/index.js', './routes/api/*.js'],
};

// Define swaggerDocs, pass in configuration
const swaggerDocs = swaggerJsDoc(swaggerOptions);
// Create endpoint with documentation, and serve generated documentation with SwaggerUi module
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.use(cors());

// Routes
/**
 * @swagger
 * /:
 *   get:
 *     description: Use to request index page
 *     tags:
 *       - index
 *     responses:
 *       '200':
 *         description: A successful response, API is running
 *       '500':
 *         description: Internal server error
 */
app.get('/', (req, res) => {
  res.status(200).send('Our API is running...');
});

app.use('/api', routes);

connectDB();

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));
