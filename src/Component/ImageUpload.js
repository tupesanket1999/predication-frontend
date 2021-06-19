import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

export default class ImageUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      previewImage: null,
      predict: null,
    };
  }
  onFileChange = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
    });
  };
  onFileUpload = () => {
    console.log(this.state.selectedFile);
    const formData = new FormData();
    formData.append("imagefile", this.state.selectedFile);
    axios.post("http://localhost:5000/", formData).then((res) => {
      console.log(res);
      this.setState({ predict: res.data });
    });
  };

  render() {
    return (
      <div>
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Upload
              </span>
            </div>
            <div className="custom-file">
              <input
                type="file"
                onChange={this.onFileChange}
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {this.state.selectedFile ? (
                  <div> Name : {this.state.selectedFile.name}</div>
                ) : (
                  <div>Choose file</div>
                )}
              </label>
            </div>
          </div>
        </div>
        {this.state.previewImage ? (
          <div>
            <img src={this.state.previewImage} style={{ width: "500px" }} />
          </div>
        ) : (
          <div></div>
        )}
        <Button variant="primary" onClick={this.onFileUpload}>
          Get prediction
        </Button>{" "}
        <h1>{this.state.predict}</h1>
      </div>
    );
  }
}
