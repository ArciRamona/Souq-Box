//Creating Error Handle class

class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // Call the parent Error constructor
    super(message);

    // Add custom properties
    this.statusCode = statusCode;

    // Maintain proper stack trace for where the error occurred
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ErrorHandler;
