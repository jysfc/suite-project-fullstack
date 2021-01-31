const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/v1/users", require("./api/v1/users"));
// app.use("/api/v1/properties", require("./api/v1/properties"));
app.use("/api/v1/suites", require("./api/v1/suites"));

app.use(express.static("client/build"));
app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 3021;
app.listen(port, () =>
   console.log(`Server running at http://localhost:${port}`)
);
