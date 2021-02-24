import actions from "../actions";

export default function editableProperty(editableProperty = {}, action) {
   switch (action.type) {
      case actions.UPDATE_EDITABLE_PROPERTY:
         return action.payload;
      default:
         return editableProperty;
   }
}
