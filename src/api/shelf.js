import { wxRequest } from '@/utils/fetch'
import { shelfUrl } from '@/utils/config'

// 获取商品分类
const getCatesAndGoodsList = (params) => {
  const subUrl = '/api/retail/shelf/client/goods/queryCategoryAndGoods'
  params.method = 'POST'
  return wxRequest(params, `${shelfUrl}${subUrl}`)
}

// 获取货架信息信息
const getShelfInfo = (params) => {
  const subUrl = '/api/retail/shelf/client/goods/queryShelfInfo'
  params.method = 'POST'
  return wxRequest(params, `${shelfUrl}${subUrl}`)
}

export default {
  getCatesAndGoodsList,
  getShelfInfo
}
