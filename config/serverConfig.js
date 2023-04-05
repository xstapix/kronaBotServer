module.exports = {
  PORT: 8000,
  hostName: 'localhost',
  header: {
    ACA_Origin: "*",
    ACA_Credentials: "true",
    ACA_Methods: "HEAD,OPTIONS,POST,PUT",
    ACA_Headers: "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
    Content_Type: "application/json"
  }
}