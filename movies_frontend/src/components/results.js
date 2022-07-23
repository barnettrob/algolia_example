import { Highlight } from "react-instantsearch-dom";

const Results = ({ hit }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={hit.image} alt={hit.title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Highlight hit={hit} attribute="title" tagName="mark" />
            </h5>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="card-text">
                    <small>Genres: {hit.genre.map((g) => g + " ")}</small>
                  </div>
                  <div className="card-text">
                    <small>Year: {hit.year}</small>
                  </div>
                  <div className="card-text">
                    <small>Score: {hit.score}</small>
                  </div>
                  <div className="card-text">
                    <small>Rating: {hit.rating}</small>
                  </div>
                </div>
                <div className="col">
                  <div className="card-text">
                    <small>Actors:</small>
                    <small>
                      <ul>
                        {hit.actors.map((actor) => (
                          <li>{actor}</li>
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
    </div>
  );
};

export default Results;
