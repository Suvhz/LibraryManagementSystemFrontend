import React,{Component} from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import axios from "../Utils/axios";
import history from "../components/history"
import Redirect from "../hoc/redirect";

class UpdateBook extends Component {
    constructor (props){
        super(props);
        this.state = {
            id:0,
            name: "",
            quantity: 0,
            location: "",
            description: "",
            isbn: "",
            publisher: "",
            author: "",
            error: [],
            book:[],
            hasError:false
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`/book/${id}`, { headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}} )
            .then(res => {
                this.setState({book:res.data});
                this.setState({id: res.data.id, name: res.data.name, quantity:res.data.quantity,
                    location:res.data.location, description: res.data.description, isbn: res.data.isbn,
                    publisher: res.data.publisher, author: res.data.author})

            })
            .catch(res=>{
                console.log("error"+res);
            })

    }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    const book = {
      id: this.state.id,
      name: this.state.name,
      quantity: this.state.quantity,
      location: this.state.location,
      description: this.state.description,
      isbn: this.state.isbn,
      publisher: this.state.publisher,
      author: this.state.author
    };
    console.log("check id"+book);
    axios({
      method: "put",
      url: "/book",
      data: book,
       headers: {"Authorization" : `Bearer ${localStorage.getItem("access_token")}`}
    })
      .then(() => {
          history.replace("/book")
      })
      .catch(error => {
          console.log("error in book update" + JSON.stringify(error.response.data.detail.name));
        this.setState({ hasError: true,error: error.response.data });

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
            <h2 className="text-center mb-5">UPDATE BOOK FORM</h2>
            <FormGroup row>

              <Label for="exampleEmail" sm={2}>
                <h5>Name: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="name"
                  id="exampleEmail"
                  placeholder="Enter book Name"
                  defaultValue={this.state.book.name}
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
                  defaultValue={this.state.book.location}
                  id="examplePassword"
                  placeholder="Enter book location"
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.location}</em></p>:null}
              </Col>
            </FormGroup>
          <FormGroup row>
              <Label sm={2}>
                <h5>ISBN no: </h5>
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="isbn"
                  id="examplePassword"
                  defaultValue={this.state.book.isbn}
                  placeholder="Enter book ISBN"
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
                  defaultValue={this.state.book.quantity}
                  placeholder="Enter book quantity"
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
                  defaultValue={this.state.book.publisher}
                  placeholder="Enter book publisher"
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
                  placeholder="Enter book author"
                  defaultValue={this.state.book.author}
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
                  type="text"
                  name="description"
                  id="exampleText"
                  defaultValue={this.state.book.description}
                  onChange={this.handleChange}
                />
                  {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.description}</em></p>:null}
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
