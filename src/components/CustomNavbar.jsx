import React from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
Button} from 'reactstrap';
import {Link, navigate} from "@reach/router";
import redirect from "../hoc/redirect";
class CustomNavbar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value : "Book Name",
            inputTextValue:""
        };
        this.toggle = this.toggle.bind(this);
    }
    login(){
        this.props.auth.login();
    };
    logout(){
        this.props.auth.logout();
    };
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleChange=(event)=>{
     this.setState({
            value: event.target.value
        });
    };
    handleInputTextChange=event=>{
        this.setState({
            inputTextValue:event.target.value
        });
    };
    submitSearch=(event)=>{
        event.preventDefault();
        let search=this.state.value;
        navigate("/book/search/"+search+"/"+this.state.inputTextValue);
    };
    render(){
     return(

         <div>
             <Navbar  light expand="md" className="navbar-background">
                 <NavbarBrand href="/"><i className="fas fa-home fa-2x  float-right"/></NavbarBrand>
                 {this.props.auth.isAuthenticated()?
                     <form className=" w-50 mx-auto">

                         <div className="input-group">
                             <div className="input-group-prepend">
                                 <UncontrolledButtonDropdown>
                                     <DropdownToggle >
                                         {this.state.value}<i className="fa fa-caret-down ml-2" aria-hidden="true"/>
                                     </DropdownToggle>
                                     <DropdownMenu>
                                         <DropdownItem value="Book Name" onClick={this.handleChange}>Book Name</DropdownItem>
                                         <DropdownItem value="ISBN" onClick={this.handleChange}>ISBN</DropdownItem>
                                     </DropdownMenu>
                                 </UncontrolledButtonDropdown>
                             </div>
                             <input type="text" className="form-control" placeholder="Search book"
                                    aria-label="Recipient's username" aria-describedby="basic-addon2 " onChange={this.handleInputTextChange}/>
                             <div className="input-group-append">

                                 <button className="btn btn-secondary" onClick={this.submitSearch}>Search</button>

                             </div>
                         </div>
                     </form>:null}

           {/*      <form className="form-inline w-50 mx-auto">
                     <input className=" col-10 rounded-left" type="search" placeholder="Search" aria-label="Search"/>
                     <button className="btn btn-outline-success col-2 rounded-left"
                      type="submit">Search</button>
                 </form>*/}
                 {this.props.auth.isAuthenticated()?
                     <Nav className="ml-auto">
                         <button className="btn btn-danger border-radius" onClick={this.logout.bind(this)}><i
                             className="fas fa-power-off"/> LOGOUT
                         </button>
                     </Nav> :
                     <Nav className="ml-auto">
                         <button className="btn btn-danger border-radius" onClick={this.login.bind(this)}><i
                             className="fas fa-power-off"/> LOGIN
                         </button>
                     </Nav>
                 }

             </Navbar>

         </div>
     );
    }
}
export default redirect(CustomNavbar);
