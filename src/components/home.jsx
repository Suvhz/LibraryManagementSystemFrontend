import React,{Component} from "react";
import hoc from '../hoc/redirect';
import {Link} from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookIssues: [],
      error: ""
    };
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-5">Welcome to the Library Management System</h1>
          {this.props.auth.isAuthenticated()?<div className="d-flex justify-content-center mt-5"><h4 className="text-success mt-1"><em> Back to </em></h4>
              <Link to="/book">
                  <button className="btn btn-outline-info rounded-0  shadow ml-3">Dashboard</button></Link></div>:
        <h4 className="text-center text-danger mt-4">You are not logged in! Please login </h4>
          }
      </div>
    );
  }
}
export default hoc(Home);
