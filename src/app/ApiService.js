import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080/minhasFinancasApi'//para usar no localhost
    //baseURL: 'http://10.30.10.26:8080/minhasFinancasApi'//para usar no server da empresa
})

class ApiService {
    constructor(apiurl) {
        this.apiurl = apiurl;
    }

    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.post(requestUrl,objeto);
    }

    put(url, objeto){
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.put(requestUrl,objeto);
    }

    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.delete(requestUrl);
    }

    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return httpClient.get(requestUrl);
    }
}

export default ApiService;