import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            id: '',
            name: '',
            type:''
        }
  }

  componentDidMount() {
      axios.get('https://us-central1-assignmentdsw.cloudfunctions.net/api/books/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
                id: response.data.id, 
                name: response.data.name,
                type: response.data.type });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

    onChangeId(e) {
        this.setState({
         id: e.target.value
        });
      }
      onChangeName(e) {
        this.setState({
          name: e.target.value
        })  
      }
      onChangeType(e) {
        this.setState({
          type: e.target.value
        })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
        id: this.state.id,
        name: this.state.name,
        type: this.state.type
    };
    axios.post('https://us-central1-assignmentdsw.cloudfunctions.net/api/books/post'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Book</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>ID:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.id}
                      onChange={this.onChangeId}
                      />
                </div>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.name}
                      onChange={this.onChangeName}
                      />
                </div>
                <div className="form-group">
                    <label>Type: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.type}
                      onChange={this.onChangeType}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}