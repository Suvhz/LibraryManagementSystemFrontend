import React from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import axios from "../Utils/axios";
import history from "../components/history";
import RedirectToHoc from "../hoc/redirect";
class PostFormOfBook extends React.Component {
  constructor(props){
    super(props);
      this.state = {
          name: "",
          quantity: 0,
          location: "",
          description: "",
          isbn: "",
          publisher: "",
          author: "",
          error: [],
          hasError: false
      };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };
  handleSubmit = event => {
    event.preventDefault();
    const book = {
      name: this.state.name,
      quantity: this.state.quantity,
      location: this.state.location,
      description: this.state.description,
      isbn: this.state.isbn,
      publisher: this.state.publisher,
      author: this.state.author
    };
    axios
      .post("/book", book, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(res => {
        console.log(res);
        history.replace("/book");
      })
      .catch(error => {
        this.setState({hasError: true, error: error.response.data});
        console.log("error in book post" + JSON.stringify(error.response.data.detail));
        /* this.setState({error: error.response.data.detail});*/
      });
  };

  render() {
    return (
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <Form
            onSubmit={this.handleSubmit}
            className="my-4 border border-light p-5 shadow-lg form-background"
          >
            <h2 className="text-center mb-5">NEW BOOK FORM</h2>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                <h5>Name: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  id="exampleEmail"
                  placeholder="Book Name"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.name}</em></p>:null}
              </Col>

            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                <h5>Location: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="location"
                  id="examplePassword"
                  placeholder="Book location in library"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.location}</em></p>:null}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                <h5>ISBN no: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="isbn"
                  id="examplePassword"
                  placeholder="Book ISBN"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.isbn}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                <h5>Quantity: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="quantity"
                  id="examplePassword"
                  placeholder="Book quantity"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.quantity}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                <h5>Publisher: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="publisher"
                  id="examplePassword"
                  placeholder="Book publisher"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.publisher}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                <h5>Author: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="author"
                  id="examplePassword"
                  placeholder="Book author"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.author}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={2}>
                <h5>Description: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  name="description"
                  id="exampleText"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.description}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <button className="btn btn-outline-success btn-md rounded-0 mx-auto px-5 shadow">
                <h2>SAVE</h2>
              </button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
export default RedirectToHoc(PostFormOfBook);
