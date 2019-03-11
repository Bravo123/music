import React, { Component } from 'react'
import './player.scss'
import { Icon } from 'antd';

class player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMiniPlayer: true,
        }
    }

    componentDidMount() {
    }
    
    render() {
        const { showMiniPlayer } = this.state;
        return (
            <div className="player">
            { showMiniPlayer && <div className="wrapper">
                <img className="cover" src="../../static/icon_playlist.png" alt="" />
                <div className="music-info">
                    <div className="name">樱</div>
                    <div className="author">春</div>
                </div>
                <Icon className="icon" type="pause-circle" style={{fontSize: '30px'}} />
                <Icon className="icon" type="play-circle" style={{fontSize: '30px'}} />
                <Icon className="icon" type="menu-unfold" style={{fontSize: '30px'}} />
            </div>
                
            }
            </div>
        );
    }
}

export default player;