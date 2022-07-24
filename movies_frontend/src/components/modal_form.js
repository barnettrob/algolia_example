import React from "react";
import { Field, FieldArray, Formik } from "formik";

const ModalForm = React.forwardRef((props, ref) => {
  const handleModalClose = (event) => {
    event.preventDefault();

    // Close modal window.
    ref.current.className = ref.current.className.replace("opened", "");
  };

  let initialValues = {
    title: "",
    alternative_titles: [],
    actors: [],
    year: "",
    image: "",
    color: "",
    score: "",
    rating: "",
    actor_facets: [],
    genre: [],
  };

  let formType = "Add";

  if (props.record !== null && typeof props.record === "object") {
    for (let key in props.record) {
      initialValues[key] = props.record[key];
    }

    formType = "Update";
  }

  const handleFormSubmit = (values) => {
    console.log("handle formSubmit Values", values);
  };

  return (
    <div className="modal-form" ref={ref}>
      <div className="modal-content">
        <div className="d-flex flex-row-reverse">
          <span className="close">
            <button className="btn-close" onClick={handleModalClose}></button>
          </span>
        </div>
        <h5 className="text-center mb-4">{formType} Movie</h5>
        <Formik initialValues={initialValues} onSubmit={(values) => {handleFormSubmit(values)}}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit
          }) => (
            <form
              onSubmit={handleSubmit}
            >
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="field-input">
                      <Field type="hidden" name="objectid" value={"objectID" in values ? values.objectID : ''} />
                    </div>
                    <div className="field-input">
                      <span className="pe-2">Title:</span>
                      <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                    </div>
                    {errors.title && touched.title && errors.title}
                    Alternative Titles:
                    <FieldArray
                      name="alternative_titles"
                      render={(arrayHelpers) => (
                        <div>
                          {values.alternative_titles &&
                          values.alternative_titles.length > 0 ? (
                            values.alternative_titles.map((title, index) => (
                              <div key={index}>
                                <Field name={`alternative_titles.${index}`} />
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove an alternative title from the list
                                  className="btn btn-outline-danger"
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
                                  className="btn btn-outline-success"
                                >
                                  +
                                </button>
                              </div>
                            ))
                          ) : (
                            <button
                              type="button"
                              onClick={() => arrayHelpers.push("")}
                              className="btn btn-secondary"
                            >
                              {/* show this when user has removed all alternative titles from the list */}
                              Add an alternative title
                            </button>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="col">
                    <div className="field-input">
                      <span className="pe-2">Year:</span>
                      <input
                        type="text"
                        name="year"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.year}
                      />
                      {errors.year && touched.year && errors.year}
                    </div>
                    <div className="field-input">
                      Genre:
                      <FieldArray
                        name="genre"
                        render={(arrayHelpers) => (
                          <div>
                            {values.genre && values.genre.length > 0 ? (
                              values.genre.map((gen, index) => (
                                <div key={index}>
                                  <Field name={`genre.${index}`} />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)} // remove a genre from the list
                                    className="btn btn-outline-danger"
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    } // insert an empty string at a position
                                    className="btn btn-outline-success"
                                  >
                                    +
                                  </button>
                                </div>
                              ))
                            ) : (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                                className="btn btn-secondary"
                              >
                                {/* show this when user has removed all genre from the list */}
                                Add a genre
                              </button>
                            )}
                          </div>
                        )}
                      />
                    </div>
                    <div className="field-input">
                      Actors:
                      <FieldArray
                        name="actors"
                        render={(arrayHelpers) => (
                          <div>
                            {values.actors && values.actors.length > 0 ? (
                              values.actors.map((actor, index) => (
                                <div key={index}>
                                  <Field name={`actors.${index}`} />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)} // remove an actor from the list
                                    className="btn btn-outline-danger"
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    } // insert an empty string at a position
                                    className="btn btn-outline-success"
                                  >
                                    +
                                  </button>
                                </div>
                              ))
                            ) : (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                                className="btn btn-secondary"
                              >
                                {/* show this when user has removed all actors from the list */}
                                Add an actor
                              </button>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="field-input">
                      <span className="pe-2">Image:</span>
                      <input
                        type="text"
                        name="image"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.image}
                      />
                    </div>
                    <div className="field-input">
                      <span className="pe-2">Color:</span>
                      <input
                        type="text"
                        name="color"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.color}
                      />
                    </div>
                    <div className="field-input">
                      <span className="pe-2">Score:</span>
                      <input
                        type="text"
                        name="score"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.score}
                      />
                    </div>
                    <div className="field-input">
                      <span className="pe-2">Rating:</span>
                      <input
                        type="text"
                        name="rating"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rating}
                      />
                    </div>
                    <div className="field-input">
                      Actor Facets:
                      <FieldArray
                        name="actor_facets"
                        render={(arrayHelpers) => (
                          <div>
                            {values.actor_facets &&
                            values.actor_facets.length > 0 ? (
                              values.actor_facets.map((actor_facet, index) => (
                                <div key={index}>
                                  <Field name={`actor_facets.${index}`} />
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)} // remove an actor_facet from the list
                                    className="btn btn-outline-danger"
                                  >
                                    -
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      arrayHelpers.insert(index, "")
                                    } // insert an empty string at a position
                                    className="btn btn-outline-success"
                                  >
                                    +
                                  </button>
                                </div>
                              ))
                            ) : (
                              <button
                                type="button"
                                onClick={() => arrayHelpers.push("")}
                                className="btn btn-secondary"
                              >
                                {/* show this when user has removed all actor_facets from the list */}
                                Add an actor facet
                              </button>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
});

export default ModalForm;
