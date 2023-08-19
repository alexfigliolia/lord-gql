import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "./Server";
import { Schema } from "./resolvers";
import { Environment } from "./Environment";

Server.use(cookieParser());
Server.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    exposedHeaders: ["Set-Cookie"],
  })
);

Server.use(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  (req, res) => {
    return graphqlHTTP({
      schema: Schema,
      graphiql: true,
      context: { req, res },
      // customFormatErrorFn: (err) => {
      //   return err;
      // },
    })(req, res);
  }
);

Server.listen(Environment.PORT, () => {
  console.log("SERVER STARTED", Environment.PORT);
});
