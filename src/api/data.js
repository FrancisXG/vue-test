import axios from '@/api/axios'

export const getBannerData = () => {
    return axios.request({
        url:"banner",
        methods: "get"
        
    })
}