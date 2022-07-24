import React from "react";

const ModalForm = React.forwardRef((props, ref) => {
  return (
    <div className="modal-form" ref={ref}>
      <div className="modal-content">
        <span className="close">
          <a href="/" className="close-modal">
            &times;
          </a>
        </span>
        This is a form for {props.uuid}
      </div>
    </div>
  );
});

export default ModalForm;
