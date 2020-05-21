import React from "react";
import PropTypes from "prop-types";

function DropdownMenu(props) {
  return (
    <div className="custom-dropdowm-menu" {...props}>
      <div className="toggle-menu">{props.toggle}</div>
      <div className="toggle-content">{props.children}</div>
    </div>
  );
}

export default DropdownMenu;

DropdownMenu.propTypes = {
  toggle: PropTypes.element.isRequired,
};
