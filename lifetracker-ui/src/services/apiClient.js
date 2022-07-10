import axios from "axios"

class ApiClient{

    constructor(remoteHostUrl){
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "lifetracker_token"
    }
    
    setToken(token){
        this.token = token
        localStorage.setItem(this.tokenName, token)
    }

    async request({ endpoint, method = `GET`, data = {}}) {
        const url = `${this.remoteHostUrl}/${endpoint}`

        const headers = {
            "Content-type": "application/json"
        }

        if(this.token) {
            headers["Authorization"] = `Bearer ${this.token}`
        }

        try{
            const res = await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        } catch(error){
            console.error({ errorResponse: error.response })
            const message = error?.response?.data?.error?.message
            return { data: null, error: message || String(error)}
        }
    }

    async createNutrition(nutrition){
        return await this.request({ endpoint: `nutrition/create`, method: `POST`, data: nutrition})
    }

    async loginUser(credentials){
        return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
    }

    async signupUser(credentials){
        return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
    }

    async fetchUserFromToken(){
        return await this.request({endpoint: `auth/me`, method: `GET`})
    }

    async getNutritions(){
        return await this.request({ endpoint: `nutrition`, method: `GET`})
    }

    async getNutritionById(nutritionId){
        return await this.request ( { endpoint: `nutrition/${nutritionId}`, method: `GET`})
    }

    async logoutUser() {
        this.setToken(null)
        localStorage.setItem(this.tokenName, "")
    }
}

const API = new ApiClient("https://lifetracker-gbb.herokuapp.com/")

export default API