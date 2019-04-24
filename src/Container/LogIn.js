import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "../Component/Input";
import axios from "axios";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    isEmailFormatValid: true,
    isPasswordValid: true,
    isEmailValid: true,
    isPasswordLong: true
  };

  handleError = error => {
    if (error.response.status) {
      if (error.response.status === 400) {
        const newState = {
          isEmailFormatValid: true,
          isPasswordValid: true,
          isEmailValid: true,
          isPasswordLong: true
        };
        if (error.response.data.message.includes("Wrong email format")) {
          newState.isEmailFormatValid = false;
        }
        if (error.response.data.message.includes("Wrong password")) {
          newState.isPasswordValid = false;
        }
        if (error.response.data.message.includes("Wrong email")) {
          newState.isEmailValid = false;
        }
        if (
          error.response.data.message.includes(
            "Your password should be at least 6 characters long"
          )
        ) {
          newState.isPasswordLong = false;
        }

        this.setState({
          isEmailFormatValid: newState.isEmailFormatValid,
          isPasswordValid: newState.isPasswordValid,
          isEmailValid: newState.isEmailValid,
          isPasswordLong: newState.isPasswordLong
        });
      } else {
        console.log(error.message);
      }
    }
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClick = async event => {
    event.preventDefault();

    await this.setState({
      isEmailFormatValid: true,
      isPasswordValid: true,
      isEmailValid: true
    });

    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: this.state.email,
        password: this.state.password
      });

      const { token, firstName, lastName } = response.data.user;
      this.props.registerToken(token, firstName, lastName);
    } catch (error) {
      this.handleError(error);
    }
  };

  handleWrongInput = () => {
    let wrongInput = "";

    if (!this.state.isEmailFormatValid) {
      wrongInput += "Le format du mail est incorrect. Vérifiez et Réessayez.\n";
    }

    if (!this.state.isEmailValid) {
      wrongInput +=
        "Cette adresse mail n'existe pas dans la base de données.\n";
    }

    if (!this.state.isPasswordValid) {
      wrongInput += "Le mot de passe est incorrect. Vérifiez et Réessayez.\n";
    }

    if (!this.state.isPasswordLong) {
      wrongInput +=
        "Le mot de passe entré est trop court (min. 6 caractères).\n";
    }

    return <div className="log-in-error">{wrongInput}</div>;
  };

  render() {
    if (!this.props.isTokenValid) {
      return (
        <div className="log-in-form-container">
          <form className="log-in-form">
            <div className="log-in-form-title">Page de connexion</div>
            <Input
              name="email"
              value={this.state.email}
              handleChange={this.handleChange}
              nameFrench="Email"
            />
            <Input
              name="password"
              value={this.state.password}
              handleChange={this.handleChange}
              nameFrench="Mot de passe"
            />
            <button onClick={this.handleClick}>Connexion</button>
            {this.handleWrongInput()}
          </form>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default LogIn;
