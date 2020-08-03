import axios from 'axios'
import config from '@/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {
                //请求头
            }
        }
    }
    // 拦截
    interceptors(instance, url) {
        instance.interceptors.request.use((config) => {
            //处理config
            console.log('拦截和处理请求')
            console.log(config)
            return config
        })
        instance.interceptors.response.use((res) => {
            // 处理响应
            console.log("处理响应")
            console.log(res)
            return res
        }, (error) => {
            // 请求出问题，处理问题
            console.log(error)
            return { error: "网络出错了" }
        })
    }
    request(options) {
        // 创建实例对象
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}


const axiosObj = new HttpRequest(baseUrl)
export default axiosObj