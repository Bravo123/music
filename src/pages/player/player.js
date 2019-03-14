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
            currentIndex: -1,
            isShowPlayList: false,
        }
        this.audioPlayer = React.createRef()
        this.toggleStatus = this.toggleStatus.bind(this)
        this.musicEnded = this.musicEnded.bind(this)
        this.togglePlayList = this.togglePlayList.bind(this);
    }

    togglePlayList() {
        this.setState({
            isShowPlayList: !this.state.isShowPlayList
        })
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

    playMusic(music, index) {
        this.setState({
            currentIndex: index,
            isPlaying: true,
        })
        store.dispatch(setCurrentMusic(music))
        store.dispatch(setCurrentIndex(index))
    }

    removeMusic(e, music, index) {
        e.stopPropagation()
        console.log(e, music, index)
    }

    musicEnded() {
        // 自动播放playList中的下一首
        let currentIndex = this.state.currentIndex >= this.props.playList.tracks.length ? 1 : this.state.currentIndex + 1;
        this.setState({
            currentIndex: currentIndex
        }, () => {
            store.dispatch(setCurrentIndex(this.state.currentIndex))
            store.dispatch(setCurrentMusic(this.props.playList.tracks[this.state.currentIndex]))
        })
    }

    componentDidMount() {
        this.setState({
            currentIndex: this.props.currentIndex
        }, () => {
            console.log(this.props)
        })
    }

    render() {
        const { showMiniPlayer, isPlaying, isShowPlayList, currentIndex } = this.state
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
                <Icon className="icon" onClick={this.togglePlayList} type="menu-unfold" style={{fontSize: '30px'}} />
                <audio onEnded={this.musicEnded} autoPlay ref={this.audioPlayer} src={fullAudioSrc(this.props.currentMusic.id)}></audio>
            </div>
            }
            { isShowPlayList && <div className="play-list">
                <div className="mask" onClick={this.togglePlayList}></div>
                <div className="wrapper">
                    <header>当前播放数：{this.props.playList.tracks.length}</header>
                    <ul className="list">
                        { this.props.playList.tracks.map((item, index) => <li key={index + item.id} className={currentIndex === index ? `${'active'} ${'item'}` : 'item'} onClick={() => {this.playMusic(item, index)}}>
                            {item.name} - {item.artists[0].name}
                            <Icon type="close" onClick={(e) => {this.removeMusic(e, item, index)}} style={{fontSize: '24px', color: '#999', marginRight: '20px'}} />
                        </li>)
                        }
                    </ul>
                </div>
            </div>
            }
            </div>
        );
    }
}

export default player;