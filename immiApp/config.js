/**
 * 小程序配置文件
 */

var host = "localhost:8080/"

var config = {

  hostImg: `https://${host}/public/upload/`,  

  // 微信用户登录
  CODE_COMES: `https://${host}/public/wxAppUserCodeComes`,

  // 更新用户信息
  UPDATE_USERINFO: `https://${host}/public/updateWxUserInfo`,

  // 获取高校信息列表
  UNIVER_LIST: `https://${host}/public/HomeController/universityList`,

  //搜索高校
  SEARCH: `https://${host}/public/HomeController/search`,

  // 获取用户信息
  GET_USERINFO: `https://${host}/public/UserController/getUserInfo`,

  // 创建订单
  PLACE_ORDER: `https://${host}/OrderController/placeOrder`,

  //记录支付结果
  RECORD_ORDER: `https://${host}/OrderController/recordOrder`,

  // 获取订单列表
  GET_ORDER_LIST: `https://${host}/OrderController/getOrderList`,
};

module.exports = config
