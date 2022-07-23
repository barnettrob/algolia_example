import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Pagination,
} from "react-instantsearch-dom";
import Results from "./results";

const Search = () => {
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_API_KEY
  );

  return (
    <div className="ais-InstantSearch">
      <h1>Search Movies</h1>
      <InstantSearch
        indexName={process.env.REACT_APP_ALGOLIA_INDEX}
        searchClient={searchClient}
      >
        <SearchBox />
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-3">
              <div className="facet">
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
              <Hits hitComponent={Results} />
            </div>
          </div>
        </div>
        <footer>
          <Pagination />
        </footer>
      </InstantSearch>
    </div>
  );
};

export default Search;