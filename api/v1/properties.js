// The properties resource
const express = require("express");
const router = express.Router();
const db = require("../../db");
const selectAllProperties = require("../../queries/selectAllProperties");
const validateJwt = require("../../utils/validateJwt");

//@route        GET api/v1/properties
//@desc         Get all properties by user id
//@access       Private

router.get("/", validateJwt, (req, res) => {
   console.log(req.query);
   //    const { filteredSuite } = req.query;
   //    let constructedFilteredSuite;
   //    if (filteredSuite === "" || filteredSuite === undefined) {
   //       constructedFilteredSuite = "%%";
   //    } else {
   //       constructedFilteredSuite = `%${filteredSuite}%`;
   //    }
   /* https://www.npmjs.com/package/mysql#escaping-query-values */
   db.query(selectAllProperties)
      .then((properties) => {
         //  console.log(properties);
         const camelCaseProperties = properties.map((property) => {
            return {
               userId: property.user_id,
               name: property.name,
               id: property.id,
               website: property.website,
               address: property.address1,
               address: property.address2,
               city: property.city,
               state: property.state,
               zip: property.zip,
               country: property.country,
               phoneCountryCode: property.phone_country_code,
               //    phoneAreaCode: property.phone_area_code,
               phoneNumber: property.phone_number,
               //    selfParking: property.self_parking,
               //    valetParking: property.valet_parking,
               hasOutdoorPool: property.has_outdoor_pool,
               hasSpa: property.has_spa,
               isSmokeFree: property.is_smoke_free,
               isActive: property.is_active,
            };
         });
         res.json(camelCaseProperties);
      })
      .catch((err) => {
         console.log(err);
         res.status(400).json(err);
      });
});

module.exports = router;
