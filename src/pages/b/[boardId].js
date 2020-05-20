import React, {  Component } from 'react';
import {connect} from "react-redux";
import Router from 'next/router';
import {getAuth} from "../../helpers/auth";
import * as boardAPIs from "../../API/board.api";
import {fetchCardAction} from "../../store/actions/card.action";
import {withCookies} from 'react-cookie';

// Components
import Header from "components/header/Header";
import BoardHeader from "components/header/BoardHeader";
import AddList from "components/List/AddList";
import List from "components/List/List";
import SpinnerOverlay from "components/Progress/SpinnerOverlay";
import { onLoadAction, onDoneAction } from "store/actions/progress.action";
import * as listAPIs from "../../API/list.api";
import cookies from "next-cookies";
import {Modal, } from 'office-ui-fabric-react';
import CardDetailModal from "../../components/CardDetailModal/CardDetailModal";

class BoardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardState: this.props.boardDetail,
            openModal: false
        }
    }

    handleOpenCardModal = (cardId) => {
        const { cookies, fetchCardAction,cardState } = this.props;
        const token = cookies.get("jwt");
        fetchCardAction(cardId, token);
        this.setState({openModal: true});
    };

    handleCloseCardModal = () => {
        this.setState({
            openModal: false
        })
    };

    static async getInitialProps(context) {
        const {query, res, store} = context;
        const { boardId } = query;
        const token = cookies(context).jwt;
        if(!token) {
            res.writeHead(302, { Location: "/?redirect=/looking-for" });
            res.end();
        }
       try {
           const boardDetailResult = await boardAPIs.getBoardDetail(boardId,{
               headers: {
                   'Authorization': token
               }
           });
           return {
               boardDetail: boardDetailResult.data
           }
       }
        catch (e) {
            return {
                boardDetail: null
            }
        }
    }

    addNewList = async (listName) => {
        try {
            this.props.onLoad("Creating new list...");
            const result = await boardAPIs.addNewList(this.state.boardState._id, listName, {
                headers: {
                    'Authorization': `${getAuth().token}`
                }
            });
            this.setState({boardState: result.data});
            this.props.onDone();
        }
        catch (e) {
            console.log(e);
        }
    };

     renderList = () => {
        return this.state.boardState.lists.map(list => {
            return <List
                    deleteList={this.deleteList}
                     listInfo={list}
                     key={list._id}
                    handleOpenCardModal={this.handleOpenCardModal}
            />
        })
    };

     deleteList = async (listId) => {
         const {boardId} = Router.query;
         try {
             const result = await listAPIs.deleteList(boardId,listId, {
                 headers: {
                     'Authorization': `${getAuth().token}`
                 }
             });
             if(result.status === 200) {
                 this.setState((state)=> {
                     return {
                         boardState: {...state.boardState, lists: state.boardState.lists.filter(l => l._id !== listId)}
                     }
                 })
             }
         }
         catch (e) {
             console.log(e);
         }
     };

    render() {
        const {boardState, openModal} = this.state;
        return (
            <div className={"board-detail-page"} style={{ backgroundColor: boardState.theme}}>
                <Header/>
                <BoardHeader boardDetail={boardState} boardId={boardState._id}/>
                <div className="board-content">
                    <div className="lists-wrapper" style={{display:"flex",alignItems: "start"}}>
                        {this.renderList()}
                        <AddList addNewList={this.addNewList}/>
                    </div>
                </div>
                <SpinnerOverlay/>
                <Modal onDismiss={this.handleCloseCardModal} isOpen={openModal}>
                    <CardDetailModal handleCloseCardModal={this.handleCloseCardModal}/>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cardState: state.cardState
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoad: (label) => dispatch(onLoadAction(label)),
        onDone: () => dispatch(onDoneAction()),
        fetchCardAction: (cardId, token) => dispatch(fetchCardAction(cardId,token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withCookies(BoardDetail));