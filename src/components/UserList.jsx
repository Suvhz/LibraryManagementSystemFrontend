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
      users: [],
      error: ""
    };
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
    this.getUserList();
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
        console.log(data);
        users = data.data;
        this.setState({
          users: users
        });
        console.log(this.state.books);
      });
  };

  delete(id) {
    axios
      .delete("/user/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      .then(() => {
        this.getUserList();
      });
  }

  render() {
    return (
      <div className="container text-center">
        <Link to="/user/create">
          <button className="btn btn-outline-info rounded-0 my-3 shadow float-left">
            Add User
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
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user => (
                  <tr key={user.id}>
                    <th scope="row" key={user.id}>
                      {user.id}
                    </th>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link
                        to={`/user/update/${user.id}`}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-edit" />
                      </Link>
                    </td>
                    <td>
                      <ConfirmBox id={user.id} delete={this.delete} />
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
