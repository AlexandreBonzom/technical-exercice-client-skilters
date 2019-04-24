import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cookie from "js-cookie";
import "./App.css";
import Home from "./Container/Home";
import LogIn from "./Container/LogIn";
import axios from "axios";

class App extends Component {
  state = {
    token: Cookie.get("token"),
    isTokenValid: Cookie.get("isTokenValid"),
    firstName: Cookie.get("firstName"),
    lastName: Cookie.get("lastName")
  };

  registerToken = (token, firstName, lastName) => {
    Cookie.set("token", token);
    Cookie.set("firstName", firstName);
    Cookie.set("lastName", lastName);
    Cookie.set("isTokenValid", true);
    this.setState({
      token: Cookie.get("token"),
      isTokenValid: Cookie.get("isTokenValid"),
      firstName: Cookie.get("firstName"),
      lastName: Cookie.get("lastName")
    });
  };

  removeToken = () => {
    Cookie.remove("token");
    Cookie.remove("firstName");
    Cookie.remove("lastName");
    Cookie.remove("isTokenValid");
    this.setState({
      token: null,
      isTokenValid: null,
      firstName: null,
      lastName: null
    });
  };

  checkTokenValidity = async () => {
    const token = this.state.token;

    try {
      const response = await axios.get("http://localhost:3000/user/readToken", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.token) {
        Cookie.set("isTokenValid", true);
        this.setState({ isTokenValid: Cookie.get("isTokenValid") });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount = async () => {
    this.checkTokenValidity();
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Home
                  {...props}
                  isTokenValid={this.state.isTokenValid}
                  removeToken={this.removeToken}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  token={this.state.token}
                  checkTokenValidity={this.checkTokenValidity}
                />
              )}
            />
            <Route
              path="/login"
              exact
              render={props => (
                <LogIn
                  {...props}
                  isTokenValid={this.state.isTokenValid}
                  registerToken={this.registerToken}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
