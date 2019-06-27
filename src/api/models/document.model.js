const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const APIError = require('../utils/APIError');

/**
 * document Schema
 * @private
 */
const classSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  class_id: {
    type: String,
  },
});

const termSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  classes: [classSchema],
});

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  outcomes: {
    type: String,
  },
  jobs: {
    type: String,
  },
  skills: {
    type: String,
  },
  career_community: {
    type: String,
  },
  term_code: {
    type: String,
  },
  current_program: {
    type: String,
  },
  lead: {
    type: String,
  },
  terms: {
    type: [termSchema],
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

/**
 * Methods
 */
documentSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'title', 'description', 'outcomes',
      'jobs', 'skills', 'career_community', 'term_code', 'current_program', 'lead', 'terms', 'createdAt', 'notes'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
documentSchema.statics = {
  /**
   * Get a document from database
   *
   * @param {ObjectId} id - The objectId of document.
   * @returns {Promise<document, APIError>}
   */
  async get(id) {
    try {
      let document;

      if (mongoose.Types.ObjectId.isValid(id)) {
        document = await this.findById(id).exec();
      }
      if (document) {
        return document;
      }

      throw new APIError({
        message: 'document does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
  /**
   * List documents in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of documents to be skipped.
   * @param {number} limit - Limit number of documents to be returned.
   * @returns {Promise<document[]>}
   */
  list({
    page = 1, perPage = 30, name, email, role,
  }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'email',
          location: 'body',
          messages: ['"email" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },
};

/**
 * @typedef document
 */
module.exports = mongoose.model('document', documentSchema);
