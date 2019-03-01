import axios from 'axios';
import {URL, HTTP_OK} from '../config/config'

export function ajax(options) {
    return new Promise((resolve, reject) => {
        axios({
            url: `${URL}/${options.api}`,
            method: options.method || 'get',
            [options.method === 'post' ? 'data' : 'params']: options.data
        }).then(response => {
            if (response.status === HTTP_OK) {
                resolve(response.data);
            } else {
                console.log(response);
                reject(response.data);
            }
        })
    })
}