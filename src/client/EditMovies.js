import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';

//Edit Movie component that will edit the clicked on movie with passed id
class EditMovies extends Component {
    constructor(props) {
        super(props);
        // store the related to the movie information into the state
        // these should match the movie object from the API
        this.state = {
            name: '',
            real: '',
            year: ''
        };

        //this binding is necessary to make `this` work in the callback
        //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // fetch the related movie data
    componentDidMount() {
        // get the movies API and include the id which is passed via the URL and accessed via props
        axios.get('/api/movies/' + this.props.match.params.id)
            .then(response => {
                //on resonse set the state values to match empty state values set in the constructor
                this.setState({
                    _id: response.data._id,
                    name: response.data.name,
                    real: response.data.real,
                    year: response.data.year,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //once the input boxes are changed, update the state to match the value
    handleChange(event) {
        //name of the input boxes must match the property names in the state
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        //preventDefault() is called on the event when it occurs to prevent a browser reload/refresh
        event.preventDefault();

        // use axios to send a PUT request to the server which includes the updated state information
        axios.put('/api/movies', this.state)
            //on success go to home
            .then(res => this.props.history.push('/'))
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // remember that the name of the input fields should match the state
        return (
            <div className="is-fluid">
                {/*on form submit call handleSubmit()*/}
                <form onSubmit={this.handleSubmit}>
                    <h2 className="title is-1 has-text-centered">Edit Movies</h2>
                    <hr />
                    {/*main container for input fields*/}
                    <div className="container">
                        {/*FIRST COLUMN*/}
                        <div className="columns">
                            <div className="column is-half is-offset-one-quarter">
                                <div className="field">
                                    <label className="label is-large"> Name: </label>
                                    <div className="control">
                                        <input className="input is-large is-info" type="text" name="name" value={this.state.name} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label is-large">  Real: </label>
                                    <div className="control">
                                        <input className="input is-large is-info" type="text" name="real" value={this.state.real} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label is-large"> year: </label>
                                    <div className="control">
                                        <input className="input is-large is-info" type="text" name="year" value={this.state.year} onChange={this.handleChange} id="form" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*SUBMIT BUTTON*/}
                        <input className="button submitBtn is-info is-rounded is-large is-light" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditMovies;
