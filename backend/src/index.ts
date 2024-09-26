import app from "./app";
import http from "http";
import { globalErrorHandler } from "./middlewares";

const port = process.env.PORT || 8001;

app.use(globalErrorHandler);

http.createServer(app).listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
