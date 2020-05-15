import React,{Component} from 'react';
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
import * as cardAPIs from "../../API/card.api";

class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listName: this.props.listInfo.listName,
            cards: []
        }
    }

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
                console.log(cardResult.data);
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
        const {listName} = this.state;
        return (
            <div className="list-card">
                <ListHeader listName={listName} setListName={this.setListName}/>
                <div className="list-body">
                </div>
                <ListFooter listInfo={this.props.listInfo}/>
            </div>
        )
    }
}

export default List;