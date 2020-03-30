import React, {Component} from 'react';
import Router from "next/router";
import {isAuth} from "../helpers/auth";
import Header from "../components/header/Header";
import {Icon} from "office-ui-fabric-react";
import {Dialog,DialogType, TextField, ContextualMenu} from "office-ui-fabric-react";


class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideDialog: true
        };
        this._dragOption = {
            moveMenuItemText: 'Move',
            closeMenuItemText: 'Close',
            menu: ContextualMenu
        }
    }

    componentDidMount() {
        if(!isAuth()){
            Router.push("/");
        }
    }

    closeDialog = () => {
        this.setState({
            hideDialog: true
        })
    };

    showDialog = () => {
        this.setState({
            hideDialog: false
        })
    };

    render() {
        const {hideDialog} = this.state;
        return (
            <div id='boards-page'>
                <Header/>
                <Dialog
                    hidden={hideDialog}
                    dialogContentProps={{
                        type: DialogType.largeHeader,
                        title: 'Create new board',
                    }}
                    onDismiss={this.closeDialog}
                    modalProps={{
                        styles: { main: { maxWidth: 450 } },
                        dragOptions: this._dragOption
                    }}
                >

                </Dialog>
                <div className={"boards-container"}>
                    <div className="container">
                        <h2>
                            <Icon iconName={"FabricUserFolder"}/>&nbsp; Personal boards:
                        </h2>
                        <div className="board-grid">
                            <div className='item'>
                                <div className="board-card create-card" title="Create new board" onClick={this.showDialog}>
                                    <a href="javascript:void(0)" className="card-link">
                                        <Icon iconName={"CirclePlus"}/>&nbsp; Create new board
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

export default Boards;
