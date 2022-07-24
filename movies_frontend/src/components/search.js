import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Pagination,
} from "react-instantsearch-dom";
import Results from "./results";
import { useState, useRef } from "react";
import ModalForm from "./modal_form";

const Search = () => {
  const [toggleView, setToggleView] = useState(false);
  const addModalRef = useRef();

  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
  );

  const handleViewClick = () => {
    setToggleView(!toggleView);
    const hitsListEl = document.getElementsByClassName("ais-Hits-list");

    for (const list of hitsListEl) {
      if (!toggleView) {
        list.classList.add("grid");
      } else {
        list.classList.remove("grid");
      }
    }
  };

  const handleAddClick = (event) => {
    event.preventDefault();

    // Open Modal.
    addModalRef.current.className = `${addModalRef.current.className} opened`;
  };

  return (
    <div className="ais-InstantSearch">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Search Movies</h1>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleViewClick}
          style={{ height: `30px` }}
        >
          {toggleView ? "Display as list" : "Display as grid"}
        </button>
      </div>
      <InstantSearch
        indexName={process.env.REACT_APP_ALGOLIA_INDEX}
        searchClient={searchClient}
      >
        <SearchBox />
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-3">
              <div className="facet mt-4">
                <div className="mt-2 mb-2 text-muted">Genre</div>
                <RefinementList attribute="genre" />
              </div>
              <div className="facet">
                <div className="mt-2 mb-2 text-muted">Year</div>
                <RefinementList attribute="year" />
              </div>
              <div className="facet">
                <div className="mt-2 mb-2 text-muted">Actor</div>
                <RefinementList attribute="actors" />
              </div>
            </div>
            <div className="col">
              <div className="d-flex flex-row-reverse mb-4">
                <button
                  className="btn btn-primary btn-sm mx-2"
                  onClick={handleAddClick}
                >
                  Add Movie
                </button>
              </div>
              <Hits hitComponent={Results} orientation={toggleView} />
            </div>
          </div>
          <ModalForm ref={addModalRef} record={null} />
        </div>
        <footer>
          <Pagination />
        </footer>
      </InstantSearch>
    </div>
  );
};

export default Search;
