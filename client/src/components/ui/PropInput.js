import React from "react";
import { Link } from "react-router-dom";
import SaveIcon from "../../icons/save.svg";
import classnames from "classnames";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import {
   checkIsOver,
   MAX_CARD_CHARS,
   safelyParseJson,
} from "../../utils/helpers";

class PropInput extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         website: "",
         address1: "",
         address2: "",
         city: "",
         state: "",
         zip: "",
         country: "",
         phone: "",
         hasOutdoorPool: false,
         hasSpa: false,
         isSmokeFree: false,
      };
   }

   checkHasInvalidCharCount() {
      if (
         this.props.property.name.length > MAX_CARD_CHARS ||
         this.props.property.name.length === 0
      ) {
         return true;
      } else return false;
   }

   updatePropInput(e) {
      let value = e.target.value;
      if (value === "true" || value === "false") {
         value = safelyParseJson(value); // "true" will be into true str to boolean
      }
      // this.setState({ [e.target.name]: value }); // set state based off target name
      const payload = {
         ...this.props.property,
         [e.target.name]: value,
      };
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: payload,
      });
   }

   updatePropInputWithSave() {
      // mimic API response:
      axios
         .put("/api/v1/users/:id")
         .then((res) => {
            console.log(res);
            // handle success
            this.props.dispatch({
               type: actions.UPDATE_EDITABLE_PROPERTY,
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
         <>
            {/* <!--CoLUMN LEFT EDIT PROP--> */}
            {/* <!--HOTEL & URL--> */}
            <div className="form-group">
               <label htmlFor="name">Hotel</label>
               <input
                  type="text"
                  className="form-control"
                  id="name"
                  defaultValue={this.props.property.name}
                  name="name"
                  onChange={(e) => this.updatePropInput(e)}
               />
            </div>
            <p
               className="float-right my-n4 text-muted d-flex ml-4"
               id="Hotel-characters"
            >
               <span
                  className={classnames({
                     "text-danger": checkIsOver(
                        this.props.property.name,
                        MAX_CARD_CHARS
                     ),
                  })}
               >
                  {this.props.property.name.length}/{MAX_CARD_CHARS}
               </span>
            </p>
            <div className="form-group">
               <label htmlFor="website">Website URL</label>
               <input
                  type="url"
                  className="form-control"
                  id="website"
                  defaultValue={this.props.property.website}
                  name="website"
                  onChange={(e) => this.updatePropInput(e)}
               />
            </div>

            {/* <!--ADDRESS--> */}
            <div className="form-group">
               <label htmlFor="address1">Address</label>
               <input
                  type="text"
                  className="form-control"
                  id="address1"
                  defaultValue={this.props.property.address1}
                  name="address1"
                  onChange={(e) => this.updatePropInput(e)}
               />
            </div>
            <div className="form-group">
               <label htmlFor="address2">Address 2</label>
               <input
                  type="text"
                  className="form-control"
                  id="address2"
                  defaultValue={this.props.property.address2}
                  name="address2"
                  onChange={(e) => this.updatePropInput(e)}
               />
            </div>
            {/* <!--CITY STATE ZIP COUNTRY--> */}
            <div className="form-row">
               <div className="form-group col-md-12">
                  <label htmlFor="city">City</label>
                  <input
                     type="text"
                     className="form-control"
                     id="city"
                     defaultValue={this.props.property.city}
                     name="city"
                     onChange={(e) => this.updatePropInput(e)}
                  />
               </div>
            </div>

            {/* <!--State Abbreviation--> */}
            <div className="form-row">
               <div className="form-group col-md-4">
                  <label htmlFor="state">State</label>
                  <select
                     id="state"
                     className="form-control"
                     defaultValue={this.props.property.state}
                     name="state"
                     onChange={(e) => this.updatePropInput(e)}
                  >
                     <option value="CA">California</option>
                     <option value="NV">Nevada</option>
                  </select>
               </div>
               <div className="form-group col-md-4">
                  <label htmlFor="zip">Zip</label>
                  <input
                     type="text"
                     className="form-control"
                     id="zip"
                     defaultValue={this.props.property.zip}
                     name="zip"
                     onChange={(e) => this.updatePropInput(e)}
                  />
               </div>
               {/* <!-- Country Abbreviation --> */}
               <div className="form-group col-md-4">
                  <label htmlFor="country">Country</label>
                  <select
                     id="country"
                     className="form-control"
                     defaultValue={this.props.property.country}
                     name="country"
                     onChange={(e) => this.updatePropInput(e)}
                  >
                     <option value="US">US</option>
                  </select>
               </div>
            </div>
            {/* <!--PHONE--> */}
            {/* <!-- country code & phone number--> */}
            <div className="form-row">
               <div className="form-group col-md-12">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                     type="tel"
                     className="form-control"
                     id="phone"
                     defaultValue={this.props.property.phone}
                     name="phone"
                     onChange={(e) => this.updatePropInput(e)}
                  />
               </div>
            </div>
            {/* <!--HOTEL AMENITIES CHECKBOX--> */}
            <div className="form-row">
               <div className="form-group col-md-12">
                  <p className="lead">Hotel Amenities</p>
               </div>

               <div className="form-group form-check-inline">
                  <input
                     className="form-check-input"
                     type="checkbox"
                     id="hasOutdoorPool"
                     checked={this.props.property.hasOutdoorPool}
                     name="hasOutdoorPool"
                     value={!this.props.property.hasOutdoorPool}
                     onChange={(e) => this.updatePropInput(e)}
                  />
                  <label className="form-check-label" htmlFor="hasOutdoorPool">
                     Outdoor Pool
                  </label>
               </div>

               <div className="form-group form-check-inline">
                  <input
                     className="form-check-input"
                     type="checkbox"
                     id="hasSpa"
                     checked={this.props.property.hasSpa}
                     name="hasSpa"
                     value={!this.props.property.hasSpa}
                     onChange={(e) => this.updatePropInput(e)}
                  />
                  <label className="form-check-label" htmlFor="hasSpa">
                     Spa
                  </label>
               </div>

               <div className="form-group form-check-inline">
                  <input
                     className="form-check-input"
                     type="checkbox"
                     id="isSmokeFree"
                     checked={this.props.property.isSmokeFree}
                     name="isSmokeFree"
                     value={!this.props.property.isSmokeFree}
                     onChange={(e) => this.updatePropInput(e)}
                  />
                  <label className="form-check-label" htmlFor="isSmokeFree">
                     Smoke-free
                  </label>
               </div>
            </div>

            <Link
               to="/edit-property"
               className={classnames("btn btn-primary btn-block mb-4", {
                  disabled: this.checkHasInvalidCharCount(),
               })}
               id="save"
               onClick={() => {
                  this.updatePropInputWithSave();
               }}
            >
               <img
                  src={SaveIcon}
                  width="24px"
                  className="mr-2"
                  id="property-add"
                  alt=""
               />
               Save
            </Link>
         </>
      );
   }
}
function mapStateToProps(state) {
   return {
      property: state.editableProperty,
   };
}
export default connect(mapStateToProps)(PropInput);
