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

export default class editGrocery extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.editGroceryModal}
                    toggle={this.props.toggleEditGroceryModal}
                >
                    <ModalHeader toggle={this.props.toggleEditGroceryModal}>
                        Update Grocery
          </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={this.props.editGroceryData.name}
                                onChange={this.props.onChangeEditGroceryHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                value={this.props.editGroceryData.quantity}
                                onChange={this.props.onChangeEditGroceryHanler}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                value={this.props.editGroceryData.price}
                                onChange={this.props.onChangeEditGroceryHanler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.props.updateGrocery}
                        >
                            Update
            </Button>
                        <Button
                            color="secondary"
                            onClick={this.props.toggleEditGroceryModal}
                        >
                            Cancel
            </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}