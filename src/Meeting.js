import React, { Component } from "react";
import {Spin} from 'antd'
import { Redirect, withRouter } from "react-router-dom";

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      redirect: false,
      loaded: false,
    };
  }

  componentDidMount() {
    fetch(`https://when2meet-clone.firebaseio.com/${this.state.id}.json`, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (!data) {
          //this.props.history.push('/');
          this.setState({
            redirect: true
          })
        } else {
          this.setState((prevState) => {
            return {
              ...data,
              loaded: true,
            };
          });
          console.log(this.state);
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    else if (!this.state.loaded) {
      return <Spin size="large"/>
    }

    return (
      <div>
        <h1>Meeting ID {this.state.id} </h1>
      </div>
    );
  }
}
export default withRouter(Meeting)