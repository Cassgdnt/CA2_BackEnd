import React from 'react';
import ReactDOM from 'react-dom';
//import the Link component to use for linking prop information
import { Link } from 'react-router-dom';

// define one single movie card component
class Movies extends React.Component {
  render() {
    return (
      <div className="column is-2" style={{ padding: "20px" }}>
        <div className="card" style={{ borderRadius: "20px" }}>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">Name: {this.props.name}</p>
                <hr/>
                <p className="subtitle is-size-6">Real: {this.props.real}</p>
                <hr/>
                <p className="subtitle is-size-6">Year: {this.props.year}</p>
                {/*delete the prop with requested id from the function invoked in the parent component*/}
                <button className="button is-danger is-rounded is-light is-small" type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                  Delete
                </button>
                {/*load the EditMovie component via React Router and send the id over to the EditMovie component*/}
                <Link to={`/edit-movies/${this.props.id}`}>
                  <button className="button is-primary is-rounded is-light is-small" type="button">
                  Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Movies;
