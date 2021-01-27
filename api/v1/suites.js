// The suites resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllSuites = require("../../queries/selectAllSuites");
const validateJwt = require("../../utils/validateJwt");

//@route        GET api/v1/suites
//@desc         Get all suites by search term and order
//@access       Private

router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   const { filteredSuite } = req.query;
   let constructedFilteredSuite;
   if (filteredSuite === "" || filteredSuite === undefined) {
      constructedFilteredSuite = "%%";
   } else {
      constructedFilteredSuite = `%${filteredSuite}%`;
   }
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllSuites, [constructedFilteredSuite])
      .then((suites) => {
         //  console.log(suites);
         const camelCaseSuites = suites.map((suite) => {
            return {
               propertyId: suite.property_id,
               city: suite.city,
               zip: suite.zip,
               title: suite.title,
               id: suite.id,
               image: suite.image,
               squareFt: suite.square_ft,
               maxGuest: suite.max_guest,
               totalKingBed: suite.total_king_bed,
               totalQueenBed: suite.total_queen_bed,
               totalFullBed: suite.total_full_bed,
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
