import React from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

class LogIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   async validateAndLogInUser() {
      const loginEmailInput = document.getElementById("login-email-input")
         .value;
      const loginPasswordInput = document.getElementById("login-password-input")
         .value;

      const user = {
         email: loginEmailInput,
         password: loginPasswordInput,
      };
      // console.log("created user object for POST: ", user); // will show user/pw on console
      axios
         .post("/api/v1/users/auth", user)
         .then((res) => {
            // Update currentUser in global state with API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/create-answer");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({ hasEmailError: true, emailError });
            } else {
               this.setState({ hasEmailError: false, emailError });
            }
            if (passwordError !== "") {
               this.setState({ hasPasswordError: true, passwordError });
            } else {
               this.setState({ hasPasswordError: false, passwordError });
            }
         });
   }

   render() {
      return (
         // <!-- return card -->
         <div className="col-12 col-md-6">
            <div className="text-dark mt-4">
               <h2>Welcome back</h2>
               <>
                  <p className="mt-3 mb-5">
                     Log in with your email address and password.
                  </p>

                  <div className="form-group">
                     <label
                        htmlFor="login-email-input"
                        className="text-muted lead"
                     >
                        Email address
                     </label>
                     <input
                        type="email"
                        className={classnames({
                           "form-control": true,
                           "mb-2": true,
                           "is-invalid": this.state.hasEmailError,
                        })}
                        id="login-email-input"
                     />
                     {this.state.hasEmailError && (
                        <p className="text-danger" id="login-email-error">
                           {this.state.emailError}
                        </p>
                     )}
                  </div>
                  <div className="form-group">
                     <label
                        htmlFor="login-password-input"
                        className="text-muted lead"
                     >
                        Password
                     </label>
                     <input
                        type="password"
                        className={classnames({
                           "form-control": true,
                           "mb-2": true,
                           "is-invalid": this.state.hasPasswordError,
                        })}
                        id="login-password-input"
                     />
                     {this.state.hasPasswordError && (
                        <p className="text-danger" id="login-password-error">
                           {this.state.passwordError}
                        </p>
                     )}
                  </div>
                  <button
                     id="login-button"
                     className="btn btn-primary float-right"
                     onClick={() => {
                        this.validateAndLogInUser();
                     }}
                  >
                     Log in
                  </button>
               </>
            </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(LogIn));
