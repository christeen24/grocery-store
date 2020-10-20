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
        <Button className="float-right mb-4" color="primary">
          Add Grocery
        </Button>
        <Modal>
        <ModalHeader>Add new Grocery</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" name="name" />
            </FormGroup>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input id="quantity" name="quantity" />
            </FormGroup>

            <FormGroup>
              <Label for="price">Price</Label>
              <Input id="price" name="price" />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary"> Add </Button>
            <Button color="secondary"> Cancel </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}