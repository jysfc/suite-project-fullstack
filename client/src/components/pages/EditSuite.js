import React from "react";
import AppTemplate from "../ui/AppTemplate";
import PropInfo from "../ui/PropInfo";
import SuiteInput from "../ui/SuiteInput";
import { connect } from "react-redux";

class EditSuite extends React.Component {
   // constructor(props) {
   //    super(props);
   //    this.state = {
   //       displayedSuites: [],
   //       editableSuite: [],
   //    };
   // }
   render() {
      console.log(this.props.editableSuite);
      // const suite = editableSuite;
      return (
         <AppTemplate>
            <div className="row mb-4">
               <div className="container">
                  <div className="row">
                     {/* <!--COLUMN LEFT PROP INFO--> */}

                     <PropInfo
                        suite={this.props.editableSuite}
                        key={this.props.editableSuite.propertyId}
                     />
                     {/* <PropInfo suite={suite} key={suite.propertyId} /> */}

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
