const db = require("../db");
const selectUserPropertySuites = require("../queries/selectUserPropertySuites");

module.exports = async function getInsertNewPropertyError(id) {
   if (await checkIsInDb(id)) {
      //(checkIsInDb(id) === true)
      return "This property id exists in the database.";
   }
   return "";
};

function checkIsInDb(id) {
   return db
      .query(selectUserPropertySuites, id)
      .then((properties) => {
         if (properties.length === 0) return false;
         else return true;
      })
      .catch((err) => {
         console.log(err);
      });
}
