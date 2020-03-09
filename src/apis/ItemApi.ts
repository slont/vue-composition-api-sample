import BaseApi from './BaseApi'
import {Item} from '@/types'
import {AxiosRequestConfig} from 'axios'

export default class ItemApi extends BaseApi {

  // エンティティの各種プロパティはここでデシリアライズ
  static _deserialize(json: Item) {
    if (!json) return {}

    return Object.assign({}, json, {
      selected: false,
      createdAt: json.createdAt ? new Date(json.createdAt) : null,
      updatedAt: json.updatedAt ? new Date(json.updatedAt) : null
    })
  }

  constructor() {
    super(`${process.env.VUE_APP_API_ENDPOINT}/v1/items`)
  }

  /** BaseApiにあるため、本来は不要だが、今回はスタブとして返すため **/
  public getList(params = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return Promise.resolve({
      data: {
        items: [
          {id: '1', name: 'name-1', createdAt: 1583734256520, updatedAt: 1583734256520},
          {id: '2', name: 'name-2', createdAt: 1583734256520, updatedAt: 1583734256520},
          {id: '3', name: 'name-3', createdAt: 1583734256520, updatedAt: 1583734256520}
        ].map(ItemApi._deserialize),
        count: 3,
        perPage: 20,
        nextCursor: null
      }
    })
  }
  /** ここまで **/

  deserialize(json: any) {
    // 配列レスポンスの場合
    if ('items' in json) {
      return {...json, items: json.items.map(ItemApi._deserialize)}
    }
    return ItemApi._deserialize(json)
  }
}
