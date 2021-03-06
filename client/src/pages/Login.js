import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // Clear form values on submit
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h1 className="login-header">Login</h1>
      <div className="loginForm">
        <div className="justify-content-md-center padding-login">
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/">back to the homepage.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
             
                <label column sm={4}>Email</label>
                
                  <input name="email" type="email" placeholder="Enter email" value={formState.email}
                    onChange={handleChange} />
                
                <label column sm={4}>Password</label>
               
                  <input name="password" type="password" placeholder="Password" value={formState.password}
                    onChange={handleChange} />
                
          
        
                  <button type="submit" className="button6">Sign in</button>
           
            </form>
          )}
          {error && (
            <div className="my-3 p-3 text-white">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Login;
