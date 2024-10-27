// KEEP THIS AS FIRST IMPORT
// See comment in module for details
import "../threadsSignalFix.js";

import { connect } from "../data/db.js";
import { setIsAPI } from "../globals.js";

function errorHandler(err) {
  console.error(err.stack || err);
  process.exit(1);
}

process.on("unhandledRejection", errorHandler);

setIsAPI(true);

// Connect to the database before loading the rest of the code (that depend on the database connection)
console.log("Connecting to database..."); // tslint:disable-line
connect().then(() => {
  import("./start.js");
});
