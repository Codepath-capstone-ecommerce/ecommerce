import axios from "axios"

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl
    this.token = null
    this.tokenName = "pizza_shop_token"
  }

  setToken(token) {
    this.token = token
    localStorage.setItem(this.tokenName, token)
  }

  async request({ endpoint, method = 'GET', data = {} }) {

    const url = `${this.remoteHostUrl}/${endpoint}`
    const headers = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers })
      return { data: res.data, error: null }
    } catch (error) {
      console.error({ errorResponse: error.response })
      const message = error?.response?.data?.error?.message
      return { data: null, error: message || String(error) }
    }
  }

  async fetchProductsByCategory(data){
    return await this.request({endpoint: 'products/category', method: "POST", data:data})
  }
  async fetchProductByName(data){
    return await this.request({ endpoint: 'products/byName', method: "POST", data:data})
  }

  async getWeeklyCustomers(data) {
    return await this.request({ endpoint: 'admin/weeklycustomers', method: "POST", data:data})
  }

  async getWeeklyOrders(data) {
    return await this.request({ endpoint: 'admin/weeklyorders', method: "POST", data:data})
  }

  async getCurrentOrders(){
    return await this.request({endpoint:'order/current', method:"GET"})
  }

  async getPastOrders(){
    return await this.request({endpoint:'order/past', method:"GET"})
  }

  async completeOrderDetailByID(data) {
    console.log(data)
    return await this.request({ endpoint: 'order/detailByID/complete', method: "POST", data:data})
  }
  
  async createOrder(data) {
    return await this.request({ endpoint: 'order/create', method: "POST", data:data})
  }

  async listProducts() {
    return await this.request({ endpoint: 'products/get', method: "GET" })
  }

  async listCart() {
    return await this.request({ endpoint: 'products/cart', method: "GET" })
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: 'auth/me', method: "GET" })
  }

  async loginUser(credentials) {
    return await this.request({ endpoint: 'auth/login', method: 'POST', data: credentials })
  }

  async signupUser(credentials) {
    return await this.request({ endpoint: 'auth/register', method: 'POST', data: credentials })
  }

  async logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, "")
  }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001")