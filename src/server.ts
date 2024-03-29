import http from "http";
import app from "./app";

const normalizePort = (val: string) => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

const port = normalizePort(process.env.PORT || "3000");
console.log("Listening on Port " + port);
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.listen(3000);
