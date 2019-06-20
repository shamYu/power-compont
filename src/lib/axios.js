import axios from 'axios'
import store from '@/store'
const BASE_URL = 'http://192.168.3.18:8090/maas-aqi';
// const axios = Axios.create({
//     baseURL: 'http://192.168.3.18:8090/maas-aqi',
//     timeout: 3000
// })

import Vue from '@/powerData'

class HttpRequest {
    constructor( baseUrl = BASE_URL) {
        this.baseUrl = baseUrl
        this.queue = {} //队列
    }

    getInsideConfig () {
        const config = {
            baseURL: this.baseUrl,
            headers: {}
        }
        return config
    }

    //拦截器
    interceptors (instance, url) {

        //请求拦截
        instance.interceptors.request.use( config => {
            if(!Object.keys(this.queue).length){
                //添加全局loading
                store.commit('showLoading')
            }
            this.queue[url] = true
            return config
        },error => {
            return Promise.reject(error)
        })

        //响应拦截
        instance.interceptors.response.use( res => {
            delete this.queue[url]
            if(!Object.keys(this.queue).length){
                //隐藏loading
                store.commit('hideLoading')
            } 
            const { data, status } = res;
            return { data, status }
        }, error => {
            delete this.queue[url]
            return Promise.reject(error)
        })
    }

    requst (options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(),options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}

const httpRequest = new HttpRequest()

export default httpRequest