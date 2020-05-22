import React, { useState } from "react";
import * as boardAPIs from "../../API/board.api";
import { getAuth } from "../../helpers/auth";
import {
  PersonaSize,
  Facepile,
  Persona,
  Icon,
  ActionButton,
} from "office-ui-fabric-react";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import SearchUser from "../Input/SearchUser/SearchUser";
import * as userAPIs from "API/user";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { updateBoard } from "../../store/actions/board-detail.action";
import MemberMenu from "../MemberMenu/MemberMenu";

function BoardHeader(props) {
  const { boardDetail } = props;
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { boardId } = router.query;

  function renderPersona() {
    return boardDetail
      ? boardDetail.members.map((member) => (
          <DropdownMenu
            key={member._id}
            toggle={
              <li>
                <img
                  className="member-avatar"
                  src={member.avatar}
                  title={member.email}
                  alt={member.email}
                />
              </li>
            }
          >
            <MemberMenu member={member} />
          </DropdownMenu>
        ))
      : null;
  }

  async function handleSubmit(e) {
    try {
      const result = await boardAPIs.changeBoardName(
        boardDetail._id,
        e.target.value,
        {
          headers: {
            Authorization: `${getAuth().token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  }

  async function handleSearch(searchValue) {
    if (searchValue.length > 2) {
      setIsPending(true);
      const searchUserResult = await userAPIs.searchUser({
        email: searchValue,
      });
      setUsers([...searchUserResult.data]);
      setIsPending(false);
    }
  }

  function renderSearchResult() {
    return users.map((u, i) => {
      return (
        <li
          key={`user-${i}`}
          className={`search-result-item ${
            u.boards.includes(boardId) ? "disabled" : ""
          }`}
          onClick={() => handleAddMember(u.email)}
        >
          <Persona
            imageUrl={u.avatar}
            text={u.email}
            size={PersonaSize.size32}
          />
        </li>
      );
    });
  }

  async function handleAddMember(email) {
    const addResult = await boardAPIs.addMember(
      boardId,
      email,
      getAuth().token
    );
    props.updateBoard(addResult.data);
    setUsers([]);
  }

  return (
    <nav className="board-header">
      <div className="container-fluid">
        <div className="board-name-wrapp wrap-box">
          <div className="board-name">
            <input
              defaultValue={boardDetail && boardDetail.boardName}
              type="text"
              onBlur={handleSubmit}
            />
            <span className="line" />
          </div>
          <div className="add-to-fav icon-wrapper" title="Add to favorite">
            <Icon iconName="FavoriteStar" />
          </div>
        </div>
        <div className="member-wrap wrap-box">
          <ul className="member-list">{renderPersona()}</ul>
          <DropdownMenu
            toggle={
              <ActionButton
                text="Invite"
                iconProps={{ iconName: "AddFriend" }}
              />
            }
          >
            <SearchUser
              onSearch={handleSearch}
              onClear={() => setUsers([])}
              searchResults={renderSearchResult()}
            />
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBoard: (data) => dispatch(updateBoard(data)),
  };
};

export default connect(null, mapDispatchToProps)(BoardHeader);
