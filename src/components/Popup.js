import React from "react";
import axios from "axios";
import { Button, Modal, Form } from "semantic-ui-react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { API_URL } from "../API/API";

export default class Popup extends React.Component {
  state = { open: false, editedContent: this.props.content };

  //Popup configuration and helpers
  closeConfigShow = (closeOnEscape, closeOnDimmerClick) => () => {
    this.setState({ closeOnEscape, closeOnDimmerClick, open: true });
  };
  close = () => this.setState({ open: false });

  //Handle editing
  handleSaveButton = async () => {
    const editedNote = {
      content: this.state.editedContent
    };
    await axios.patch(API_URL + this.props.id, editedNote);
    this.props.stateEditor();
    this.close();
  };

  render() {
    const { open, closeOnEscape, closeOnDimmerClick } = this.state;
    return (
      <div>
        <Button
          className="tiny ui teal basic button right floated "
          onClick={this.closeConfigShow(false, true)}
        >
          <i className="icon edit"></i>Edit
        </Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Edit Your note</Modal.Header>
          <Modal.Content style={{ padding: 50 }}>
            <Form>
              <CKEditor
                editor={ClassicEditor}
                data={this.props.content}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({
                    editedContent: data.slice(3, data.length - 4)
                  });
                }}
              />
            </Form>
          </Modal.Content>
          <Modal.Actions style={{ paddingBottom: 40 }}>
            <Button
              className="tiny ui teal basic button right floated save"
              onClick={this.handleSaveButton}
              positive
            >
              <i className="icon save outline"></i>Save
            </Button>
            <Button
              onClick={this.close}
              negative
              className="tiny ui teal basic button right floated "
            >
              <i className="icon arrow left"></i>Discard
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
