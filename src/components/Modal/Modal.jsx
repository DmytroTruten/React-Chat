import React from "react";
import "./Modal.css";

function Modal({ image, onImageUpload, onImageCancel, visibility }) {
  return (
    <div className={`Modal ${visibility}`}>
      <div className="FileUploadContainer">
        <p className="ImageName">{image ? image.name : null}</p>
        <div className="ModalButtonsContainer">
          <button className="CancelButton" type="button" onClick={onImageCancel}>
            Cancel
          </button>
          <button
            className="UploadButton"
            type="button"
            onClick={onImageUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
