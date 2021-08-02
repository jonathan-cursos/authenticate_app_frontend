import React, { Component } from "react";
import axios from "axios";

class Google extends Component {
  async componentDidMount() {
    await axios.get(
      "https://authenticate-app-j.herokuapp.com/api/user/auth/google"
    );
  }

  render() {
    return <h1>Start auth with google</h1>;
  }
}

export default Google;
