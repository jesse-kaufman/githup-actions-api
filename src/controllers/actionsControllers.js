/** @file GitHub acstions webhook controller. */
import { promisify } from "util"
import { exec } from "child_process"

const execAsync = promisify(exec)

const runCommand = async (cmd, options = {}) => {
  try {
    const { stdout, stderr } = await execAsync(cmd, options)
    if (stderr) {
      console.error("Error:", stderr)
    }
    console.log("Output:", stdout)
  } catch (error) {
    console.error("Exec error:", error)
  }
}

const deployPortfolioSite = async () => {
  console.log("Starting Hugo build...")
  const cwd = "/home/containers/portfolio/src"
  const command =
    "hugo --destination ../build && rsync -av --delete ../build/ ../live/public/"
  await runCommand(command, { cwd })
}

/**
 * Deploys a site via GitHub actions.
 * @param {object} req - The HTTP request object.
 * @param {object} res - The HTTP response object.
 */
export const deploySite = async (req, res) => {
  switch (req.params.repo) {
    case "portfolio":
      await deployPortfolioSite()
      break
  }

  res.status(200).send()
}
