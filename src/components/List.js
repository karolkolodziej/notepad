import React from "react";
import axios from "axios";
import Popup from "./Popup";

import { API_URL } from "../API/API";
import "./List.scss";

export default class List extends React.Component {
  state = { notes: [] };

  //Fetch data from API
  componentDidMount = async () => {
    const response = await axios.get(API_URL);
    this.setState({ notes: response.data });
  };

  //Preformatted text- helper
  createMarkup = text => {
    return { __html: text };
  };

  renderList() {
    if (this.state.notes.length !== 0) {
      return this.state.notes.map(note => {
        return (
          <div className=" item" key={note._id}>
            <div className="content">
              <div dangerouslySetInnerHTML={this.createMarkup(note.content)} />
              <Popup content={note.content} id={note._id} />
              <div
                className="tiny ui red basic button right floated remove "
                onClick={() => {
                  const id = note._id;
                  axios.delete(API_URL + id);
                  window.location.reload(false);
                }}
              >
                <i className="icon trash"></i>Delete
              </div>
            </div>
          </div>
        );
      });
    } else {
      return <div className="content">Add Your note</div>;
    }
  }

  render() {
    return (
      <div className="List ui  segment">
        <div className="ui relaxed divided list">{this.renderList()}</div>
      </div>
    );
  }
}
