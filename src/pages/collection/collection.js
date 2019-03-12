import React, { Component } from 'react'
import './collection.scss'
import { getSongListDetail } from '../../api'
import { Icon } from 'antd'
import store from '../../store';
import { setShowPlayer, setCurrentMusic } from '../../store/actions';

class songList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collectionDetail: null,
            currentIndex: -1,
        };
    }

    playMusic(music, index) {
        console.log(music)
        this.setState({
            currentIndex: index
        })
        store.dispatch(setShowPlayer(true))
        store.dispatch(setCurrentMusic(music))
    }

    componentDidMount() {
        console.log(this.props);
        getSongListDetail({id: this.props.match.params.id}).then(res => {
            this.setState({
                collectionDetail: res.result
            });
        })
    }
    
    render() {
        const { collectionDetail, currentIndex } = this.state;
        return (
            <div>
            { collectionDetail && 
                <div className="song-list">
                    <img className="cover" src={collectionDetail.coverImgUrl} alt="" />
                    <header>
                        <Icon className="back" onClick={() => {this.props.history.goBack()}} type="arrow-left" style={{fontSize: "24px", color: "#fff"}} />
                        { collectionDetail.name }
                    </header>
                    <div className="song-list-detail">
                        <div className="left-part" data-play={Math.round(collectionDetail.playCount / 10000) + '万'}>
                            <img className="song-img" src={collectionDetail.coverImgUrl} alt=""/>
                        </div>
                        <div className="right-part">
                            <p className="song-title">{collectionDetail.name}</p>
                            <div className="creator">
                                <img className="avatar" src={collectionDetail.creator.avatarUrl} alt="avatar"/>
                                <span className="nickname">{collectionDetail.creator.nickname}</span>
                            </div>
                        </div>
                    </div>
                    <div className="song-wrapper">
                    {
                        collectionDetail.tracks.map((track, index) => 
                            <div onClick={() => this.playMusic(track, index)} className={index === currentIndex ? `${'track-item'} ${'active'}` : 'track-item'} key={track.id} data-index={index + 1}>
                                <div className="track-name">{track.name}</div>
                                <div className="track-desc">{track.artists[0].name} - {track.album.name}</div>
                            </div>
                        )
                    }
                    </div>
                </div>
            }
            </div>
        );
    }
}

export default songList;