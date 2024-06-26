import React from "react";
import "./registeredform.css";


export default function RegisteredRestaurant(props) {
  const { formData } = props;
  return (
    <div className="container">
      <h1>Restaurant Details Preview</h1>
      <div className="preview-section">
        <h2>Restaurant Information</h2>
        <div className="preview-item">
          <strong>Restaurant Name:</strong> {formData.resName}
        </div>
        <div className="preview-item">
          <strong>Owner Name:</strong> {formData.resowner}
        </div>
        <div className="preview-item">
          <strong>Phone Number:</strong> {formData.phone}
        </div>
        <div className="preview-item">
          <strong>Address:</strong> {formData.address}
        </div>
      </div>
      <div className="preview-section">
        <h2>Time & Type </h2>
        <div className="preview-item">
          <strong>Opening Time:</strong> {formData.resopentime}
        </div>
        <div className="preview-item">
          <strong>Closing Time:</strong>
          {formData.resclosetime}
        </div>
        <div className="preview-item">
          <strong>Restaurant Type:</strong> {formData.restype}
        </div>
        <div className="preview-item">
          <strong>Cuisine Type:</strong> {formData.cuisine}
        </div>
      </div>
      <h1>All steps completed - We&apos;re good to go...😍</h1>
    </div>
  );
}
