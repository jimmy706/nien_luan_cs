import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

function HiddenMenu(props) {
  const { title } = props;
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        // click outside hidden menu
        setOpen(false);
      }
    });
  }, []);

  return (
    <div ref={menuRef} className="custom-hidden-menu">
      <div className="toggle-menu" onClick={() => setOpen(!open)}>
        {props.toggle}
      </div>
      <div className={`menu-content ${classNames({ open })}`}>
        <div className="menu-header">
          <span className="title">{title}</span>
          <hr className="line" />
        </div>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

export default HiddenMenu;

HiddenMenu.defaultProps = {
  title: "",
};
