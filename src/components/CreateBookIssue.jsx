import React from "react";
import { Form, FormGroup, Label, Col } from "reactstrap";
import axios from "../Utils/axios";
import history from "../components/history";
import {
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Redirect from "../hoc/redirect";
class CreateBookIssue extends React.Component {
  state = {
    books: [],
    users: [],
    user: 0,
    book: 0,
    selectedUser: "Select the user",
    selectedBook: "Select the book"
  };

  handleUserChange = event => {
    this.setState({ user: event.target.value });
    let selectedUser = this.state.users.find(
      obj => obj.id == event.target.value
    );
    this.setState({
      selectedUser: selectedUser.firstName + " " + selectedUser.lastName
    });
  };
  handleBookChange = event => {
    this.setState({ book: event.target.value });
    let selectedBook = this.state.books.find(
      obj => obj.id == event.target.value
    );
    this.setState({ selectedBook: selectedBook.name });
  };
  handleSubmit = event => {
    event.preventDefault();
    const bookIssue = {
      user: this.state.users.find(obj => obj.id == this.state.user),
      book: this.state.books.find(obj => obj.id == this.state.book)
    };
    axios({
      method: "post",
      url: "/bookIssue",
      data: bookIssue,
       headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}
  })
      .then(() => {
        history.replace("/bookIssue");
      })
      .catch(error => {

        console.log(error);
      });
  };
  componentDidMount() {
    this.getUserList();
    this.getBookList();
  }
  getUserList = () => {
    let users;
    axios.get("/user", { headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}}).then(data => {
      users = data.data;
      this.setState({
        users: users
      });
    });
  };
  getBookList = () => {
    let books;
    axios.get("/book", { headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}}).then(data => {
      console.log(data);
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
                  <DropdownMenu onClick={this.handleBookChange}>
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
export default Redirect(CreateBookIssue);
