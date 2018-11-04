import React, { Component } from "react";
import {Router,Switch, Route } from "react-router-dom";
import PostFormOfBook from "./components/PostFormOfBook";
import "./App.css";
import BookList from "./components/BookList";
import UserDetail from "./components/UserDetail";
import UpdateBook from "./components/UpdateBook";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import CreateBookIssue from "./components/CreateBookIssue";
import BookIssueList from "./components/BookIssueList";
import UpdateBookIssue from "./components/UpdateBookIssue";
import Home from "./components/home";
import Callback from "./components/Callback";
import CustomNavbar from "./components/CustomNavbar";
import history from "./components/history"
class App extends Component {
  render() {
    return (
        <Router history={history}>
          <div>
            <CustomNavbar/>
      <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/book" component={BookList} exact />
          <Route path="/user/update/:id" component={EditUser} exact/>
          <Route path="/book/search/:search/:keyword" component={BookList} exact />
          <Route path="/book/create" component={PostFormOfBook} exact />
          <Route path="/book/update/:id" component={UpdateBook} exact/>
          <Route path="/user" component={UserList} exact />
          <Route path="/user/create" component={UserDetail} />
          <Route path="/bookIssue" component={BookIssueList} exact />
          <Route path="/bookIssue/create" component={CreateBookIssue} />
          <Route path="/bookIssue/update/:id" component={UpdateBookIssue} />
          <Route path="/callback" component={Callback} />

      </Switch>
          </div>
        </Router>
    );
  }
}
export default App;
