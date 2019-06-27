const express = require('express');
//  const validate = require('express-validation');
//  const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');
//  TODO define this.
// const {
//   createDocument,
//   replaceDocument,
//   updateDocument,
// } = require('../../validations/user.validation');
const controller = require('../../controllers/document.controller');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('documentId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/document List Documents
   * @apiDescription Get a list of document
   * @apiVersion 0.0.1
   * @apiName ListDocuments
   * @apiGroup Document
   * @apiPermission TODO
   *
   * @apiHeader {String} Authorization   Document's access token (TODO)
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Documents per page
   * @apiParam  {String}             [name]       Document's name
   *
   * @apiSuccess {Object[]} documents List of documents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data TODO
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data TODO
   */
  //  .get(authorize(ADMIN), controller.list)
  .get(controller.list)
  /**
   * @api {post} v1/document Create Document
   * @apiDescription Create a new document
   * @apiVersion 0.0.1
   * @apiName CreateDocument
   * @apiGroup Document
   * @apiPermission TODO
   *
   * @apiHeader {String} Authorization   Document's access token
   *
   * @apiParam  {String}             email     Document's email
   * @apiParam  {String{6..128}}     password  Document's password
   * @apiParam  {String{..128}}      [name]    Document's name
   * @apiParam  {String=user,admin}  [role]    Document's role
   *
   * @apiSuccess (Created 201) {String}  id         Document's id
   * @apiSuccess (Created 201) {String}  name       Document's name
   * @apiSuccess (Created 201) {String}  email      Document's email
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated document can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  //  .post(authorize(ADMIN), validate(createDocument), controller.create);
  .post(controller.create);

router
  .route('/:documentId')
  /**
   * @api {get} v1/document/:id Get Document
   * @apiDescription Get a document's information
   * @apiVersion 0.0.1
   * @apiName GetDocument
   * @apiGroup Document
   * @apiPermission TODO
   *
   * @apiHeader {String} Authorization   Document's access token TODO
   *
   * @apiSuccess {String}  id         Document's id
   * @apiSuccess {String}  name       Document's name
   * @apiSuccess {String}  email      Document's email
   * @apiSuccess {String}  role       Document's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated document can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Document does not exist
   */
  .get(controller.get)
  /**
   * @api {put} v1/document/:id Replace Document
   * @apiDescription Replace the whole user document with a new one
   * @apiVersion 0.0.1
   * @apiName ReplaceDocument
   * @apiGroup Document
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Document's access token
   *
   * @apiParam  {String}             email     Document's email
   * @apiParam  {String{6..128}}     password  Document's password
   * @apiParam  {String{..128}}      [name]    Document's name
   * @apiParam  {String=user,admin}  [role]    Document's role
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         Document's id
   * @apiSuccess {String}  name       Document's name
   * @apiSuccess {String}  email      Document's email
   * @apiSuccess {String}  role       Document's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated document can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Document does not exist
   */
  .put(controller.replace)
  /**
   * @api {patch} v1/documents/:id Update Document
   * @apiDescription Update some fields of a user document
   * @apiVersion 0.0.1
   * @apiName UpdateDocument
   * @apiGroup Document
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Document's access token
   *
   * @apiParam  {String}             email     Document's email
   * @apiParam  {String{6..128}}     password  Document's password
   * @apiParam  {String{..128}}      [name]    Document's name
   * @apiParam  {String=user,admin}  [role]    Document's role
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         Document's id
   * @apiSuccess {String}  name       Document's name
   * @apiSuccess {String}  email      Document's email
   * @apiSuccess {String}  role       Document's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated document can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Document does not exist
   */
  .patch(controller.update)
  /**
   * @api {patch} v1/document/:id Delete Document
   * @apiDescription Delete a document
   * @apiVersion 0.0.1
   * @apiName DeleteDocument
   * @apiGroup Document
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Document's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated document can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Document does not exist
   */
  .delete(controller.remove);


module.exports = router;
