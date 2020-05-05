import React,{Component} from 'react';
import ListHeader from "./ListHeader";
import ListFooter from "./ListFooter";
class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listName: this.props.listInfo.listName
        }
    }

    setListName = (name) => {
        this.setState({
            listName: name
        })
    };

    render() {
        const {listName} = this.state;
        return (
            <div className="list-card">
                <ListHeader listName={listName} setListName={this.setListName}/>
                <div className="list-body">
                </div>
                <ListFooter/>
            </div>
        )
    }
}

export default List;