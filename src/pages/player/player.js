import React, { Component } from 'react'
import './player.scss'
import { Icon } from 'antd';
import { fullAudioSrc } from '../../utils/utils';
import store from '../../store';
import { setCurrentMusic, setCurrentIndex } from '../../store/actions';

class player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMiniPlayer: true,
            isPlaying: true,
            currentIndex: -1
        }
        this.audioPlayer = React.createRef()
        this.toggleStatus = this.toggleStatus.bind(this)
        this.musicEnded = this.musicEnded.bind(this);
    }

    toggleStatus() {
        if (this.audioPlayer.current.paused) {
            this.audioPlayer.current.play()
        } else {
            this.audioPlayer.current.pause()
        }
        this.setState({
            isPlaying: !this.state.isPlaying
        })
    }

    musicEnded() {
        // 自动播放playList中的下一首
        this.setState({
            currentIndex: this.state.currentIndex + 1
        }, () => {
            store.dispatch(setCurrentIndex(this.state.currentIndex))
            store.dispatch(setCurrentMusic(this.props.playList.tracks[this.state.currentIndex]))
        })
        console.log(this.state)
    }

    componentDidMount() {
        this.setState({
            currentIndex: this.props.currentIndex
        }, () => {
            console.log(this.props)
        })
    }

    render() {
        const { showMiniPlayer, isPlaying } = this.state
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
                <audio onEnded={this.musicEnded} autoPlay ref={this.audioPlayer} src={fullAudioSrc(this.props.currentMusic.id)}></audio>
            </div>
                
            }
            </div>
        );
    }
}

export default player;