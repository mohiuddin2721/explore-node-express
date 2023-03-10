const express = require('express');
// const { saveAllTools, getAllTools } = require('../../controllers/tools.controller');
const toolsController = require('../../controllers/tools.controller');
const limiter = require('../../middleware/limit');
const { viewCount } = require('../../middleware/viewCount');
const router = express();

// router.get('/', (req, res) => {
//     res.send(`tools found`)
// })

// router.post('/', (req, res) => {
//     res.send('tools post')
// })
router
  .route('/')

  /**
 * @api {get} /tools All tools
 * @apiDescription Get all the tools
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization   User's access token
 *
 * @apiParam  {Number{1-}}         [page=1]     List page
 * @apiParam  {Number{1-100}}      [limit=10]  Users per page
 *
 * @apiSuccess {Object[]} all the tools.
 *
 * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
 * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
 */
  .get(toolsController.getAllTools)

  /**
* @api {post} /tools save a tool
* @apiDescription Get all the tools
* @apiPermission admin
*
* @apiHeader {String} Authorization   User's access token
*
* @apiParam  {Number{1-}}         [page=1]     List page
* @apiParam  {Number{1-100}}      [limit=10]  Users per page
*
* @apiSuccess {Object[]} all the tools.
*
* @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
* @apiError (Forbidden 403)     Forbidden     Only admins can access the data
*/
  .post(toolsController.saveATools)

router
  .route('/test')
  .post(toolsController.test)
  .get(toolsController.testGet)

router
  .route('/:id')
  .get(limiter, toolsController.getToolId)
  .patch(toolsController.updateTool)
  .delete(toolsController.deleteTool)



module.exports = router;