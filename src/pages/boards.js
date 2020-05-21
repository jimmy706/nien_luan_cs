import React, { Component } from "react";
import Router from "next/router";
import { isAuth, getAuth } from "../helpers/auth";
import Header from "../components/header/Header";
import { Icon } from "office-ui-fabric-react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  TextField,
  ContextualMenu,
  PrimaryButton,
  DefaultButton,
} from "office-ui-fabric-react";
import { connect } from "react-redux";
import {
  createBoardAction,
  setBoardsAction,
} from "../store/actions/boards.action";
import axios from "axios";
import { GET_BOARDS_URL } from "../constants/APIs";
import BoardCard from "../components/BoardCard/BoardCard";
import SpinnerOverlay from "../components/Progress/SpinnerOverlay";

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideDialog: true,
      boardName: "",
    };
    this._dragOption = {
      moveMenuItemText: "Move",
      closeMenuItemText: "Close",
      menu: ContextualMenu,
    };
  }

  renderBoards = () => {
    const { boards } = this.props;
    return boards.map((b) => {
      return (
        <div className="item" key={b._id}>
          <BoardCard board={b} />
        </div>
      );
    });
  };

  async componentDidMount() {
    if (!isAuth()) {
      Router.push("/");
    } else {
      const boards = await axios(GET_BOARDS_URL, {
        headers: {
          Authorization: `${getAuth().token}`,
        },
      });
      this.props.setBoardsAction(boards.data);
    }
  }

  closeDialog = () => {
    this.setState({
      hideDialog: true,
    });
  };

  showDialog = () => {
    this.setState({
      hideDialog: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      boardName: e.target.value,
    });
  };

  handleCreateBoard = () => {
    const boardName = this.state.boardName;
    const email = this.props.user.email;
    this.props.createBoardAction({ boardName }, email);
    this.closeDialog();
  };

  render() {
    const { hideDialog } = this.state;
    return (
      <div id="boards-page">
        <SpinnerOverlay />
        <Header />
        <Dialog
          hidden={hideDialog}
          dialogContentProps={{
            type: DialogType.close,
            title: "Create new board",
          }}
          onDismiss={this.closeDialog}
          modalProps={{
            styles: { main: { maxWidth: 450 } },
            dragOptions: this._dragOption,
          }}
        >
          <TextField
            label="Board name"
            placeholder="Your board name..."
            onChange={this.handleChange}
          />
          <DialogFooter>
            <DefaultButton text="Cancel" onClick={this.closeDialog} />
            <PrimaryButton text="Create new" onClick={this.handleCreateBoard} />
          </DialogFooter>
        </Dialog>
        <div className={"boards-container"}>
          <div className="container">
            <h2>
              <Icon iconName={"FabricUserFolder"} />
              &nbsp; Personal boards:
            </h2>
            <div className="board-grid">
              {this.renderBoards()}
              <div className="item">
                <div
                  className="board-card create-card"
                  title="Create new board"
                  onClick={this.showDialog}
                >
                  <a href="#" className="card-link">
                    <Icon iconName={"CirclePlus"} />
                    &nbsp; Create new board
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    boards: state.boards,
  };
};

export default connect(mapStateToProps, { createBoardAction, setBoardsAction })(
  Boards
);
