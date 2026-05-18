const fs = require('fs');
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE341 Project API',
        description: 'REST API for contacts and temples (MongoDB)',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    tags: [
        { name: 'Contacts', description: 'Contact records in MongoDB' },
        { name: 'Temples', description: 'Temple records in MongoDB' },
    ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

const routeDocs = {
    '/contacts/': {
        get: {
            tags: ['Contacts'],
            summary: 'Get all contacts',
            description: 'Returns every contact document from the contacts collection.',
            responses: {
                200: { description: 'List of contacts' },
                500: { description: 'Server error' },
            },
        },
    },
    '/contacts/{id}': {
        get: {
            tags: ['Contacts'],
            summary: 'Get one contact by id',
            description: 'Returns a single contact by MongoDB ObjectId.',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    type: 'string',
                    description: 'MongoDB ObjectId (24 hex characters)',
                },
            ],
            responses: {
                200: { description: 'Contact found' },
                400: { description: 'Invalid ObjectId' },
                404: { description: 'Contact not found' },
                500: { description: 'Server error' },
            },
        },
    },
    '/temples/': {
        get: {
            tags: ['Temples'],
            summary: 'Get all temples',
            description: 'Returns every temple document from the temples collection.',
            responses: {
                200: { description: 'List of temples' },
                500: { description: 'Server error' },
            },
        },
    },
    '/temples/{id}': {
        get: {
            tags: ['Temples'],
            summary: 'Get one temple by id',
            description: 'Returns a single temple by MongoDB ObjectId.',
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    type: 'string',
                    description: 'MongoDB ObjectId (24 hex characters)',
                },
            ],
            responses: {
                200: { description: 'Temple found' },
                400: { description: 'Invalid ObjectId' },
                404: { description: 'Temple not found' },
                500: { description: 'Server error' },
            },
        },
    },
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const spec = JSON.parse(fs.readFileSync(outputFile, 'utf8'));

    for (const [path, methods] of Object.entries(routeDocs)) {
        if (!spec.paths[path]) {
            spec.paths[path] = {};
        }
        for (const [method, meta] of Object.entries(methods)) {
            spec.paths[path][method] = {
                ...spec.paths[path][method],
                ...meta,
                produces: ['application/json'],
            };
        }
    }

    spec.tags = doc.tags;
    fs.writeFileSync(outputFile, JSON.stringify(spec, null, 2));
    console.log('swagger.json generated with route documentation');
});
