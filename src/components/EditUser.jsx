import React from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import axios from "../Utils/axios";
import history from "../components/history";
import Redirect from "../hoc/redirect";

class UpdateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: [],
      user: [],
      hasError: false
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };
  handleSubmit = event => {
    event.preventDefault();
    const user = {
      id: this.state.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    axios({
      method: "put",
      url: "/user",
      data: user,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(res => {
        console.log(res);
        history.replace("/user");
      })
      .catch(error => {
        this.setState({ hasError: true, error: error.response.data });
      });
  };
  componentDidMount() {
      const id = this.props.match.params.id;
    axios.get("/user/" + id,{headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }}).then(res => {
      this.setState({
        id: res.data.id,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        email: res.data.email,
        password: res.data.email
      });
    })
        .catch(error=>{
            console.log("editUser"+error.response.data)
        })
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <Form
            onSubmit={this.handleSubmit}
            className="my-4 border border-light p-5 shadow-lg form-background"
          >
            <h2 className="text-center mb-5">UPDATE BOOK FORM</h2>
            <FormGroup row>
              <Label for="exampleEmail" sm={2}>
                <h5>First name: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="firstName"
                  id="example1"
                  placeholder="Enter first name."
                  defaultValue={this.state.firstName}
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.firstName}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplePassword" sm={2}>
                <h5>Last name: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="lastName"
                  defaultValue={this.state.lastName}
                  id="example2"
                  placeholder="Enter last name"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.lastName}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>
                <h5>Email: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="email"
                  id="examplePassword"
                  defaultValue={this.state.email}
                  placeholder="Enter your email"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.email}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={2}>
                <h5>Password: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="password"
                  name="password"
                  id="example3"
                  defaultValue={this.state.password}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.password}</em></p>:null}
              </Col>
            </FormGroup>
            <FormGroup row>
              <button className="btn btn-outline-success btn-md rounded-0 mx-auto px-5 shadow">
                <h2>UPDATE</h2>
              </button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}
export default Redirect(UpdateBook);
