import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

export default class addGrocery extends Component {
    render() {
        return (
            <div>
                <Button
                    className="float-right mb-4"
                    color="primary"
                    onClick={this.props.toggleNewGroceryModal}
                >
                    Add Grocery
        </Button>
                <Modal
                    isOpen={this.props.newGroceryModal}
                    toggle={this.props.toggleNewGroceryModal}
                >
                    <ModalHeader toggle={this.props.toggleNewGroceryModal}>Add new Grocery</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={this.props.newGroceryData.name}
                                onChange={this.props.onChangeAddGroceryHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                value={this.props.newGroceryData.quantity}
                                onChange={this.props.onChangeAddGroceryHandler}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                value={this.props.newGroceryData.price}
                                onChange={this.props.onChangeAddGroceryHandler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.props.addGrocery()}> Add </Button>
                        <Button color="secondary" onClick={this.props.toggleNewGroceryModal}> Cancel </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}