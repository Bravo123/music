import React, {Component} from 'react'
import { getBanner, getPersonalized } from '../../api/index'
import { Carousel, Icon } from 'antd'
import RecommendList from '../../components/recommentList/recommentList'

import './discover.scss'

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [], // 轮播图
            personalized: [],   // 推荐歌单
            loading: true,
        };
        this.goCollection = this.goCollection.bind(this);
        this.goHotCollectionList = this.goHotCollectionList.bind(this);
    }

    goCollection(id) {
        // todo 去具体的歌单页面
        console.log(this.props);
        this.props.history.push(`/collection/${id}`);
    }

    goHotCollectionList() {
        // 去歌单列表
        this.props.history.push('/collectionList');
    }

    componentDidMount() {
        Promise.all([
            getBanner(),
            getPersonalized(),
        ]).then(res => {
            this.setState({
                bannerList: res[0].banners,
                personalized: res[1].result,
                loading: false
            })
        })
    }

    render() {
        const { loading, bannerList, personalized } = this.state;
        return(
            <div className="discover">
                { !loading && <div>
                    <div className="header">
                        <Icon type="menu-unfold" style={{ fontSize: '24px', color: '#fff' }} />
                        <img src="static/logo.png" alt=""/>
                        <Icon type="search" style={{ fontSize: '24px', color: '#fff' }} />
                    </div>
                    <Carousel autoplay>
                    {
                        bannerList.length > 0 && bannerList.map((item, index) => <div 
                            className="banner-item"
                            key={item.id + index}>
                            <img className="banner-image" src={item.picUrl} alt={item.name}/>
                        </div>
                        )
                    }
                    </Carousel>
                    <div className="menu">
                        <div onClick={this.goHotCollectionList}>
                            <span className="music"></span>
                            <span>歌单</span>
                        </div>
                        <div>
                            <span className="rank"></span>
                            <span>排行版</span>
                        </div>
                    </div>
                    <RecommendList title={'推荐歌单'} list={personalized} goCollectionList={this.goHotCollectionList} onItemClick={this.goCollection}></RecommendList>
                </div> }
            </div>
        );
    }
}

export default Discover