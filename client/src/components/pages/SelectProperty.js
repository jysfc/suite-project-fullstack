import React from "react";
import AppTemplate from "../ui/AppTemplate";
import AddIcon from "../../icons/add.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../../store/actions";
import RemoveIcon from "../../icons/remove.svg";
import jwtDecode from "jwt-decode";
import { v4 as getUuid } from "uuid";

class SelectProperty extends React.Component {
   constructor(props) {
      super(props);
      console.log(this.props.currentUser);
      this.state = {
         properties: [],
         displayedProperties: [],
         property: this.props.currentUser || "",
      };
      this.deleteProperty = this.deleteProperty.bind(this);
   }

   componentDidMount() {
      this.setProperties();
   }

   setProperties() {
      axios
         .get(`/api/v1/users/auth`)
         .then((res) => {
            // handle success
            const authToken = res.data;

            localStorage.setItem("authToken", authToken);
            const user = jwtDecode(authToken);
            console.log(user);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: user,
            });
            this.setState({
               properties: user,
               displayedProperties: user,
            });
            axios.defaults.headers.common["x-auth-token"] = authToken;
            console.log(authToken);
         })

         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   addProperty() {
      console.log("ADD UPDATE_EDITABLE_PROPERTY");
      console.log(this.props.currentUser);
      // this.setState({ property: e.target.value });
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: {
            userId: this.props.currentUser.id,
            name: "",
            id: getUuid(),
            website: "",
            address1: "",
            address2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            phoneCountryCode: "",
            phoneAreaCode: "",
            phoneNumber: "",
            selfParking: "",
            valetParking: "",
            hasOutdoorPool: "",
            hasSpa: "",
            isSmokeFree: "",
            isActive: 1,
            suites: [],
         },
      });
      this.props.history.push("/edit-property");
   }

   editProperty(property) {
      console.log("EDIT UPDATE_EDITABLE_PROPERTY");
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: property,
      });
      this.props.history.push("/edit-property");
   }

   deleteProperty(property) {
      const deletedProperty = property;
      const properties = this.state.displayedProperties;
      const displayedProperties = properties.filter((property) => {
         return property.id !== deletedProperty.id;
      });
      console.log(displayedProperties);
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: displayedProperties,
      });
      this.setState({ displayedProperties: displayedProperties });
   }

   render() {
      // console.log(this.state.properties);
      return (
         <AppTemplate>
            {/* <!-- Properties --> */}

            {this.props.currentUser.properties.map((property) => {
               return (
                  <div className="col my-6 mr-2 shadow p-3 bg-white rounded">
                     <Link
                        to="edit-property"
                        className="text-dark text-decoration-none"
                        type="button"
                        onClick={() => {
                           this.editProperty(property);
                        }}
                     >
                        <h5>{property.name}</h5>
                     </Link>

                     <button
                        className="text-danger text-decoration-none float-right btn btn-link"
                        onClick={() => {
                           this.deleteProperty(property);
                        }}
                     >
                        <img
                           src={RemoveIcon}
                           width="20px"
                           id="hotel-add"
                           alt=""
                        />
                        Remove
                     </button>
                  </div>
               );
            })}

            {/* <!-- Property new --> */}
            <div className="col mb-4">
               <button
                  className="text-primary text-decoration-none btn btn-link"
                  type="add-property"
                  onClick={() => {
                     this.addProperty();
                  }}
               >
                  <img src={AddIcon} width="24px" id="hotel-add" alt="" />
                  <p className="d-inline ml-4">Add Property</p>
               </button>
            </div>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      currentUser: state.currentUser,
      editableProperty: state.editableProperty,
   };
}
export default connect(mapStateToProps)(SelectProperty);
