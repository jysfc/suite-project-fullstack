import React from "react";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import { EMAIL_REGEX } from "../../utils/helpers";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

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

   async setEmailState(signupEmailInput) {
      const lowerCaseSignupEmailInput = signupEmailInput.toLowerCase();
      if (signupEmailInput === "")
         this.setState({
            emailError: "Please enter your email address.",
            hasEmailError: true,
         });
      else if (EMAIL_REGEX.test(lowerCaseSignupEmailInput) === false) {
         console.log(signupEmailInput);
         this.setState({
            emailError: "Please enter a valid email address.",
            hasEmailError: true,
         });
      } else {
         this.setState({ emailError: "", hasEmailError: false });
      }
   }

   checkHasLocalPart(signupPasswordInput, signupEmailInput) {
      const localPart = signupEmailInput.split("@")[0];
      if (localPart === "") return false;
      else if (localPart.length < 4) return false;
      else return signupPasswordInput.includes(localPart);
   }

   async setPasswordState(signupPasswordInput, signupEmailInput) {
      console.log(signupPasswordInput);

      const uniqChars = [...new Set(signupPasswordInput)];

      if (signupPasswordInput === "") {
         this.setState({
            passwordError: "Please create a password.",
            hasPasswordError: true,
         });
      } else if (signupPasswordInput.length < 9) {
         this.setState({
            passwordError: "Your password must be at least 9 characters.",
            hasPasswordError: true,
         });
      } else if (
         this.checkHasLocalPart(signupPasswordInput, signupEmailInput)
      ) {
         this.setState({
            passwordError:
               "For your safety, your password cannot contain your email address.",
            hasPasswordError: true,
         });
      } else if (uniqChars.length < 3) {
         this.setState({
            passwordError:
               "For your safety, your password must contain at least 3 unique characters.",
            hasPasswordError: true,
         });
      } else {
         this.setState({ passwordError: "", hasPasswordError: false });
      }
   }

   async validateAndCreateUser() {
      const signupEmailInput = document.getElementById("signup-email-input")
         .value;
      const signupPasswordInput = document.getElementById(
         "signup-password-input"
      ).value;
      await this.setEmailState(signupEmailInput);
      await this.setPasswordState(signupPasswordInput, signupEmailInput);
      if (
         this.state.hasEmailError === false &&
         this.state.hasPasswordError === false
      ) {
         // Create user obj
         const user = {
            id: getUuid(),
            email: signupEmailInput,
            password: signupPasswordInput,
            createdAt: Date.now(),
            isActive: Boolean(true),
         };
         console.log("created user object for POST: ", user);
         // post to API
         axios
            .post("/api/v1/users", user)
            .then((res) => {
               console.log(res);
               // Update currentUser in global state with API response
               // Go to next page: this.props.history.push("/select-property");
            })
            .catch((err) => {
               console.log(err.response.data);
            });
      }
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
