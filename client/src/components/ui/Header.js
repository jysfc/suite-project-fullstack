import React from "react";
import BedLogo from "../../icons/bed-logo.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import actions from "../../store/actions";

class Header extends React.Component {
   logOutCurrentUser() {
      this.props.dispatch({
         type: actions.UPDATE_CURRENT_USER,
         payload: {},
      });
   }

   render() {
      return (
         <div className="row my-4">
            <div className="col-sm-12 ml-n1">
               <Link to="/" className="text-decoration-none" type="button">
                  <img src={BedLogo} width="38px" alt="Hotel Logo" />
                  <h2 className="d-inline">Suite Project</h2>
               </Link>

               <Link
                  to="/loginAndSignUp"
                  className="btn btn-link float-right text-decoration-none"
                  onClick={() => {
                     this.logOutCurrentUser();
                  }}
               >
                  Log out
               </Link>

               <Link
                  to="/loginAndSignUp"
                  className="btn btn-link float-right mr-3 text-decoration-none"
               >
                  Log in
               </Link>

               <div className="clearfix"></div>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}

export default connect(mapStateToProps)(Header);
