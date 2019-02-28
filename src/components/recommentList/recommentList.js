import React from 'react';
import PropTypes from 'prop-types';
import './recommentList.scss';

const recommentList = props => {
    const {title, list, onItemClick} = props;
    return (
        <div className="recomment">
            <div className="header">{title}</div>
            <div className="recomment-list">
                {
                    list && list.length && list.map(item => 
                        <div className="wrapper" onClick={() => onItemClick(item.id)} data-play={Math.round(item.playCount / 10000) + '万'} key={item.id}>
                            <img className="song-img" src={item.picUrl} alt=""/>
                            <div className="song-title">{item.name}</div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

recommentList.propTypes = {
    title: PropTypes.string.isRequired, // 标题
    list: PropTypes.array.isRequired, // 列表
    onItemClick: PropTypes.func.isRequired // 点击事件
};

export default recommentList;