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
      .then((suites) => {
         //  console.log(suites);
         const camelCaseSuites = suites.map((suite) => {
            return {
               id: suite.id,
               imagery: suite.imagery,
               answer: suite.answer,
               userId: suite.user_id,
               createdAt: suite.created_at,
               nextAttemptAt: suite.next_attempt_at,
               lastAttemptAt: suite.last_attempt_at,
               totalSuccessfulAttempts: suite.total_successful_attempts,
               level: suite.level,
            };
         });
         res.json(camelCaseSuites);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
