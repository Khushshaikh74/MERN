const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || 'Something went wrong';

  // Optional: Extract specific validation message if available
  if (err.errors?.[0]?.message) {
    statusCode = 400;
    message = err.errors[0].message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorMiddleware;
