const express = require('express');
const router = express.Router();

const templesController = require('../controllers/temples');

// #swagger.tags = ['Temples']
// #swagger.summary = 'Get all temples'
// #swagger.description = 'Returns every temple document from the temples collection in MongoDB.'
/* #swagger.responses[200] = {
        description: 'List of temples',
        content: { 'application/json': { schema: { type: 'array' } } }
   }
   #swagger.responses[500] = { description: 'Server error' }
*/
router.get('/', templesController.getAll);

// #swagger.tags = ['Temples']
// #swagger.summary = 'Get one temple by MongoDB ObjectId'
// #swagger.description = 'Returns a single temple matching the _id in the URL path.'
/* #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId (24 hex characters)',
        required: true,
        type: 'string'
   }
   #swagger.responses[200] = {
        description: 'Temple found',
        content: { 'application/json': { schema: { type: 'object' } } }
   }
   #swagger.responses[400] = { description: 'Invalid ObjectId' }
   #swagger.responses[404] = { description: 'Temple not found' }
   #swagger.responses[500] = { description: 'Server error' }
*/
router.get('/:id', templesController.getSingle);

module.exports = router;
