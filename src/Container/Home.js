import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../Component/Header";
import NavBar from "../Component/NavBar";
import ArrayUsers from "../Component/ArrayUsers";
import Filter from "../Component/Filter";
import StatusSelector from "../Component/StatusSelector";
import axios from "axios";

class Home extends Component {
  state = {
    arrayUsers: null,
    filteredArray: null,
    filterName: "",

    filterStatus: "All"
  };

  handleListUsersDisplay = async () => {
    try {
      const response = await axios.get(
        "https://skilters-server-technical-test.herokuapp.com/user/readUsers",
        {
          headers: { authorization: "Bearer " + this.props.token }
        }
      );

      this.setState({
        arrayUsers: response.data,
        filteredArray: response.data
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount = async () => {
    this.props.checkTokenValidity();
  };

  handleChangeFilter = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      const filteredArray = this.state.arrayUsers.filter(user => {
        //status filter

        let statusExpression = true;
        if (this.state.filterStatus !== "All") {
          statusExpression = user.public.status === this.state.filterStatus;
        }
        //name filter
        const regEx = new RegExp(this.state.filterName, "i");
        return (
          (user.public.lastName.search(regEx) > -1 ||
            user.public.firstName.search(regEx) > -1) &&
          statusExpression
        );
      });

      this.setState({ filteredArray: filteredArray });
    });
  };

  handleSortedName = column => {
    const { filteredArray } = this.state;

    filteredArray.sort((a, b) => {
      const nameA = a.public[column];
      const nameB = b.public[column];
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    this.setState({ filteredArray: filteredArray });
  };

  render() {
    if (this.props.isTokenValid) {
      return (
        <div>
          {" "}
          <Header
            lastName={this.props.lastName}
            firstName={this.props.firstName}
          />{" "}
          <div className="main-page-container">
            <NavBar
              handleListUsersDisplay={this.handleListUsersDisplay}
              removeToken={this.props.removeToken}
            />
            <div className="result-container">
              {this.state.filteredArray && (
                <>
                  <Filter
                    handleChangeFilter={this.handleChangeFilter}
                    filterName={this.state.filterName}
                  />
                  <StatusSelector
                    filterSatus={this.state.filterSatus}
                    handleChangeFilter={this.handleChangeFilter}
                  />
                </>
              )}

              <ArrayUsers
                arrayUsers={this.state.filteredArray}
                handleSortedName={this.handleSortedName}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default Home;
