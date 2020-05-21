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

function BoardHeader(props) {
  const { boardDetail } = props;
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { boardId } = router.query;

  const facepilePersonas = boardDetail
    ? boardDetail.members.map((mem) => {
        return {
          imageUrl: mem.avatar,
          data: "",
          personaName: mem.email,
        };
      })
    : [];

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
          <Facepile
            personas={facepilePersonas}
            personaSize={PersonaSize.size24}
          />
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

export default BoardHeader;
