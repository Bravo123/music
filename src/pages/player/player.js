import React, { Component } from 'react'
import './player.scss'
import { getSongListDetail } from '../../api'
import { Icon } from 'antd'

class player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collectionDetail: null
        };
        this.playTrack = this.playTrack.bind(this);
    }

    playTrack(trackId) {
        console.log(trackId)
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
        const { collectionDetail } = this.state;
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
                            <div className="track-item" key={track.id} data-index={index + 1}>
                                <span className="track-name">{track.name}</span>
                                <span className="track-desc">{track.artists[0].name} - {track.album.name}</span>
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

export default player;