import React from "react";
import { Table } from "reactstrap";
import axios from "../Utils/axios";
import "font-awesome/css/font-awesome.css";
import ConfirmBox from "../components/ConfirmBox";
import { Link } from "react-router-dom";
import Redirect from "../hoc/redirect";
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookIssues: [],
      error: ""
    };
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    this.getBookIssueList();
  }
  getBookIssueList = () => {
    let bookIssue;
    axios
      .get("/bookIssue", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(data => {
        bookIssue = data.data;
        this.setState({
          bookIssues: bookIssue
        });
      });
  };

  delete(id) {
    axios
      .delete("/bookIssue/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(() => {
        this.getBookIssueList();
      });
  }

  render() {
    return (
      <div className="container text-center">
        <Link to="/bookIssue/create">
          <button className="btn btn-outline-info rounded-0 my-3 shadow float-left">
            Add Book Issue
          </button>
        </Link>
        <div>
          {this.state.error ? (
            <h4 className="text-danger text-center">{this.state.error}</h4>
          ) : (
            <Table bordered className="table-hover my-3">
              <thead>
                <tr className="table-info">
                  <th>Sno</th>
                  <th>Book </th>
                  <th>ISBN</th>
                  <th>User </th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.bookIssues.map(bookIssue => (
                  <tr key={bookIssue.id}>
                    <th scope="row" key={bookIssue.id}>
                      {bookIssue.id}
                    </th>
                    <td>{bookIssue.book.name}</td>
                    <td>{bookIssue.book.isbn}</td>
                    <td>
                      {bookIssue.user.firstName} {bookIssue.user.lastName}
                    </td>
                    <td>
                      <Link
                        to={`/bookIssue/update/${bookIssue.id}`}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-edit" />
                      </Link>
                    </td>
                    <td>
                      <ConfirmBox id={bookIssue.id} delete={this.delete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    );
  }
}
export default Redirect(UserList);
