import "./Footer.css";
import React from "react";

function Footer(props) {
  return (
    <div className="row button-align">
      {props.prevValue > 0 && (
        <button
          className="btn btn-primary prevButtonAlign btn-sm mt-2 mr-3"
          onClick={() => props.onPrev()}
        >
          Prev
        </button>
      )}
      <button
        className="btn btn-primary nextButtonAlign btn-sm mt-2 ml-3"
        onClick={() => props.onNext()}
      >
        Next
      </button>
    </div>
  );
}
export default Footer;
