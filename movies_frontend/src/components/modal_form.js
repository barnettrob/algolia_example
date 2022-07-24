import React from "react";

const ModalForm = React.forwardRef((props, ref) => {
  const handleModalClose = (event) => {
    event.preventDefault();

    // Close modal window.
    ref.current.className = ref.current.className.replace("opened", "");
  };

  return (
    <div className="modal-form" ref={ref}>
      <div className="modal-content">
        <div className="d-flex flex-row-reverse">
          <span className="close">
            <button
              className="btn-close"
              onClick={handleModalClose}
            ></button>
          </span>
        </div>
        <pre>{JSON.stringify(props.record)}</pre>
      </div>
    </div>
  );
});

export default ModalForm;
