import React from "react";
import AppTemplate from "../ui/AppTemplate";
import SuitePrev from "../ui/SuitePrev";
import axios from "axios";
// import { connect } from "react-redux";
// import actions from "../../store/actions";

export default class Landing extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         suites: [],
         filteredSuites: [],
      };
   }

   componentDidMount() {
      this.setSuites();
   }

   filterSuites() {
      const input = document.getElementById("search-input").value;
      const lowerCasedInput = input.toLowerCase();
      const selectInput = document.getElementById("inputBeds").value;
      console.log(selectInput);
      console.log(lowerCasedInput);
      const filteredSuites = this.state.suites.filter((suite) => {
         const lowerCasedCity = suite.city.toLowerCase();
         const totalBeds =
            suite.totalFullBed + suite.totalKingBed + suite.totalQueenBed;
         console.log(totalBeds);
         if (
            (lowerCasedCity.includes(lowerCasedInput) ||
               suite.zip.includes(lowerCasedInput)) &&
            totalBeds === Number(selectInput)
         ) {
            return true;
         } else return false;
      });
      this.setState({ filteredSuites: filteredSuites });
   }

   setSuites() {
      axios
         .get(`/api/v1/suites?filteredSuites=${this.state.filteredSuites}`)
         .then((res) => {
            // handle success
            console.log(res.data);
            this.setState({
               suites: res.data,
               filteredSuites: res.data,
            });
            // this.props.dispatch({
            //    type: actions.PRESENT_ALL_SUITES,
            //    payload: res.data,
            // });
         })
         .catch((error) => {
            // handle error
            console.log(error);
         });
   }

   render() {
      return (
         <AppTemplate>
            {/* <!-- search bar--> */}
            <div className="row">
               <div className="col-sm-7">
                  <input
                     type="text"
                     className="form-control"
                     id="search-input"
                     placeholder="Las Vegas, NV"
                  />
               </div>
               <div className="col-sm-3">
                  <select
                     id="inputBeds"
                     className="form-control"
                     defaultValue="3"
                  >
                     <option value="1">1 bed</option>
                     <option value="2">2 beds</option>
                     <option value="3">3 beds</option>
                     <option value="4">4 beds</option>
                  </select>
               </div>
               <div className="col-sm-2 float-right">
                  <button
                     className="btn btn-primary"
                     onClick={() => this.filterSuites()}
                  >
                     Search
                  </button>
               </div>
            </div>
            {/* <!--results--> */}
            {this.state.filteredSuites.map((suite) => {
               return <SuitePrev PropInfo suite={suite} key={suite.id} />;
            })}
         </AppTemplate>
      );
   }
}
// function mapStateToProps(state) {
//    return {
//       allSuites: state.allSuites,
//    };
// }

// export default connect(mapStateToProps)(Landing);
