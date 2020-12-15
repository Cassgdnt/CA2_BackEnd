import React, { Component } from 'react';
//import the Link component to handle React Router
import { Link } from 'react-router-dom';
import Movies from './Movies';
//Axios is a lightweight HTTP client based on the $http service within Angular.js
//Axios provides support for request and response interceptors, transformers and auto-conversion to JSON
// Use "npm install axios" command to install
import axios from 'axios';
import './app.css';
// import stylesheet 
//MAKE SURE TO INSTALL USING npm install bulma
import 'bulma/css/bulma.css';

// this component will handle all elements in the movies array
class MoviesList extends Component {
    constructor(props) {
        super(props);
        // store the movies array in the state
        this.state = { movies: [] };

        //this binding is necessary to make `this` work in the callback
        //generally, if you refer to a method without () after it, such as onClick={this.handleClick}, you should bind that method
        this.updateMovies = this.updateMovies.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // fetch all movie data from the server when the component mounts
    componentDidMount() {
        this.updateMovies();
    }

    //
    updateMovies() {
        // get the movies API using axios GET request to the server 
        axios.get('api/movies')
            .then(response => {
                //store the response in the state
                this.setState({ movies: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleDelete(moviesId) {
        // make a DELETE request to the server which will handle the removal of the movie with the specific movieId
        axios
            .delete('api/movies', {
                data: {
                    id: moviesId
                }
            })
            .then(response => {
                //if the deletion was successful then re-render the list of movies
                this.updateMovies();
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        // produce a Movie component for each movie object
        const moviesList = this.state.movies.map(u => (
            //map through each element in the array and set to the value received from the server
            <Movies
                key={u._id}
                id={u._id}
                name={u.name}
                real={u.real}
                year={u.year}
                //you must include the handleDelete method to use in child components
                handleDelete={this.handleDelete}
            />
        ));

        //return the list of movies
        return (
            <div className="is-fluid">
                {/*Navigation bar*/}
                <nav className="navbar">
                    <h1 className="navbar-item title is-1 has-text-primary">List of Movies</h1>
                    {/*when this button is pressed, CreateMovie component will be rendered by using React Router*/}
                    <Link to={'/create-movies'} className="navbar-item navbar-end">
                        <button className="button is-warning" type="button">Create new Movies</button>
                    </Link>
                </nav>
                <hr />
                {/*MOVIE LIST*/}
                <div>
                    <div className="columns is-multiline">
                        {moviesList}
                    </div>
                </div>
                {/*FOOTER*/}
                <footer className="footer has-background-primary">
                    <div className="content has-text-centered">
                        <p className="has-text-white-bis"><strong>Random Movie API</strong> styled with Bulma.</p>
                    </div>
                </footer>
            </div>

        );
    }
}

export default MoviesList;
