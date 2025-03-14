/** @file Middleware to validate the API secret from the Authorization header */

export const validateApiSecret = (req, res, next) => {
  /** Authorization header. */
  const authHeader = req.headers.authorization

  // If the header is missing
  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" })
  }

  /** Check if the header starts with 'Bearer ' and then extract the secret key. */
  const [scheme, apiSecret] = authHeader.split(" ")

  if (scheme !== "Bearer" || !apiSecret) {
    return res.status(400).json({ message: "Invalid authorization format" })
  }

  // Compare the provided API secret with your stored secret
  if (apiSecret !== process.env.API_SECRET) {
    return res.status(403).json({
      message: `Forbidden: Invalid API secret: ${process.env.API_SECRET}`,
    })
  }

  // If the secret matches, proceed to the next middleware or route handler
  next()
}
