const httpStatus = require('http-status');
const { omit } = require('lodash');
const Document = require('../models/document.model');

/**
 * Load a document and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const document = await Document.get(id);
    req.locals = { document };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get a document
 * @public
 */
exports.get = (req, res) => res.json(req.locals.document);

/**
 * Create new document
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const document = new Document(req.body);
    const savedDocument = await document.save();

    res.status(httpStatus.CREATED);
    res.json(savedDocument.transform());
  } catch (error) {
    next();
  }
};

/**
 * Replace existing document
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { document } = req.locals;
    const newDocument = new Document(req.body);
    const newDocumentObject = omit(newDocument.toObject(), '_id');

    await document.update(newDocumentObject, { override: true, upsert: true });
    const savedDocument = await Document.findById(document._id);

    res.json(savedDocument.transform());
  } catch (error) {
    next();
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
  const updatedDocument = req.body;
  const documents = Object.assign(req.locals.user, updatedDocument);

  documents.save()
    .then(savedDocument => res.json(savedDocument.transform()))
    .catch(next());
};

/**
 * Get document list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const documents = await Document.list(req.query);
    const transformedDocuments = documents.map(document => document.transform());
    res.json(transformedDocuments);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete document
 * @public
 */
exports.remove = (req, res, next) => {
  const { document } = req.locals;

  document.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};

exports.autocomplete = async (req, res, next) => {
  try {
    const documents = await Document.completeMe(req.query.a, req.query.c);
    res.json(documents);
  } catch (error) {
    next(error);
  }
};
