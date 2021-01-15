import React from "react";
import { Link, withRouter } from "react-router-dom";
import RemoveIcon from "../../icons/remove.svg";
import { connect } from "react-redux";
import actions from "../../store/actions";

class PropPrev extends React.Component {
   editProperty() {
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: this.props.property,
      });
      this.props.history.push("/edit-property");
   }

   render() {
      return (
         //<!-- Property -->
         <div className="col my-6 mr-2 shadow p-3 bg-white rounded">
            <Link
               to="edit-property"
               className="text-dark text-decoration-none"
               type="button"
               onClick={() => {
                  this.editProperty();
               }}
            >
               <h5>{this.props.property.name}</h5>
            </Link>

            <button
               className="text-danger text-decoration-none float-right btn btn-link"
               onClick={() => {
                  this.props.deleteProperty(this.props.property);
               }}
            >
               <img src={RemoveIcon} width="20px" id="hotel-add" alt="" />
               Remove
            </button>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {
      editableProperty: state.editableProperty,
      editableSuite: state.editableSuite,
   };
}
export default withRouter(connect(mapStateToProps)(PropPrev));
