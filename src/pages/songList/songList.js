import React, { Component } from 'react';
import './songList.scss';

class songList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            songListId: ''
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            songListId: this.props.match.params.id
        }, () => {
            console.log(this.state.songListId);
        });
    }
    
    render() {
        return (
            <div>
                歌单
            </div>
        );
    }
}

export default songList;