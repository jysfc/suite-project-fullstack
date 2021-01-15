import React from "react";
import { withRouter } from "react-router-dom";
import RemoveIcon from "../../icons/remove.svg";
import { connect } from "react-redux";

class SuiteAvail extends React.Component {
   render() {
      return (
         <>
            {/*<!--RESULT-->*/}
            <div
               className="mb-3 mt-4 shadow p-3 mb-5 bg-white rounded"
               style={{ maxWidth: "auto", height: "auto" }}
            >
               <div className="row">
                  <div className="col-md-6 pr-1">
                     <img
                        src={this.props.suite.image}
                        className="img-fluid"
                        name="image"
                        alt={this.props.suite.title}
                     />{" "}
                  </div>
                  <div className="col-md-6 float-right">
                     <div className="text-muted">
                        <button
                           className="text-dark lead text-decoration-none btn btn-link"
                           type="button"
                           onClick={() => {
                              this.props.editSuite(this.props.suite.id);
                           }}
                        >
                           {this.props.suite.title}
                        </button>

                        <button
                           className="text-danger text-decoration-none float-right btn btn-link"
                           onClick={() => {
                              this.props.deleteSuite(this.props.suite);
                           }}
                        >
                           <img
                              src={RemoveIcon}
                              width="20px"
                              id="property-remove"
                              alt=""
                           />
                           Remove
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </>
      );
   }
}
function mapStateToProps(state) {
   return {
      editableSuite: state.editableSuite,
      property: state.editableProperty,
   };
}

export default withRouter(connect(mapStateToProps)(SuiteAvail));
