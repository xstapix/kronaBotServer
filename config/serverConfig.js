module.exports = {
  PORT: 3000,
  hostName: '127.0.0.1',
  header: {
    ACA_Origin: "*",
    ACA_Credentials: "true",
    ACA_Methods: "HEAD,OPTIONS,POST,PUT,GET",
    ACA_Headers: "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers",
    Content_Type: "application/json,text/plain,multipart/form-data"
  }
}