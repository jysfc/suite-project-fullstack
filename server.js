const express = require("express");
const app = express();

app.use("/api/v1/users", require("./api/v1/users"));
app.use("/api/v1/properties", require("./api/v1/properties"));
app.use("/api/v1/suites", require("./api/v1/suites"));
app.get("/", (req, res) => res.send("Suite Project"));

const port = process.env.PORT || 3021;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
