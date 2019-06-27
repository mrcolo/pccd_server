const Joi = require('joi');
const Document = require('../models/user.model');

module.exports = {

  // GET /v1/document
  listDocuments: {
    query: {
    },
  },

  // POST /v1/document
  createDocument: {
    body: {
    },
  },

  // PUT /v1/users/:userId
  replaceDocument: {
    body: {
    },
    params: {
    },
  },

  // PATCH /v1/users/:userId
  updateDocument: {
    body: {
      email: Joi.string().email(),
      password: Joi.string().min(6).max(128),
      name: Joi.string().max(128),
      role: Joi.string().valid(Document.roles),
    },
    params: {
      userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
