class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.messsage = err.message || "Internal Server Error"; //if message doesnot exist inetrnal server error
  err.statusCode = err.statusCode || 500;

  //some types of error

  //11000 is error code for same values
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = "json Web Token Is Invalid ,Try Again!";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = "json Web Token Is Expired ,Try Again!";
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "CastError") {
    const message = `invalid ${err.path}`;
    err = new ErrorHandler(message, 400); //if type doesnt match then it is cast error
  }

  const errorMessage = err.errors
    ? Object.values(err.errors).map(error => error.message).join("")
    : err.message;

  return res.status(err.statusCode).json({
    success: false,
    message: errorMessage,
  });
};

export default ErrorHandler;
