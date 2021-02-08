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
      const suite = this.props.suite;
      return (
         //<!--COLUMN LEFT PROP INFO-->
         <div className="col-12 col-md-6">
            <h2>{suite.propertyName}</h2>
            <ul className="list-unstyled">
               <li className="mt-4">{suite.propertyAddress1}</li>
               <li>
                  {suite.city}, {suite.state} {suite.zip} {suite.country}
               </li>
               <li>
                  {suite.phoneCountryCode}({suite.phoneAreaCode}){" "}
                  {suite.phoneNumber}
               </li>

               <li className="mt-4">
                  <img
                     src={ParkSelfIcon}
                     width="16px"
                     className="mr-1"
                     alt=""
                  />
                  <strong>Self parking:</strong> {suite.selfParking}
               </li>
               <li>
                  <img
                     src={ParkValetIcon}
                     width="16px"
                     className="mr-1"
                     alt=""
                  />
                  <strong>Valet parking:</strong> {suite.valetParking}
               </li>
               <li className="lead mt-4">Hotel Amenities:</li>
               <li>
                  <ul className="list-unstyled">
                     {suite.hasOutdoorPool && (
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

                     {suite.hasSpa && (
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

                     {suite.isSmokeFree && (
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
