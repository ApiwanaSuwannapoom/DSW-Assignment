import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
      
        axios.get('https://us-central1-assignmentdsw.cloudfunctions.net/api/books/${this.state.id}')
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
   
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.id}
          </td>
          <td>
            {this.props.obj.name}
          </td>
          <td>
            {this.props.obj.type}
          </td>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
        </tr>
    );
  }
}

export default TableRow;

