// Sending JWT Token in Cookie
// Creat Token and Save it in Cookie

export default (user, statusCode, res) => {
  // Create JWT Token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() +
        parseInt(process.env.COOKIE_EXPIRES_TIME || "7") * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Also have to pass in here one more option that is called Http only as Http only. That is going to be true because the http only cookie cannot be accessed on the front end. It can only be accessed on the back end.
  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
