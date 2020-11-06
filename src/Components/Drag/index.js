import React from "react";
import PropTypes from "prop-types";

const Drag = (props) => {
  function drag(e) {
    e.dataTransfer.setData("transfer", e.target.id);
  }

  function noAllowDrop(e) {
    e.stopPropagation();
  }

  return (
    <div
      id={props.id}
      draggable="true"
      onDragStart={drag}
      onDragOver={noAllowDrop}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

Drag.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
export default Drag;
