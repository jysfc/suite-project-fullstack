import React from "react";
import AppTemplate from "../ui/AppTemplate";
import { Link } from "react-router-dom";
import AddIcon from "../../icons/add.svg";
import PropPrev from "../ui/PropPrev";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../../store/actions";

class SelectProperty extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         properties: [],
         displayedProperties: [],
      };
      this.deleteProperty = this.deleteProperty.bind(this);
   }

   componentDidMount() {
      this.setProperties();
   }

   setProperties() {
      axios
         .get(`/api/v1/properties`)
         .then((res) => {
            // handle success
            console.log(res.data);
            this.setState({
               properties: res.data,
               displayedProperties: res.data,
            });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   addProperty() {}

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
      return (
         <AppTemplate>
            {/* <!-- Properties --> */}
            {this.state.displayedProperties.map((property) => {
               return (
                  <PropPrev
                     EditProperty
                     property={property}
                     key={property.id}
                     deleteProperty={this.deleteProperty}
                  />
               );
            })}

            {/* <!-- Property new --> */}
            <div className="col mb-4">
               <Link
                  to="edit-property"
                  className="text-decoration-none"
                  type="add-property"
               >
                  <img src={AddIcon} width="24px" id="hotel-add" alt="" />
                  <p className="d-inline ml-4">Add Property</p>
               </Link>
            </div>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      editableProperty: state.editableProperty,
   };
}
export default connect(mapStateToProps)(SelectProperty);
