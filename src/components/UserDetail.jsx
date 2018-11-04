import React from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";
import axios from "../Utils/axios";
import history from "../components/history";
import Redirect from "../hoc/redirect";
class PostFormOfBook extends React.Component {
    constructor(props){
        super(props);
     this.state = {
         firstName: '',
         lastName: '',
         email: '',
         password: '',
         error:[],
         hasError:false
     };
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    };
    handleSubmit = event => {
        event.preventDefault();
        const userDetail = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        };
        axios.post("/user",  userDetail,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            }
        )
            .then(() => {
                history.replace("/user")
            })
            .catch(error => {
                 this.setState({hasError:true,error: error.response.data});
                console.log(JSON.stringify(error.response.data.detail))

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
                        <h2 className="text-center mb-5">USER DETAIL FORM</h2>
                        <FormGroup row>
                            <Label for="firstName" sm={2}>
                                <h5>First name: </h5>
                            </Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter your first name."
                                    onChange={this.handleChange}
                                />
                                {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.firstName}</em></p>:null}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="lastName" sm={2}>
                                <h5>Last name: </h5>
                            </Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    placeholder="Enter your last name."
                                    onChange={this.handleChange}
                                />
                                {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.lastName}</em></p>:null}
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="email" sm={2}>
                                <h5>Email: </h5>
                            </Label>
                            <Col sm={10}>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    onChange={this.handleChange}
                                />
                                {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.email}</em></p>:null}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="examplePassword" sm={2}>
                                <h5>Password: </h5>
                            </Label>
                            <Col sm={10}>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                                />
                                {this.state.hasError?<p className="mt-1 text-danger"><em>{this.state.error.detail.password}</em></p>:null}
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
export default Redirect(PostFormOfBook);
