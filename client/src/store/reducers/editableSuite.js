import actions from "../actions";

export default function editableSuite(editableSuite = {}, action) {
   switch (action.type) {
      case actions.UPDATE_EDITABLE_SUITE:
         return action.payload;
      default:
         return editableSuite;
   }
}
