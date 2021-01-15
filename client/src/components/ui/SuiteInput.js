import React from "react";
import { Link } from "react-router-dom";
import SaveIcon from "../../icons/save.svg";
import classnames from "classnames";
import {
   checkIsOver,
   MAX_CARD_CHARS,
   safelyParseJson,
} from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class SuiteInput extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: "",
         totalKingBed: "",
         totalQueenBed: "",
         totalFullBed: "",
         squareFt: "",
         maxGuest: "",
         hasWifi: false,
         hasTv: false,
         hasSafe: false,
         isAccessible: false,
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.props.editableSuite.title.length > MAX_CARD_CHARS ||
         this.props.editableSuite.title.length === 0
      ) {
         return true;
      } else return false;
   }

   // setInputSuite(e) {
   //    this.setState({ inputSuite: e.target.value });
   // }
   updateSuiteInput(e) {
      let value = e.target.value;
      if (value === "true" || value === "false" || value === Number(value)) {
         value = safelyParseJson(value); // "true" will be into true str to boolean
      }
      // this.setState({ [e.target.name]: value }); // set state based off target name
      const payload = {
         ...this.props.property,
         [e.target.name]: value,
      };
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_SUITE,
         payload: payload,
      });
   }

   saveUpdateSuiteInput() {
      // mimic API response:
      axios
         .get(
            "https://raw.githubusercontent.com/jysfc/suite-project-mpa/main/src/data/current-user.json"
         )
         .then((res) => {
            // handle success
            this.props.dispatch({
               type: actions.UPDATE_EDITABLE_SUITE,
               payload: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   render() {
      return (
         // <!--COLUMN RIGHT EDIT SUITE-->
         <div className="col-12 col-md-6">
            <form className="md-form">
               <img
                  src={this.props.editableSuite.image}
                  className="img-fluid mb-4 crop"
                  alt={this.props.editableSuite.title}
               />
               {/* <!--URL image (link)--> */}
               <div className="custom-file mb-4" disabled>
                  <input
                     type="file"
                     className="custom-file-input"
                     disabled
                     id="customFile"
                  />
                  <label
                     className="custom-file-label"
                     disabled
                     htmlFor="customFile"
                  >
                     Image upload
                  </label>
               </div>
               {/* <!--NAME & BEDROOMS--> */}
               <div className="form-group">
                  <label htmlFor="title">Name of suite</label>
                  <input
                     type="text"
                     className="form-control"
                     id="title"
                     defaultValue={this.props.editableSuite.title}
                     name="title"
                     onChange={(e) => this.updateSuiteInput(e)}
                  />
               </div>
               <p
                  className="float-right my-n4 text-muted d-flex ml-4"
                  id="suite-characters"
               >
                  <span
                     className={classnames({
                        "text-danger": checkIsOver(
                           this.props.editableSuite.title,
                           MAX_CARD_CHARS
                        ),
                     })}
                  >
                     {this.props.editableSuite.title.length}/{MAX_CARD_CHARS}
                  </span>
               </p>

               {/* <!--ROW OF BEDS--> */}
               <div className="form-row">
                  <div className="form-group col-4">
                     <label htmlFor="totalKingBed">King beds</label>
                     <input
                        type="text"
                        className="form-control"
                        id="totalKingBed"
                        name="totalKingBed"
                        defaultValue={this.props.editableSuite.totalKingBed}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                  </div>
                  <div className="form-group col-4">
                     <label htmlFor="totalQueenBed">Queen beds</label>
                     <input
                        type="text"
                        className="form-control"
                        id="totalQueenBed"
                        name="totalQueenBed"
                        defaultValue={this.props.editableSuite.totalQueenBed}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                  </div>
                  <div className="form-group col-4">
                     <label htmlFor="totalFullBed">Full beds</label>
                     <input
                        type="text"
                        className="form-control"
                        id="totalFullBed"
                        name="totalFullBed"
                        defaultValue={this.props.editableSuite.totalFullBed}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                  </div>
               </div>
               {/* <!--SQFT and MAX GST--> */}
               <div className="form-row">
                  <div className="form-group col-6">
                     <label htmlFor="squareFt">Square ft.</label>
                     <input
                        type="text"
                        className="form-control"
                        id="squareFt"
                        name="squareFt"
                        defaultValue={this.props.editableSuite.squareFt}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                  </div>
                  <div className="form-group col-6">
                     <label htmlFor="maxGuest">Max Guests</label>
                     <input
                        type="text"
                        className="form-control"
                        id="maxGuest"
                        name="maxGuest"
                        defaultValue={this.props.editableSuite.maxGuest}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                  </div>
               </div>
               {/* <!--SUITE AMENITIES--> */}
               <div className="form-row">
                  <div className="form-group col-md-12">
                     <p className="lead">Suite Amenities</p>
                  </div>

                  <div className="form-group form-check-inline">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        id="hasWifi"
                        checked={this.props.editableSuite.hasWifi}
                        name="hasWifi"
                        defaultValue={!this.props.editableSuite.hasWifi}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                     <label className="form-check-label" htmlFor="hasWifi">
                        WiFi
                     </label>
                  </div>
                  <div className="form-group form-check-inline">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        id="hasTv"
                        checked={this.props.editableSuite.hasTv}
                        name="hasTv"
                        defaultValue={!this.props.editableSuite.hasTv}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                     <label className="form-check-label" htmlFor="hasTv">
                        TV
                     </label>
                  </div>
                  <div className="form-group form-check-inline">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        id="hasInRoomSafe"
                        checked={this.props.editableSuite.hasInRoomSafe}
                        name="hasInRoomSafe"
                        defaultValue={!this.props.editableSuite.hasInRoomSafe}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                     <label
                        className="form-check-label"
                        htmlFor="hasInRoomSafe"
                     >
                        In-Room Safe
                     </label>
                  </div>
                  <div className="form-group form-check-inline">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        id="isAccessible"
                        checked={this.props.editableSuite.isAccessible}
                        name="isAccessible"
                        defaultValue={!this.props.editableSuite.isAccessible}
                        onChange={(e) => this.updateSuiteInput(e)}
                     />
                     <label className="form-check-label" htmlFor="isAccessible">
                        Accessible
                     </label>
                  </div>
               </div>
            </form>
            <Link
               to="/select-property"
               className={classnames("btn btn-primary btn-block mb-4", {
                  disabled: this.checkHasInvalidCharCount(),
               })}
               style={{ width: "100%" }}
               id="save"
               onClick={() => {
                  this.saveUpdateSuiteInput();
               }}
            >
               <img
                  src={SaveIcon}
                  width="24px"
                  className="mr-2"
                  id="property-save"
                  alt=""
               />
               Save
            </Link>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {
      editableSuite: state.editableSuite,
   };
}
export default connect(mapStateToProps)(SuiteInput);
