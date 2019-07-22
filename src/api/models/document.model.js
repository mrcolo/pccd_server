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
  notes: {
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
  current_program: {
    type: String,
  },
  lead: {
    type: String,
  },
  terms: {
    type: [termSchema],
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

  async completeMe(curr, cat) {
    try {
      let document;
      let query;
      switch (cat) {
        case '0':
          query = { title: { $regex: `^${curr}` } };
          break;
        case '1':
          query = { current_program: { $regex: `^${curr}` } };
          break;
        case '2':
          query = { career_community: { $regex: `^${curr}` } };
          break;
        default:
          break;
      }

      if (curr.length > 0) {
        try {
          document = await this.find(query).exec();
        } catch (error) {
          throw error;
        }
      }

      if (document) {
        return document;
      }

      throw new APIError({
        message: 'class does not exist',
        status: httpStatus.NOT_FOUND,
      });
    } catch (error) {
      throw error;
    }
  },
};

/**
 * @typedef document
 */
module.exports = mongoose.model('document', documentSchema);
