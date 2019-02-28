import React, {Component} from 'react'
import { getBanner, getPersonalized } from '../../api/index'
import { HTTP_OK } from '../../config/config'
import { Carousel, Icon } from 'antd'
import RecommendList from '../../components/recommentList/recommentList'

import './discover.scss'

class Discover extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [], // 轮播图
            personalized: [],   // 推荐歌单
        }
    }

    goSongList(id) {
        // todo 去具体的歌单页面
    }

    componentDidMount() {
        console.log(this.props);
        getBanner().then(res => {
            console.log(res, 'banner');
            if (res.status === HTTP_OK) {
                this.setState({
                    bannerList: res.data.banners
                })
            }
        })
        getPersonalized().then(res => {
            if (res.status === HTTP_OK) {
                this.setState({
                    personalized: res.data.result
                })
            }
        })
    }

    render() {
        const { bannerList, personalized } = this.state;
        return(
            <div className="discover">
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
                    <div>
                        <span className="music"></span>
                        <span>歌单</span>
                    </div>
                    <div>
                        <span className="rank"></span>
                        <span>排行版</span>
                    </div>
                </div>
                <RecommendList title={'推荐歌单'} list={personalized} onItemClick={this.goSongList}></RecommendList>
            </div>
        );
    }
}

export default Discover