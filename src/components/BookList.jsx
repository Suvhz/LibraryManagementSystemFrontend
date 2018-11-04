import React from "react";
import { Table } from "reactstrap";
import axios from "../Utils/axios";
import "font-awesome/css/font-awesome.css";
import ConfirmBox from "../components/ConfirmBox";
import {Link} from "react-router-dom";
import Redirect from "../hoc/redirect"
class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
        error:''
    };
    this.delete = this.delete.bind(this);
  }
  componentDidMount() {
      const search = this.props.match.params.search;
      const keyword = this.props.match.params.keyword;
      if ((search && keyword) == null) {
          this.getBookList();
      } else {
          this.checkSearchType(search,keyword)
      }
  }
  checkSearchType=(search, keyword)=>{
    if(search==="ISBN"){
      this.searchByIsbn(keyword);
    }else{
      this.searchByBookName(keyword);
    }
  };
  getBookList = () => {
    let book=[];
    axios.get("/book", { headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}} ).then(data => {
      console.log(data);
      book = data.data;
        this.setState({
            books: book
        });
      console.log(this.state.books);
    });

  };
  searchByBookName = ( keyword) => {
    console.log(keyword);
      let book=[];
      axios.get( "/book/name/" + keyword ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}} ).then(res => {
              book =[res.data];
          this.setState({books: book});
          }
      ).catch(error=>{
          console.log(JSON.stringify(error.response.data.errorMessage));
          this.setState({error:JSON.stringify(error.response.data.errorMessage)})
      });

  };
    searchByIsbn = ( keyword) => {
        console.log(keyword);
        let book;
        axios.get( "/book/isbn/" + keyword , { headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}} ).then(res => {
                book =[res.data];
                console.log(book);
                this.setState({books: book});
            }
        ).catch(error=>{
            console.log(JSON.stringify(error.response.data.errorMessage));
            this.setState({error:JSON.stringify(error.response.data.errorMessage)})
        });
    };


    delete(id) {
    axios.delete("/book/" + id, { headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}}).then(() => {
      this.getBookList();
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Link to="/book/create">
          <button className="btn btn-outline-info rounded-0 mt-2 shadow">
            Add Book
          </button>
        </Link>
          <Link to="/user">
              <button className="btn btn-outline-info rounded-0 mt-2 shadow ml-2">
                 User list
              </button>
          </Link>

          <Link to="/bookIssue">
              <button className="btn btn-outline-info rounded-0 mt-2 shadow ml-2">
                 Book Issue List
              </button>
          </Link>
          <div>{(this.state.error)?<h4 className="text-danger text-center">{this.state.error}</h4>:
              <Table bordered className="table-hover my-3">
                  <thead>
                  <tr className="table-info">
                      <th>Sno</th>
                      <th>Name</th>
                      <th>ISBN</th>
                      <th>Author</th>
                      <th>Publisher</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Location</th>
                      <th>Delete</th>
                      <th>Edit</th>
                  </tr>
                  </thead>
                  <tbody>
                  {this.state.books.map(book => (
                      <tr key={book.id}>
                          <th scope="row" key={book.id}>
                              {book.id}
                          </th>
                          <td>{book.name}</td>
                          <td>{book.isbn}</td>
                          <td>{book.author}</td>
                          <td>{book.publisher}</td>
                          <td>{book.description}</td>
                          <td>{book.quantity}</td>
                          <td>{book.location}</td>
                          <td>
                              <ConfirmBox id={book.id} delete={this.delete} />
                          </td>
                          <td>
                              <Link to={`/book/update/${book.id}`} className="btn btn-primary">
                                  <i className="fas fa-edit" />
                              </Link>
                          </td>
                      </tr>
                  ))}
                  </tbody>

              </Table>
          }</div>

      </div>
    );
  }
}
export default Redirect(BookList);
