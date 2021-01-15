import actions from "../actions";

export default function allSuites(allSuites = {}, action) {
   let newSuite = { ...allSuites };
   switch (action.type) {
      case actions.PRESENT_ALL_SUITES:
         newSuite = action.payload;
         return newSuite;
      default:
         return allSuites;
   }
}
