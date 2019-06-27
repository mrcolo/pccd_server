const express = require('express');

const controller = require('../../controllers/class.controller');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('classId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/document List Classes
   * @apiDescription Get a list of document
   * @apiVersion 0.0.1
   * @apiName ListClasses
   * @apiGroup Class
   * @apiPermission TODO
   *
   * @apiHeader {String} Authorization   Class's access token (TODO)
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Classes per page
   * @apiParam  {String}             [name]       Class's name
   *
   * @apiSuccess {Object[]} documents List of documents.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data TODO
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data TODO
   */
  //  .get(authorize(ADMIN), controller.list)
  .get(controller.list)
  /**
   * @api {post} v1/document Create Class
   * @apiDescription Create a new document
   * @apiVersion 0.0.1
   * @apiName CreateClass
   * @apiGroup Class
   * @apiPermission TODO
   *
   * @apiHeader {String} Authorization   Class's access token
   *
   * @apiParam  {String}             email     Class's email
   * @apiParam  {String{6..128}}     password  Class's password
   * @apiParam  {String{..128}}      [name]    Class's name
   * @apiParam  {String=user,admin}  [role]    Class's role
   *
   * @apiSuccess (Created 201) {String}  id         Class's id
   * @apiSuccess (Created 201) {String}  name       Class's name
   * @apiSuccess (Created 201) {String}  email      Class's email
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated document can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  //  .post(authorize(ADMIN), validate(createClass), controller.create);
  .post(controller.create);

router
  .route('/autocomplete')
  .get(controller.autocomplete);

router
  .route('/:classId')
  /**
   * @api {get} v1/document/:id Get Class
   * @apiDescription Get a document's information
   * @apiVersion 0.0.1
   * @apiName GetClass
   * @apiGroup Class
   * @apiPermission TODO
   *
   * @apiHeader {String} Authorization   Class's access token TODO
   *
   * @apiSuccess {String}  id         Class's id
   * @apiSuccess {String}  name       Class's name
   * @apiSuccess {String}  email      Class's email
   * @apiSuccess {String}  role       Class's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated document can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Class does not exist
   */
  .get(controller.get)
  /**
   * @api {patch} v1/documents/:id Update Class
   * @apiDescription Update some fields of a user document
   * @apiVersion 0.0.1
   * @apiName UpdateClass
   * @apiGroup Class
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Class's access token
   *
   * @apiParam  {String}             email     Class's email
   * @apiParam  {String{6..128}}     password  Class's password
   * @apiParam  {String{..128}}      [name]    Class's name
   * @apiParam  {String=user,admin}  [role]    Class's role
   * (You must be an admin to change the user's role)
   *
   * @apiSuccess {String}  id         Class's id
   * @apiSuccess {String}  name       Class's name
   * @apiSuccess {String}  email      Class's email
   * @apiSuccess {String}  role       Class's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated document can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Class does not exist
   */
  .patch(controller.update)
  /**
   * @api {patch} v1/document/:id Delete Class
   * @apiDescription Delete a document
   * @apiVersion 0.0.1
   * @apiName DeleteClass
   * @apiGroup Class
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Class's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated document can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Class does not exist
   */
  .delete(controller.remove);

module.exports = router;
