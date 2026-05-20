require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const mongodb = require('./data/database');
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const getSwaggerDocument = (req) => ({
    ...swaggerDocument,
    host: req.get('host'),
    schemes: [req.get('x-forwarded-proto') || req.protocol],
});

app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(getSwaggerDocument(req));
});

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(null, { swaggerOptions: { url: '/api-docs.json' } }));

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and node Running on port ${port}`);
            console.log(`Swagger UI: http://localhost:${port}/api-docs`);
        });
    }
});
