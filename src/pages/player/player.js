import React, { Component } from 'react'
import './player.scss'
import { Icon } from 'antd';

class player extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            showMiniPlayer: true,
            isPlaying: true,
        }
        this.audioPlayer = React.createRef()
        this.toggleStatus = this.toggleStatus.bind(this)
    }

    toggleStatus() {
        console.log(this.audioPlayer)
        if (this.audioPlayer.current.paused) {
            this.audioPlayer.current.play()
        } else {
            this.audioPlayer.current.pause()
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    render() {
        const { showMiniPlayer, isPlaying } = this.state;
        return (
            <div className="player">
            { showMiniPlayer && <div className="wrapper">
                <img className="cover" src={this.props.currentMusic.album.picUrl} alt="" />
                <div className="music-info">
                    <div className="name">{this.props.currentMusic.name}</div>
                    <div className="author">{this.props.currentMusic.artists[0].name}</div>
                </div>
                {isPlaying && <Icon className="icon" onClick={this.toggleStatus} type="pause-circle" style={{fontSize: '30px'}} />}
                {!isPlaying && <Icon className="icon" onClick={this.toggleStatus} type="play-circle" style={{fontSize: '30px'}} />}
                <Icon className="icon" type="menu-unfold" style={{fontSize: '30px'}} />
                <audio autoPlay ref={this.audioPlayer} src={`https://music.163.com/song/media/outer/url?id=${this.props.currentMusic.id}.mp3`}></audio>
            </div>
                
            }
            </div>
        );
    }
}

export default player;