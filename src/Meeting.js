import React, { Component } from "react";
import { Spin, Skeleton, Typography, Divider } from "antd";
import { Redirect, withRouter } from "react-router-dom";
import ScheduleSelector from "react-schedule-selector";

const { Paragraph } = Typography;

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      // If meeting ID is incorrect or expired, redirect
      redirect: false,
      loaded: false,
    };
  }

  componentDidMount() {
    fetch(`https://when2meet-clone.firebaseio.com/${this.state.id}.json`, {
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        // Incorrect meeting id
        if (!data) {
          this.setState({
            redirect: true,
          });
        } else {
          this.setState({
            ...data,
            loaded: true,
          });
          console.log(this.state);
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (!this.state.loaded) {
      return (
        <div>
          <Spin size="large" />
          <Skeleton active />
        </div>
      );
    }

    return (
      <div>
        <h1>Meeting ID {this.state.id} </h1>
        <Paragraph copyable={{ text: window.location.href }}>
          Copy Meeting Link
        </Paragraph>
        <Divider />
      </div>
    );
  }
}
export default withRouter(Meeting);
