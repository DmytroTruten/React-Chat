import React from 'react';
import "./Modal.css";

function Modal({image, onImageUpload, visibility}) {
  return (
    <div className={`Modal ${visibility}`}>
      <div className='FileUploadContainer'>
      <p className="ImageName">{image ? image.name : null}</p>
      <button type="button" onClick={onImageUpload}>
        Upload
      </button>
      </div>
    </div>
  )
}

export default Modal;