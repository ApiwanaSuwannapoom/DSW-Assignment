import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
      super(props);
      this.state = {books: []};

    }
    state = {
      id: '',
    }
    handleChange = event => {
      this.setState({ id: event.target.value });
    }
    handleSubmit = event => {
      event.preventDefault();
  
      axios.delete(`https://us-central1-dsw-assignment.cloudfunctions.net/api/books/${this.state.id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })}
    componentDidMount(){
      axios.get(`https://us-central1-dsw-assignment.cloudfunctions.net/api/books/`)
        .then(response => {
          this.setState({ books: response.data });
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    tabRow(){
      return this.state.books.map(function(object, i){
          return <TableRow obj={object} key={i} />;
      });
    
    }

    render() {
      return (
        <div>
          <h3 align="center">Books List</h3> 
          <form onSubmit={this.handleSubmit}>
          <label> Book ID:  <input type="text" name="id" onChange={this.handleChange} /></label>
          <button type="submit" className="btn btn-danger">Delete</button>
        </form>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th colSpan="2">Action</th>
               
              </tr>
            </thead>
            <tbody>
              { this.tabRow() }
            </tbody>
          </table>
        </div>
      );
    }
  }