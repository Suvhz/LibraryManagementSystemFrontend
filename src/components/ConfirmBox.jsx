import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
class ConfirmBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }
    handleDelete = event => {
        const {id}=this.props;
        event.preventDefault();
        this.props.delete(id);
    };
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render(){
return(
    <div>
        <Button onClick={this.toggle} className="btn btn-danger"><i className="fas fa-trash" /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalBody>
                <div className="text-danger fa-3x text-center"> <i className="far fa-times-circle"/></div>
                <h3 className="text-center">Are you sure ?</h3>
                <p className="text-center">Do you really want to delete this record? </p>

                <div className="row mt-1">
                    <div className="col-md-12">
                <Button color="danger" className="float-right rounded-0" onClick={this.handleDelete}>Delete</Button>

                <Button color="secondary" className="float-right mr-2 rounded-0" onClick={this.toggle}>Cancel</Button>
                    </div>
                </div>
            </ModalBody>

        </Modal>

    </div>
);
    }
}
export default ConfirmBox;