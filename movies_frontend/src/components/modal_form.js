import React from "react";
import { Field, FieldArray, Formik } from "formik";
import * as Yup from "yup";
import { parse } from "date-fns";
import { upsertMovie } from "../client/backend_api";

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

  const handleFormSubmit = async (values) => {
    if (typeof values === "object") {
      // Fix actor_facets html encoded characters.
      if ("actor_facets" in values) {
        for (let key in values.actor_facets) {
          values.actor_facets[key] = values.actor_facets[key].replace(
            /[\u00A0-\u9999<>\&]/g,
            function (i) {
              return "&#" + i.charCodeAt(0) + ";";
            }
          );
        }
      }

      await upsertMovie(values)
        .then((res) => {
          window.location.reload(false);
        })
        .catch((e) => {
          console.log("e", e.message);
        });
    }
  };

  const recordValidation = Yup.object().shape({
    title: Yup.string().required("Required"),
    year: Yup.date().transform((value, originalValue, context) => {
      if (context.isType(value)) return value;
      // Parse date for year only.
      return parse(originalValue, "yyyy", new Date());
    }),
    color: Yup.string(),
    image: Yup.string().url(),
    score: Yup.number().test(
      "Is score positive",
      "Score must be a number greater than 0",
      (value) => {
        if (value) {
          return value > 0;
        } else {
          return true;
        }
      }
    ),
    rating: Yup.number().test(
      "Is rating positive",
      "Rating must be a number greater than 0",
      (value) => {
        if (value) {
          return value > 0;
        } else {
          return true;
        }
      }
    ),
  });

  return (
    <div className="modal-form" ref={ref}>
      <div className="modal-content">
        <div className="d-flex flex-row-reverse">
          <span className="close">
            <button className="btn-close" onClick={handleModalClose}></button>
          </span>
        </div>
        <h5 className="text-center mb-4">{formType} Movie</h5>
        <Formik
          initialValues={initialValues}
          validationSchema={recordValidation}
          onSubmit={(values) => {
            handleFormSubmit(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div className="field-input">
                      <Field
                        type="hidden"
                        name="objectid"
                        value={"objectID" in values ? values.objectID : ""}
                      />
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
                    {errors.title && touched.title ? (
                      <div style={{ fontSize: "12px", color: "#ff0000" }}>
                        {errors.title}
                      </div>
                    ) : null}
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
                      <span className="invalid-feedback"></span>
                      {errors.year && touched.year ? (
                        <div style={{ fontSize: "12px", color: "#ff0000" }}>
                          {errors.year}
                        </div>
                      ) : null}
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
                      {errors.image && touched.image ? (
                        <div style={{ fontSize: "12px", color: "#ff0000" }}>
                          {errors.image}
                        </div>
                      ) : null}
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
                      {errors.score && touched.score ? (
                        <div style={{ fontSize: "12px", color: "#ff0000" }}>
                          {errors.score}
                        </div>
                      ) : null}
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
                      {errors.rating && touched.rating ? (
                        <div style={{ fontSize: "12px", color: "#ff0000" }}>
                          {errors.rating}
                        </div>
                      ) : null}
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
