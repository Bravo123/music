import React, { Component } from 'react';
import { Icon } from 'antd';
import { getCollectionList } from '../../api';
import { formatPlayCount } from '../../utils/utils';
import './collectionList.scss';
import InfiniteScroll from 'react-infinite-scroller';

class collectionList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collectionData: {
                offset: 0,
                limit: 20,
                order: 'hot',
                more: true,
            },
            collectionList: [],
        }
        this.loadMore = this.loadMore.bind(this)
    }
    goCollection(id) {
        this.props.history.push(`/collection/${id}`);
    }
    loadMore() {
        console.log('loadmore')
        if (this.state.collectionData.more) {
            getCollectionList(this.state.collectionData).then(res => {
                this.setState({
                    collectionData: Object.assign(this.state.collectionData, {offset: this.state.collectionData.offset + this.state.collectionData.limit, more: res.more}),
                    collectionList: this.state.collectionList.concat(res.playlists)
                })
            })
        }
    }
    componentDidMount() {
        getCollectionList(this.state.collectionData).then(res => {
            this.setState({
                collectionData: Object.assign(this.state.collectionData, {offset: this.state.collectionData.offset + this.state.collectionData.limit, more: res.more}),
                collectionList: this.state.collectionList.concat(res.playlists)
            })
        })
    }
    render() {
        const { collectionList, collectionData } = this.state
        return (
            <div className="collection-list">
                <header><Icon type="left" onClick={() => {this.props.history.goBack()}} className="back" style={{ fontSize: '24px', color: '#fff' }} />歌单</header>
                <InfiniteScroll
                    className="list"
                    initialLoad={false}
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={collectionData.more}
                    useWindow={false}
                >
                { collectionList && collectionList.map((item, index) => <div className="item" key={item.id + index} onClick={this.goCollection.bind(this, item.id)} data-play={formatPlayCount(item.playCount)}>
                        <img src={item.coverImgUrl} alt="cover" />
                        <div className="name">{item.name}</div>
                    </div>) 
                }
                </InfiniteScroll>
            </div>
        );
    }
}

export default collectionList;