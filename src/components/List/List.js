import React,{Component} from 'react';
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import * as cardAPIs from "../../API/card.api";

class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listName: this.props.listInfo.listName,
            cards: [],
            openCard: false
        }
    }

    handleChangeOpenForm = (value) => {
        this.setState({
            openCard: value
        })
    };

    setListName = (name) => {
        this.setState({
            listName: name
        })
    };

    renderCards = () => {

    };

    async componentDidMount() {
        if(process.browser){
            try {
                const cardResult = await cardAPIs.listCard(this.props.listInfo._id);
                this.setState({
                    cards: cardResult.data
                })
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    render() {
        return (
            <div className="list-card">
                <ListHeader
                    listInfo={this.props.listInfo}
                    setListName={this.setListName}
                    setOpenForm={this.handleChangeOpenForm}
                    deleteList={this.props.deleteList}
                />
                <div className="list-body">
                </div>
                <ListFooter
                    openForm={this.state.openCard}
                    setOpenForm={this.handleChangeOpenForm}
                    listInfo={this.props.listInfo}
                />
            </div>
        )
    }
}

export default List;