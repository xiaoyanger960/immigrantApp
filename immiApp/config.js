/**
 * 小程序配置文件
 */

/*
  wx.request({
      url: ,
      method:'post',
      data: {},
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {

      },
      fail:function(e){
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
 */

var host = "http://localhost:8088/immigrantApi/index.php"

var config = { 

  // 微信用户登录
  CODE_COMES: `${host}/public/wxAppUserCodeComes`,

  // 更新用户微信信息
  UPDATE_USERINFO: `${host}/public/updateWxUserInfo`,

  //填写用户的个人信息
  UPDATE_PERSON_USERINFO: `${host}/UserController/updateUserInfo`,

  // 获取高校信息列表
  UNIVER_LIST: `${host}/public/universityList`,

  //获取高校信息
  UNIVER_INFO: `${host}/public/universityInfo`,

  //搜索高校
  SEARCH: `${host}/public/HomeController/search`,

  // 获取用户信息
  GET_USERINFO: `${host}/public/userInfo`,


  // 创建订单
  PLACE_ORDER: `${host}/OrderController/placeOrder`,

  //更改订单状态
  CHANGE_ORDER_STATUS: `${host}/OrderController/wxChangeOrderStatus`,

  // 获取订单列表 因为他还没有写好  所以我先用的Public
  ORDER_LIST: `${host}/OrderController/userOrderList`,

  //读取图片
  HOST_IMAGE: `${host}/public/upload/`,  
};

module.exports = config
