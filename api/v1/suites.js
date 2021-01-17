// The suites resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllSuites = require("../../queries/selectAllSuites");

//@route        GET api/v1/suites
//@desc         Get all suites by search term and order
//@access       Public

router.get("/", (req, res) => {
   console.log(req.query);
   const { searchTerm, order } = req.query;
   let constructedSearchTerm;
   if (searchTerm === "" || searchTerm === undefined) {
      constructedSearchTerm = "%%";
   } else {
      constructedSearchTerm = `%${searchTerm}%`;
   }
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllSuites, [constructedSearchTerm, order])
      .then((dbRes) => {
         //  console.log(dbRes);
         res.json(dbRes);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
