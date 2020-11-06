import React from "react";
import PropTypes from "prop-types";

const Drop = (props) => {
  function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    e.target.appendChild(document.getElementById(data));
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <div id={props.id} onDrop={drop} onDragOver={allowDrop} style={props.style}>
      {props.children}
    </div>
  );
};

Drop.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
export default Drop;
