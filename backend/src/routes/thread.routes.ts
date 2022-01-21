import express from "express";
import * as threadCtrl from "../controllers/thread.controller";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();
const prefix = "/api/thread";

/**
 * @method POST - Create a new thread
 * @method GET - List all threads
 */
router
  .route(prefix)
  .post(threadCtrl.create)
  .get(authCtrl.requireSignin, threadCtrl.list);

/**
 * @method GET - Thread By ID
 * @method PUT - Update a thread by ID
 * @method DELETE - Delete a thread by ID
 */
router
  .route(`${prefix}/:id`)
  .get(threadCtrl.show)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, threadCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, threadCtrl.remove);

export default router;