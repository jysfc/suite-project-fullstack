import React from "react";
import ParkSelfIcon from "../../icons/parkself.svg";
import ParkValetIcon from "../../icons/parkvalet.svg";
import PoolOutdoorIcon from "../../icons/pooloutdoor.svg";
import SpaIcon from "../../icons/spa.svg";
import SmokingNoIcon from "../../icons/smokingno.svg";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class PropInfo extends React.Component {
   render() {
      const props = this.props.suite;
      return (
         //<!--COLUMN LEFT PROP INFO-->
         <div className="col-12 col-md-6">
            <h2>{props.propertyName}</h2>
            <ul className="list-unstyled">
               <li className="mt-4">{props.propertyAddress1}</li>
               <li>
                  {props.city}, {props.state} {props.zip} {props.country}
               </li>
               <li>
                  {props.phoneCountryCode}({props.phoneAreaCode}){" "}
                  {props.phoneNumber}
               </li>

               <li className="mt-4">
                  <img
                     src={ParkSelfIcon}
                     width="16px"
                     className="mr-1"
                     alt=""
                  />
                  <strong>Self parking:</strong> {props.selfParking}
               </li>
               <li>
                  <img
                     src={ParkValetIcon}
                     width="16px"
                     className="mr-1"
                     alt=""
                  />
                  <strong>Valet parking:</strong> {props.valetParking}
               </li>
               <li className="lead mt-4">Hotel Amenities:</li>
               <li>
                  <ul className="list-unstyled">
                     {props.hasOutdoorPool && (
                        <li>
                           <img
                              src={PoolOutdoorIcon}
                              width="16px"
                              className="mr-1"
                              alt=""
                           />
                           Outdoor Pool
                        </li>
                     )}

                     {props.hasSpa && (
                        <li>
                           <img
                              src={SpaIcon}
                              width="16px"
                              className="mr-1"
                              alt=""
                           />
                           Spa
                        </li>
                     )}

                     {props.isSmokeFree && (
                        <li>
                           <img
                              src={SmokingNoIcon}
                              width="16px"
                              className="mr-1"
                              alt=""
                           />
                           Smoke-free
                        </li>
                     )}
                  </ul>
               </li>
            </ul>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {
      allSuites: state.allSuites,
   };
}
export default withRouter(connect(mapStateToProps)(PropInfo));
