import React from "react";
import Link from "next/link";
import { CommandBar } from "office-ui-fabric-react";
import { deleteBoardAction } from "../../store/actions/boards.action";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { checkCurrentIsAdmin } from "../../helpers/auth";

function BoardCard(props) {
  const router = useRouter();
  const { theme, boardName, _id } = props.board;

  const overflowItem = [
    {
      key: "view",
      text: "View detail",
      onClick: () => {
        router.push("/b/[boardId]", "/b/" + _id);
      },
      iconProps: { iconName: "RedEye" },
    },
    {
      key: "delete",
      text: "Delete board",
      onClick: () => props.deleteBoardAction(_id),
      iconProps: { iconName: "RemoveFromTrash" },
      disabled: !checkCurrentIsAdmin(props.board, props.user),
    },
  ];
  return (
    <div
      className="board-card"
      style={{
        background: theme,
      }}
    >
      <div className={"dropdown-container"}>
        <CommandBar overflowItems={overflowItem} />
      </div>
      <Link href={"/b/[boardId]"} as={"/b/" + _id}>
        <a className="board-name">
          <h3>{boardName}</h3>
        </a>
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { deleteBoardAction })(BoardCard);
