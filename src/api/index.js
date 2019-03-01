import { ajax } from '../utils/ajax';

//获取轮播
export function getBanner() {
  return ajax({
    api: 'banner',
    method: 'get'
  });
}
  
//获取推荐歌单
export function getPersonalized() {
  return ajax({
    api: 'personalized',
    method: 'get'
  });
}

// 获取歌单详情
export function getSongListDetail(id) {
  return ajax({
    api: 'playlist/detail',
    method: 'get',
    data: id
  });
}