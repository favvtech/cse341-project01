const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// #swagger.tags = ['Contacts']
// #swagger.summary = 'Get all contacts'
// #swagger.description = 'Returns every contact document from the contacts collection in MongoDB.'
/* #swagger.responses[200] = {
        description: 'List of contacts',
        content: { 'application/json': { schema: { type: 'array' } } }
   }
   #swagger.responses[500] = { description: 'Server error' }
*/
router.get('/', contactsController.getAll);

// #swagger.tags = ['Contacts']
// #swagger.summary = 'Get one contact by MongoDB ObjectId'
// #swagger.description = 'Returns a single contact matching the _id in the URL path.'
/* #swagger.parameters['id'] = {
        in: 'path',
        description: 'MongoDB ObjectId (24 hex characters)',
        required: true,
        type: 'string'
   }
   #swagger.responses[200] = {
        description: 'Contact found',
        content: { 'application/json': { schema: { type: 'object' } } }
   }
   #swagger.responses[400] = { description: 'Invalid ObjectId' }
   #swagger.responses[404] = { description: 'Contact not found' }
   #swagger.responses[500] = { description: 'Server error' }
*/
router.get('/:id', contactsController.getSingle);

// #swagger.tags = ['Contacts']
// #swagger.summary = 'Create a contact'
// #swagger.description = 'Creates a new contact. All fields are required.'
router.post('/', contactsController.createContact);

// #swagger.tags = ['Contacts']
// #swagger.summary = 'Update a contact'
// #swagger.description = 'Updates a contact by MongoDB ObjectId. All fields are required.'
router.put('/:id', contactsController.updateContact);

// #swagger.tags = ['Contacts']
// #swagger.summary = 'Delete a contact'
// #swagger.description = 'Deletes a contact by MongoDB ObjectId.'
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
