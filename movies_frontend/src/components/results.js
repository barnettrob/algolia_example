import React from "react";
import { useRef } from "react";
import { Highlight } from "react-instantsearch-dom";
import ModalForm from "./modal_form";

const Results = ({ hit }) => {
  const modalRef = useRef();

  const handleEditClick = (event) => {
    event.preventDefault();

    // Open Modal.
    modalRef.current.className = `${modalRef.current.className} opened`;
  };

  const handleDeleteClick = (event, id) => {
    event.preventDefault();
    const confirmMsg = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (confirmMsg) {
      // Continue with delete.
      console.log("event delete", event);
      console.log("id", id);
    }
  };

  return (
    <div className="card mb-3 h-100">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={hit.image} alt={hit.title} className="movie-image" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <div className="card-details d-flex justify-content-between align-items-center">
              <h5 className="card-title">
                <Highlight hit={hit} attribute="title" tagName="mark" />
              </h5>
              <div className="controls">
                <button
                  className="btn btn-outline-primary btn-sm mx-2"
                  onClick={(event) => handleEditClick(event, hit.objectID)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={(event) => handleDeleteClick(event, hit.objectID)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card-text">
                    <small>Genres: {hit.genre.map((g) => g + " ")}</small>
                  </div>
                  <div className="card-text year">
                    <small>Year: {hit.year}</small>
                  </div>
                  <div className="card-text score">
                    <small>Score: {hit.score}</small>
                  </div>
                  <div className="card-text rating">
                    <small>Rating: {hit.rating}</small>
                  </div>
                </div>
                <div className="col actors">
                  <div className="card-text">
                    <small>Actors:</small>
                    <small>
                      <ul>
                        {hit.actors.map((actor, index) => (
                          <li key={index}>{actor}</li>
                        ))}
                      </ul>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalForm ref={modalRef} record={hit} />
    </div>
  );
};

export default Results;
