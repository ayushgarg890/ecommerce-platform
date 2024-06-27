const startServer= async () =>{

  const app = require("../app");

  const port = process.env.PORT || 3000;

  app.set("port", port);

  const http = require("http");

  const server = http.createServer(app);

  server.listen(port);

  return server;
}

module.exports.server = ()=>{
  return startServer();
}