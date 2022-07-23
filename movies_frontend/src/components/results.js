import { Highlight } from "react-instantsearch-dom"

const Results = ({hit}) => {
  return (
    <article className="border-top pt-2 pb-4">
      <div className="title">
        <Highlight hit={hit} attribute="title" tagName="mark" />
      </div>
    </article>
  )
}

export default Results