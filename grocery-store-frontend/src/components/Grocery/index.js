import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import AddGrocery from './addGrocery';
import axios from "axios";

export default class Grocery extends Component {

    constructor(props){
        super(props);
        this.state = {
            groceries: [],
        }
    }

    componentDidMount() {
        this.getGroceries();
      }   

      getGroceries() {
        axios.get("http://localhost:8000/groceries").then((response) => {
            if (response.status === 200) {
            this.setState({
                groceries: response.data ? response.data : [],
            });
            }
            if (
            response.data.status === "failed" &&
            response.data.success === false
            ) {
            this.setState({
                noDataFound: response.data.message,
            });
            }
        });
        }   

  render() {
    const { noDataFound, groceries} = this.state;
    let groceriesDetails = [];
    if (groceries.length) {
        groceriesDetails = groceries.map((grocery) => {
            return (
            <tr key={grocery.id}>
              <td>{grocery.id}</td>
              <td>{grocery.name}</td>
              <td>{grocery.quantity}</td>
              <td>{grocery.price}</td>
              <td>
                <Button
                  color="success"
                  className="mr-3"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        });
      }
    return (
      <div className="App container mt-4">
           <h4 className="font-weight-bold">Grocery Shop</h4>       
           <AddGrocery/>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
            </thead>
                {groceries.length === 0 ? (
            <tbody>
              <h3>{noDataFound}</h3>
            </tbody>
          ) : (
            <tbody>{groceriesDetails}</tbody>
          )}
        </Table>
      </div>
    );
  }
}