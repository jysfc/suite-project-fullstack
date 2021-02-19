import React from "react";
import AppTemplate from "../ui/AppTemplate";
import AddIcon from "../../icons/add.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../../store/actions";
import RemoveIcon from "../../icons/remove.svg";
import jwtDecode from "jwt-decode";

class SelectProperty extends React.Component {
   constructor(props) {
      super(props);
      console.log(this.props.userPropertySuites);
      this.state = {
         properties: {},
         displayedProperties: {},
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
            // this.setState({
            //    properties: res.data,
            //    displayedProperties: res.data,
            // });
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: user,
            });
            axios.defaults.headers.common["x-auth-token"] = authToken;
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   addProperty() {
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: this.props.property,
      });
      this.props.history.push("/edit-property");
   }

   editProperty() {
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: this.props.property,
      });
      this.props.history.push("/edit-property");
   }

   deleteProperty(property) {
      const deletedProperty = property;
      const properties = this.state.displayedProperties;
      const filteredProperties = properties.filter((property) => {
         return property.id !== deletedProperty.id;
      });
      console.log(filteredProperties);
      this.props.dispatch({
         type: actions.UPDATE_EDITABLE_PROPERTY,
         payload: filteredProperties,
      });
      this.setState({ displayedProperties: filteredProperties });
   }

   render() {
      console.log(this.props.currentUser.properties.id);
      return (
         <AppTemplate>
            {/* <!-- Properties --> */}
            <div className="col my-6 mr-2 shadow p-3 bg-white rounded">
               <Link
                  to="edit-property"
                  className="text-dark text-decoration-none"
                  type="button"
                  onClick={() => {
                     this.editProperty();
                  }}
               >
                  <h5>{this.props.currentUser.properties[0].name}</h5>
               </Link>

               <button
                  className="text-danger text-decoration-none float-right btn btn-link"
                  onClick={() => {
                     this.deleteProperty();
                  }}
               >
                  <img src={RemoveIcon} width="20px" id="hotel-add" alt="" />
                  Remove
               </button>
            </div>

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
