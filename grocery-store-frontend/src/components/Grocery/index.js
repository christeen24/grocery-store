import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import AddGrocery from './addGrocery';
import EditGrocery from './editGrocery';
import axios from "axios";

export default class Grocery extends Component {

    constructor(props){
        super(props);
        this.state = {
            groceries: [],
            newGroceryData: {
                name: "",
                quantity: "",
                price: ""
            },
            isLoading: false,
            status: "",
            newGroceryModal: false,
            editGroceryData: {
                id: "",
                name: "",
                quantity: "",
                price: "",
            },
            editStudentModal: false,
            noDataFound: "",
        }
    }

    componentDidMount() {
        this.getGroceries();
      }   

      getGroceries() {
        axios.get("http://localhost:8000/groceries").then((response) => {
            if (response.status === 200) {
            this.setState({
                groceries: response.data.data ? response.data.data : [],
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

        toggleNewGroceryModal = () => {
            this.setState({
              newGroceryModal: !this.state.newGroceryModal,
            });
          };

        onChangeAddGroceryHandler = (e) => {
            let { newGroceryData } = this.state;
            newGroceryData[e.target.name] = e.target.value;
            this.setState({ newGroceryData });
        };

        addGrocery = () => {
            axios.post("http://localhost:8000/groceries",
                this.state.newGroceryData
              )
              .then((response) => {
                const { groceries } = this.state;
                const newGroceries = [...groceries];
                newGroceries.push(response.data);
                this.setState(
                  {
                    groceries: newGroceries,
                    newGroceryModal: false,
                    newGroceryData: {
                      name: "",
                      quantity: "",
                      price: ""
                    },
                  },
                  () => this.getGroceries()
                );
              })
              .catch(error => console.log(error));
          };

        toggleEditGroceryModal = () => {
            this.setState({
              editGroceryModal: !this.state.editGroceryModal,
            });
          };
    
        onChangeEditGroceryHanler = (e) => {
            let { editGroceryData } = this.state;
            editGroceryData[e.target.name] = e.target.value;
            this.setState({ editGroceryData });
          };
    
        editGrocery = (id, name, quantity, price) => {
            this.setState({
                editGroceryData: { id, name, quantity, price },
              editGroceryModal: !this.state.editGroceryModal,
            });
          };

        updateGrocery = () => {
            let {
              id,
              name,
              quantity,
              price
            } = this.state.editGroceryData;
            this.setState({
              isLoading: true,
            });
            axios
              .post("http://localhost:8000/groceries", {
                name,
                quantity,
                price,
                id,
              })
              .then((response) => {
                this.getGroceries();
                this.setState({
                  editGroceryModal: false,
                  editGroceryData: { name, quantity, price },
                  isLoading:false,
                });
              })
              .catch((error) => {
                this.setState({isLoading:false})
                console.log(error.response);
              });
          };

        deleteGrocery = (id) => {
            this.setState({
              isLoading: true,
            });
            axios
              .delete("http://localhost:8000/groceries/" + id)
              .then((response) => {
                this.setState({
                  isLoading: false,
                });
                this.getGroceries();
              })
              .catch((error) => {
                this.setState({
                  isLoading: false,
                });
              });
          };

  render() {
    const { newGroceryData, editGroceryData, noDataFound, groceries} = this.state;
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
                  onClick={() =>
                    this.editGrocery(
                      grocery.id,
                      grocery.name,
                      grocery.quantity,
                      grocery.price
                    )
                  }
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.deleteGrocery(grocery.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        });
      }

      if (this.state.isLoading) {
        return <div className="spinner-border text-center" role="status"> <span className="sr-only">Loading...</span>
      </div>
      }

    return (
      <div className="App container mt-4">
           <h4 className="font-weight-bold">Grocery Shop</h4>       
           <AddGrocery
                toggleNewGroceryModal={this.toggleNewGroceryModal}
                newGroceryModal={this.state.newGroceryModal}
                onChangeAddGroceryHandler={this.onChangeAddGroceryHandler}
                addGrocery={this.addGrocery}
                newGroceryData={newGroceryData}
           />

            <EditGrocery
                toggleEditGroceryModal={this.toggleEditGroceryModal}
                editGroceryModal={this.state.editGroceryModal}
                onChangeEditGroceryHanler={this.onChangeEditGroceryHanler}
                editGrocery={this.editGrocery}
                editGroceryData={editGroceryData}
                updateGrocery={this.updateGrocery}
            />

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