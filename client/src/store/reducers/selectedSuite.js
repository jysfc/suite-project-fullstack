import actions from "../actions";

export default function selectedSuite(selectedSuite = {}, action) {
   switch (action.type) {
      case actions.PRESENT_SELECTED_SUITE:
         return action.payload;
      default:
         return selectedSuite;
   }
}
