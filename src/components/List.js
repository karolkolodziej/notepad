import React from "react";
import Popup from "./Popup";

import { API_URL } from "../API/API";
import { getDataFromServer } from "../clients/clients";
import { deleteNote } from "../clients/clients";
import AddNote from "./AddNote";
import "./List.scss";

export default class List extends React.Component {
  state = { notes: [] };

  //Fetch data from API
  componentDidMount = async () => {
    await this.setState({ notes: await getDataFromServer() });
  };

  //Preformatted text- helper
  createMarkup = text => {
    return { __html: text };
  };

  //Rerender list after editing
  stateEditor = async () => {
    await this.setState({ notes: await getDataFromServer() });
  };

  renderList() {
    return this.state.notes.map(note => {
      return (
        <div key={note._id} className="List ui  segment">
          <div className="ui relaxed divided list">
            <div className=" item" key={note._id}>
              <div className="content">
                <div
                  dangerouslySetInnerHTML={this.createMarkup(note.content)}
                />
                <Popup
                  content={note.content}
                  id={note._id}
                  stateEditor={this.stateEditor}
                />
                <div
                  className="tiny ui red basic button right floated remove "
                  onClick={async () => {
                    const param = API_URL + note._id;
                    deleteNote(param);
                    this.setState({ notes: await getDataFromServer() });
                  }}
                >
                  <i className="icon trash"></i>Delete
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <AddNote stateEditor={this.stateEditor} />
        {this.renderList()}
      </div>
    );
  }
}
