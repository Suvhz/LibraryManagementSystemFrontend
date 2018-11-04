import React from "react";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import axios from "../Utils/axios";
import history from "../components/history";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Redirect from "../hoc/redirect";

class UpdateBookIssue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookIssue: [],
      books: [],
      users: [],
      user: [],
      book: [],
      selectedUser: "Select the user",
      selectedBook: "Select the book",
      radioButton: false
    };
  }

  handleUserChange = event => {
    let selectedUser = this.state.users.find(
      obj => obj.id == event.target.value
    );
    this.setState({
      selectedUser: selectedUser.firstName + " " + selectedUser.lastName,
      user: selectedUser
    });
  };
  handleRadioButton = event => {
    this.setState({
      radioButton: event.target.value
    });
  };
  handleBookChange = event => {
    let selectedBook = this.state.books.find(
      obj => obj.id == event.target.value
    );
    this.setState({
      book: selectedBook,
      selectedBook: selectedBook.name
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const bookIssue = {
      id: this.state.bookIssue.id,
      book: this.state.book,
      user: this.state.user,
      status: this.state.radioButton
    };

    axios({
      method: "put",
      url: "/bookIssue",
      data: bookIssue,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
      }
    })
      .then(() => {
        history.replace("/bookIssue");
      })
      .catch(error => {
        /* this.setState({error: error.response.data.detail});*/
        console.log(error);
      });
  };
  componentDidMount() {
    this.getUserList();
    this.getBookList();
    const id = this.props.match.params.id;
    axios
      .get("/bookIssue/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(data => {
        this.setState({
          bookIssue: data.data,
          user: data.data.user,
          book: data.data.book,
          selectedBook: data.data.book.name,
          selectedUser:
            data.data.user.firstName + " " + data.data.user.lastName,
          radioButton: data.data.status
        });
      });
  }
  getUserList = () => {
    let users;
    axios
      .get("/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(data => {
        users = data.data;
        this.setState({
          users: users
        });
      });
  };
  getBookList = () => {
    let books;
    axios
      .get("/book", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(data => {
        books = data.data;
        this.setState({
          books: books
        });
      });
  };
  render() {
    return (
      <div className="container">
        <div className="col-md-10 offset-md-1">
          <Form
            onSubmit={this.handleSubmit}
            className="my-4 border border-light p-5 shadow-lg form-background w-75 mx-auto"
          >
            <h2 className="text-center mb-5">BOOK ISSUE</h2>
            <FormGroup row>
              <Label for="firstName" sm={4} className="text-center">
                <h5>Book: </h5>
              </Label>
              <Col sm={4}>
                <UncontrolledButtonDropdown>
                  <DropdownToggle caret>
                    {this.state.selectedBook}
                  </DropdownToggle>
                  <DropdownMenu
                    onClick={this.handleBookChange}
                    value={this.state.bookIssue.book}
                  >
                    {this.state.books.map((book, key) => (
                      <DropdownItem key={key} value={book.id}>
                        {book.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="User" sm={4} className="text-center">
                <h5>User: </h5>
              </Label>
              <Col sm={4}>
                <UncontrolledButtonDropdown>
                  <DropdownToggle caret>
                    {this.state.selectedUser}
                  </DropdownToggle>
                  <DropdownMenu onClick={this.handleUserChange}>
                    {this.state.users.map((user, key) => (
                      <DropdownItem key={key} value={user.id}>
                        {user.firstName} {user.lastName}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </Col>
            </FormGroup>
            <FormGroup tag="fieldset" row>
              <div className="row">
                <div className="col-md-4">
                  <legend>
                    <h5 className="pl-4">Book Issue: </h5>
                  </legend>
                </div>
                <div className="col-md-3">
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        value={true}
                        defaultChecked={this.state.bookIssue.status}
                        onChange={this.handleRadioButton}
                      />{" "}
                      <h6>Return</h6>
                    </Label>
                  </FormGroup>
                </div>
                <div className="col-md-3">
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        value={false}
                        defaultChecked={!this.state.bookIssue.status}
                        onChange={this.handleRadioButton}
                      />
                      <h6> Not Return</h6>
                    </Label>
                  </FormGroup>
                </div>
              </div>
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
export default Redirect(UpdateBookIssue);
