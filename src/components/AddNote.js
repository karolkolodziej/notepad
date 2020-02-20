import React from "react";

import { saveNote } from "../clients/clients";
import "./AddNote.scss";

export default class AddNote extends React.Component {
  state = { note: "" };

  handleInpputChange = event => {
    this.setState({ note: event.target.value });
  };

  handleAddButton = () => {
    //Prevent saving empty string
    if (!this.state.note !== "") {
      const note = { content: this.state.note };
      saveNote(note);
      this.props.stateEditor();

      //Reset input
      this.setState({ note: "" });
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
              value={this.state.note}
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
