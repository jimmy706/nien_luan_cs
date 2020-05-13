import React, {  Component } from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import Router from 'next/router';
import {getAuth, isAuth} from "../../helpers/auth";
import {GET_BOARD_DETAIL_URL} from "../../constants/APIs";
import {ADD_NEW_LIST_URL} from "../../constants/APIs";

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
            const boardInfo = await axios(`${GET_BOARD_DETAIL_URL}/${boardId}`,{
                headers: {
                    'Authorization': `${getAuth().token}`
                }
            });
            this.setState({boardState: boardInfo.data, isLoaded: true});
        }else {
            Router.push("/");
        }
    }


    addNewList = async (listName) => {
        try {
            this.props.onLoad("Creating new list...");
            const result = await axios.post(`${ADD_NEW_LIST_URL}/${this.state.boardState._id}`,{listName});
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
        const {boardState} = this.state;
        return (
            <div className={"board-detail-page"} style={{minHeight:"100vh", backgroundColor: boardState.theme}}>
                <Header/>
                <BoardHeader boardName={boardState.boardName}/>
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