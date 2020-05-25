import React from "react";
import { Icon } from "office-ui-fabric-react";

function MainMenu(props) {
  const { menuList, setDispay } = props;

  function renderChoiceList() {
    return menuList.map((menu, index) => {
      return (
        <li key={`menu-item-${index}`} onClick={() => setDispay(menu.display)}>
          <Icon
            iconName={menu.icon}
            styles={{
              root: {
                verticalAlign: "middle",
                marginRight: "10px",
                fontSize: "1.2rem",
              },
            }}
          />
          <span>{menu.title}</span>
        </li>
      );
    });
  }

  return (
    <div className="menu-wrapper">
      <div className="menu-header">
        <span className="title">Board Menu</span>
        <hr className="line" />
      </div>
      <ul className="action-list">{renderChoiceList()}</ul>
    </div>
  );
}

export default MainMenu;

MainMenu.defaultProps = {
  menuList: [],
  setDispay: function (display) {},
};
