const httpStatus = require('http-status');
const Class = require('../models/class.model');

/**
 * Load a document and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const classes = await Class.get(id);
    req.locals = { classes };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get a document
 * @public
 */
exports.get = (req, res) => res.json(req.locals.classes.transform());

/**
 * Create new document
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const tempClass = new Class(req.body);
    const savedClass = await tempClass.save();
    res.status(httpStatus.CREATED);
    res.json(savedClass.transform());
  } catch (error) {
    next();
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
  const updatedClass = req.body;
  const classes = Object.assign(req.locals.user, updatedClass);

  classes.save()
    .then(savedClass => res.json(savedClass.transform()))
    .catch(next());
};

/**
 * Get document list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const classes = await Class.list(req.query);
    const transformedclasses = classes.map(document => document.transform());
    res.json(transformedclasses);
  } catch (error) {
    next(error);
  }
};

exports.autocomplete = async (req, res, next) => {
  try {
    const classes = await Class.completeMe(req.query.a);
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete document
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
