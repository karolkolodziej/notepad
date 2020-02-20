import React from "react";
import axios from "axios";

import { API_URL } from "../API/API";
import "./AddNote.scss";

export default class AddNote extends React.Component {
  state = { note: "" };

  handleInpputChange = event => {
    this.setState({ note: event.target.value });
  };

  handleAddButton = async event => {
    //Prevent saving empty string
    if (this.state.note !== "") {
      await axios.post(API_URL, { content: this.state.note });
      window.location.reload(false);
      //Reset input
      document.querySelector("#content").value = "";
    }
  };

  render() {
    return (
      <div className="AddNote">
        <form className="ui reply form">
          <div className="field">
            <textarea
              id="content"
              onChange={this.handleInpputChange}
            ></textarea>
          </div>
          <div
            className="ui blue basic button right floated "
            onClick={this.handleAddButton}
          >
            <i className="icon plus "></i>Add Note
          </div>
        </form>
      </div>
    );
  }
}
