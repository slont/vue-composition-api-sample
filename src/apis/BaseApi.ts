import axios, {AxiosRequestConfig, AxiosError, AxiosInstance} from 'axios'
import qs from 'qs'

export default class BaseApi {

  static getHeaders() {
    return {
      'X-Requested-With': location.href,
      'Content-Type': 'application/json',
      'Authorization': `Bearer <TOKEN>`
    }
  }

  static stringify = (query = {}) => qs.stringify(query, {indices: false})

  protected axios: AxiosInstance

  constructor(baseURL: string) {
    this.axios = axios.create({baseURL, headers: BaseApi.getHeaders()})
  }

  public async get(id: string | number, query = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .get(`/${id}?${BaseApi.stringify(query)}`, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async getList(params = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.axios
        .get('', {params, ...config})
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async post(data = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .post('', data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async put(id: string | number, data = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .put(`/${id}`, data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async patch(id: string | number, data = {}, config: AxiosRequestConfig = {}) {
    return this.axios
        .patch(`/${id}`, data, config)
        .then(this.postFetch.bind(this))
        .catch(this.postError.bind(this))
  }

  public async delete(id: string | number, config: AxiosRequestConfig = {}) {
    return this.axios
        .delete(`/${id}`, config)
        .catch(this.postError.bind(this))
  }

  protected postFetch(response = {data: {}}) {
    return Promise.resolve({
      data: this.deserialize(response.data)
    })
  }

  protected postError(error: AxiosError) {
    // なんかの共通エラー処理
    // ...
    throw error
  }

  protected deserialize(json = {}): any {
    return json
  }
}
