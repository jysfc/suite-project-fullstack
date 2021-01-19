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
   db.query(selectAllSuites, [
      constructedSearchTerm,
      { toSqlString: () => order },
   ])
      .then((suites) => {
         //  console.log(suites);
         const camelCaseSuites = suites.map((suite) => {
            return {
               propertyId: suite.property_id,
               city: suite.city,
               title: suite.title,
               id: suite.id,
               image: suite.image,
               squareFt: suite.square_ft,
               maxGuest: suite.max_guest,
               totalKingBed: suite.total_king_bed,
               totalQueenBed: suite.total_queen_bed,
               totalFullBed: suite.total_full_bed,
               hasWifi: suite.has_wifi,
               hasTv: suite.has_tv,
               hasSafe: suite.has_safe,
               isAccessible: suite.is_accessible,
               isActive: suite.is_active,
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
