import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";
import jwtDecode from "jwt-decode";

class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isDisplayingInputs: false,
         emailError: "",
         passwordError: "",
         hasEmailError: false,
         hasPasswordError: false,
      };
   }

   showInputs() {
      this.setState({
         isDisplayingInputs: true,
      });
   }

   async validateAndCreateUser() {
      const signupEmailInput = document.getElementById("signup-email-input")
         .value;
      const signupPasswordInput = document.getElementById(
         "signup-password-input"
      ).value;
      // Create user obj
      const user = {
         id: getUuid(),
         email: signupEmailInput,
         password: signupPasswordInput,
         createdAt: Date.now(),
         isActive: Boolean(true),
      };
      // console.log("created user object for POST: ", user); // will show user/pw on console
      // post to API
      axios
         .post("/api/v1/users", user)
         .then((res) => {
            // set token in localStorage
            const authToken = res.data;
            localStorage.setItem("authToken", authToken);
            const user = jwtDecode(authToken);
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: user,
            });
            axios.defaults.headers.common["x-auth-token"] = authToken;
            this.props.history.push("/select-property");
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
         // <!-- new member card -->
         <div className="col-12 col-md-6 mt-4">
            <div className="text-dark">
               <h2>Hotel sign up</h2>
               <p className="mt-3">Sign up for Suite Project</p>

               {/* <!-- new member card button --> */}
               {!this.state.isDisplayingInputs && (
                  <button
                     className="btn btn-primary btn-lg mt-5"
                     onClick={() => {
                        this.showInputs();
                     }}
                     id="signup-button"
                     style={{ width: "100%" }}
                  >
                     Sign up
                  </button>
               )}

               {/* <!-- create account card --> */}
               <div id="create-account-card ">
                  {this.state.isDisplayingInputs && (
                     <>
                        <p className="text-primary mt-2 mb-5">
                           Collaboration starts here.
                        </p>
                        <div className="form-group">
                           <label
                              htmlFor="signup-email-input"
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
                              id="signup-email-input"
                           />
                           {this.state.hasEmailError && (
                              <p
                                 className="text-danger"
                                 id="signup-email-error"
                              >
                                 {this.state.emailError}
                              </p>
                           )}
                        </div>
                        <div className="form-group">
                           <label
                              htmlFor="signup-password-input"
                              className="text-muted lead"
                           >
                              Create a password
                           </label>
                           <p className="text-muted mt-n2">
                              Must be at least 9 characters.
                           </p>
                           <input
                              type="password"
                              className={classnames({
                                 "form-control": true,
                                 "mb-2": true,
                                 "is-invalid": this.state.hasPasswordError,
                              })}
                              id="signup-password-input"
                           />

                           {this.state.hasPasswordError && (
                              <p
                                 className="text-danger"
                                 id="signup-password-error"
                              >
                                 {this.state.passwordError}
                              </p>
                           )}
                        </div>

                        <button
                           className="float-right btn btn-primary btn-lg"
                           id="lets-go"
                           style={{ width: "100%" }}
                           onClick={() => {
                              this.validateAndCreateUser();
                           }}
                        >
                           Let's go!
                        </button>
                     </>
                  )}
               </div>
            </div>
         </div>
      );
   }
}
function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(SignUp));
