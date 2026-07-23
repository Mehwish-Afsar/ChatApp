const { isSpoofedBot } = require("@arcjet/inspect");
const aj = require("../lib/arcjet");

const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {

      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Rate limit exceeded. Please try again later.",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot access denied.",
        });
      }

      return res.status(403).json({
        message: "Access denied by security policy.",
      });
    }

    // Detect spoofed bots
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Error:", error);
    next();
  }
};

module.exports = arcjetProtection;