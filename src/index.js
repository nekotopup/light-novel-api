module.exports = (req, res) => {
  // Redirect ke Swagger UI di ranobedb serverless function
  res.redirect("/api/ranobedb/docs");
};
