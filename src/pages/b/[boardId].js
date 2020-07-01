import React, { Component } from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { getAuth } from "../../helpers/auth";
import * as boardAPIs from "../../API/board.api";
import { fetchCardAction } from "../../store/actions/card.action";
import { withCookies } from "react-cookie";
import * as boardDetailAction from "../../store/actions/board-detail.action";
import dynamic from "next/dynamic";

// Components
import Header from "components/header/Header";
import BoardHeader from "components/header/BoardHeader";
import AddList from "components/List/AddList";
import List from "components/List/List";
import SpinnerOverlay from "components/Progress/SpinnerOverlay";
import { onLoadAction, onDoneAction } from "store/actions/progress.action";
import * as listAPIs from "../../API/list.api";
import cookies from "next-cookies";
import { Modal, Panel } from "office-ui-fabric-react";

const BoardPanelMainContent = dynamic(
  () => import("../../components/BoardPanelContents/MainContent"),
  { ssr: false }
);
const CardDetailModal = dynamic(
  () => import("../../components/CardDetailModal/CardDetailModal"),
  { ssr: false }
);

class BoardDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      openPanel: false,
    };
  }

  static async getInitialProps(context) {
    const { query, res } = context;
    const { boardId } = query;
    const token = cookies(context).jwt;
    if (!token) {
      res.writeHead(302, { Location: "/" });
      res.end();
    }
    try {
      const result = await boardAPIs.getBoardDetail(boardId, {
        headers: {
          Authorization: token,
        },
      });
      return {
        boardDetailData: result.data,
      };
    } catch (err) {
      return { boardDetailData: null };
    }
  }

  async componentDidMount() {
    const { boardDetailData } = this.props;
    if (boardDetailData) {
      this.props.updateBoard(boardDetailData);
    } else if (!this.props.boardDetail.boardInfo) {
      const { cookies } = this.props;
      const { boardId } = Router.query;
      const token = cookies.get("jwt");
      this.props.fetchBoardDetail(boardId, token);
    }
  }

  componentWillUnmount() {
    this.props.updateBoard(null);
  }

  handleOpenCardModal = (cardId) => {
    const { cookies, fetchCardAction, cardState } = this.props;
    const token = cookies.get("jwt");
    fetchCardAction(cardId, token);
    this.setState({ openModal: true });
  };

  handleCloseCardModal = () => {
    const { cookies } = this.props;
    const { boardId } = Router.query;
    const token = cookies.get("jwt");
    this.props.fetchBoardDetail(boardId, token);
    this.setState({
      openModal: false,
    });
  };

  addNewList = async (listName) => {
    const { boardId } = Router.query;
    try {
      this.props.onLoad("Creating new list...");
      const result = await boardAPIs.addNewList(boardId, listName, {
        headers: {
          Authorization: `${getAuth().token}`,
        },
      });
      this.props.updateBoard(result.data);
    } catch (e) {
      console.log(e);
    } finally {
      this.props.onDone();
    }
  };

  renderList = () => {
    const { boardDetail } = this.props;
    return (
      boardDetail.boardInfo &&
      boardDetail.boardInfo.lists.map((list) => {
        return (
          <List
            deleteList={this.deleteList}
            listInfo={list}
            key={list._id}
            handleOpenCardModal={this.handleOpenCardModal}
          />
        );
      })
    );
  };

  deleteList = async (listId) => {
    const { boardId } = Router.query;
    try {
      const result = await listAPIs.deleteList(boardId, listId, {
        headers: {
          Authorization: `${getAuth().token}`,
        },
      });
      this.props.updateBoard(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  handleOpenOpenPanel = () => {
    this.setState({ openPanel: true });
  };

  handleClosePanel = () => {
    this.setState({ openPanel: false });
  };

  render() {
    const { openModal } = this.state;
    const boardState = this.props.boardDetail;
    return (
      <div
        className={"board-detail-page"}
        style={{
          backgroundColor: boardState.boardInfo && boardState.boardInfo.theme,
        }}
      >
        <Header />
        {boardState.boardInfo && (
          <BoardHeader
            handleOpenOpenPanel={this.handleOpenOpenPanel}
            boardDetail={boardState.boardInfo}
          />
        )}
        <div className="board-content">
          <div
            className="lists-wrapper"
            style={{ display: "flex", alignItems: "start" }}
          >
            {this.renderList()}
            <AddList addNewList={this.addNewList} />
          </div>
        </div>
        <SpinnerOverlay />
        <Modal onDismiss={this.handleCloseCardModal} isOpen={openModal}>
          <CardDetailModal handleCloseCardModal={this.handleCloseCardModal} />
        </Modal>
        <Panel
          isOpen={this.state.openPanel}
          onDismiss={this.handleClosePanel}
          isLightDismiss={true}
          closeButtonAriaLabel="Close panel"
        >
          <BoardPanelMainContent />
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cardState: state.cardState,
    boardDetail: state.boardDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (label) => dispatch(onLoadAction(label)),
    onDone: () => dispatch(onDoneAction()),
    fetchCardAction: (cardId, token) =>
      dispatch(fetchCardAction(cardId, token)),
    updateBoard: (data) => dispatch(boardDetailAction.updateBoard(data)),
    fetchBoardDetail: (boardId, token) =>
      dispatch(boardDetailAction.fetchBoardDetail(boardId, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withCookies(BoardDetail));
