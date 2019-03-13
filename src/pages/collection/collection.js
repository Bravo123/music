import React, { Component } from 'react'
import './collection.scss'
import { getSongListDetail } from '../../api'
import { Icon } from 'antd'
import store from '../../store'
import { setShowPlayer, setCurrentMusic, setPlayList, setCurrentIndex } from '../../store/actions'
import { connect } from 'react-redux'
class songList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collectionDetail: null,
        };
    }

    playMusic(music, index) {
        this.setState({
            currentIndex: index
        })
        store.dispatch(setShowPlayer(true))
        store.dispatch(setCurrentMusic(music))
        store.dispatch(setPlayList(this.state.collectionDetail))
        store.dispatch(setCurrentIndex(index))
        // store.dispatch(setAllPlay(this.state.collectionDetail, index))
    }

    componentDidMount() {
        getSongListDetail({id: this.props.match.params.id}).then(res => {
            this.setState({
                collectionDetail: res.result,
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
                            <div onClick={() => this.playMusic(track, index)} className={index === this.props.currentIndex ? `${'track-item'} ${'active'}` : 'track-item'} key={track.id} data-index={index + 1}>
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

const mapStateToProps = state => ({
    // showPlayer: state.showPlayer,
    // currentMusic: state.currentMusic,
    // playList: state.playList,
    currentIndex: state.currentIndex,
})
  
export default connect(mapStateToProps)(songList)

// export default songList;
