import actions from "../actions";

export default function editableProperty(editableProperty = {}, action) {
   let newEditableProperty = { ...editableProperty };
   switch (action.type) {
      case actions.UPDATE_EDITABLE_PROPERTY:
         newEditableProperty.properties = action.payload;
         return newEditableProperty;
      default:
         return editableProperty;
   }
}
