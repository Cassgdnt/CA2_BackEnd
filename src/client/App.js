import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
//import required components
import CreateMovies from './CreateMovies';
import EditMovies from './EditMovies';
import MoviesList from './MoviesList';

// this is the "main" component which sets up the React Router and respective routes
const App = () => {
  return(
    <HashRouter>
      <div>
        {/*SERVERSIDE: Link the routes to components*/}
        <Route exact path="/" component={MoviesList}/>
        {/*pass the id through the EditMovie component*/}
        <Route path="/edit-movies/:id" component={EditMovies}/>
        {/*set the path to create a new movie to CreateMovie component*/}
        <Route path="/create-movies" component={CreateMovies}/>
      </div>
    </HashRouter>
  );
};

export default App;
