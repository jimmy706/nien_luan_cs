import React, {  Component } from 'react';
import {connect} from "react-redux";
import Router from 'next/router';
import {getAuth, isAuth} from "../../helpers/auth";
import * as boardAPIs from "../../API/board.api";

// Components
import Header from "components/header/Header";
import BoardHeader from "components/header/BoardHeader";
import AddList from "components/List/AddList";
import List from "components/List/List";
import SpinnerOverlay from "components/Progress/SpinnerOverlay";
import { onLoadAction, onDoneAction } from "store/actions/progress.action";

class BoardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            boardState: {
                boardName: "",
                lists: [],
                theme: "#ddd"
            }
        }
    }

    async componentDidMount() {
        if(isAuth()){
            const {boardId} = Router.query;
            try {
                const boardInfo = await boardAPIs.getBoardDetail(boardId,{
                    headers: {
                        'Authorization': `${getAuth().token}`
                    }
                });
                this.setState({boardState: boardInfo.data, isLoaded: true});
            }catch (e) {
                console.log(e);
            }
        }else {
            Router.push("/");
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
            return <List listInfo={list} key={list._id}/>
        })
    };

    render() {
        const {boardState, isLoaded} = this.state;
        return (
            <div className={"board-detail-page"} style={{minHeight:"100vh", backgroundColor: boardState.theme}}>
                <Header/>
                {isLoaded ? <BoardHeader boardName={boardState.boardName} boardId={boardState._id}/> : null}
                <div className="board-content">
                    <div className="container-fluid">
                        <div className="lists-wrapper" style={{display:"flex",alignItems: "start"}}>
                            {this.renderList()}
                            <AddList addNewList={this.addNewList}/>
                        </div>
                    </div>
                </div>
                <SpinnerOverlay/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoad: (label) => dispatch(onLoadAction(label)),
        onDone: () => dispatch(onDoneAction())
    }
};

export default connect(null,mapDispatchToProps)(BoardDetail);