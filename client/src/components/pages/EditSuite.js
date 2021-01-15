import React from "react";
import AppTemplate from "../ui/AppTemplate";
import PropInfo from "../ui/PropInfo";
import suites from "../../data/suites";
import SuiteInput from "../ui/SuiteInput";
import { connect } from "react-redux";
const suite = suites[0];

class EditSuite extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         displayedSuites: [],
      };
   }
   render() {
      return (
         <AppTemplate>
            <div className="row mb-4">
               <div className="container">
                  <div className="row">
                     {/* <!--COLUMN LEFT PROP INFO--> */}

                     <PropInfo suite={suite} key={suite.propertyId} />
                     {/* <!--COLUMN RIGHT EDIT SUITE--> */}
                     {/* {this.props.property.suites.map((suite) => {
                        <SuiteInput suite={suite} key={suite.id} />;
                     })} */}
                     <SuiteInput />
                  </div>
               </div>
            </div>
         </AppTemplate>
      );
   }
}
function mapStateToProps(state) {
   return {
      editableSuite: state.editableSuite,
      allSuites: state.allSuites,
   };
}
export default connect(mapStateToProps)(EditSuite);
