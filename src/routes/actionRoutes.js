/** @file GitHub actions webhook routes. */

import { Router } from "express"
import { deploySite } from "../controllers/actionsControllers.js"
import { validateApiSecret } from "../middleware/authorization.js"

const router = Router()
router.post("/:repo", validateApiSecret, deploySite)

export default router
