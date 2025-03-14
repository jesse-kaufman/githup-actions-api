/** @file GitHub actions webhook server. */
import compression from "compression"
import cors from "cors"
import errorHandler from "errorhandler"
import express from "express"
import apiRoutes from "./routes/actionRoutes.js"

const port = 3000

// Setup Express
const app = express()

// Enable compression
app.use(compression())

// Interpret responses as JSON
app.use(express.json())

// Only parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// Use CORS
app.use(cors())

// Setup Express error handlers for dev environment
if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  app.use(errorHandler({ dumpExceptions: true, showStack: true }))
}

// Setup Express error handlers for production environment
if (process.env.NODE_ENV === "production") {
  app.use(errorHandler())
}

// Github webhook routes
app.use("/actions/api/v1", apiRoutes)

// Start the server
app.listen(port, () => {
  console.log(`Express running → PORT ${port}`)
})
