

const { Prisma } = require("@prisma/client");

function errorHandler(err, req, res, next) {
  console.error("ERROR:", err);

  // Default error response
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate value (already exists)";
        break;

      case "P2025":
        statusCode = 404;
        message = "Record not found";
        break;

      default:
        statusCode = 400;
        message = "Database error";
    }
  }

  // Prisma validation errors
  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid data sent to database";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = errorHandler;