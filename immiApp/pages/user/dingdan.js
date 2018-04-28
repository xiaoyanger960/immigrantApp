// pages/user/dingdan.js
//index.js  
//获取应用实例  
var app = getApp();
const config = require("../../config.js")
const common = require("../../utils/common.js")
Page({  
  data: {  
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  
    isStatus:'pay',//10待付款，20待发货，30待收货 40、50已完成
    page:0,
    refundpage:0,
    orderList: [{
      "order_id": 1,
      "order_sn": "18021250445844",
      "open_id": "olx8H0Tx0rlev97sa2bCIOQcWVKo",
      "status": "INIT",
      "payment": "200.00",
      "order_time": "2018-02-05 10:31:42",
      "pay_time": null,
      "publication": 200,
      "citation": 200,
      "review": 100,
      "immigration_type": "EB1A",
      "user_info": {
        "open_id": "olx8H0UHfk3RrzTe4ofZBWzl8J-0",
        "nick_name": "小样儿960",
        "user_name": "刘小倪",
        "avatar_url": "https://wx.qlogo.cn/mmopen/vi_32/wUMSLGCic1FOhTM5yV1Nw3S7txib7v0Fp0TPogtegNUeqvKS9t0OFxRiaqo27KgxtwReJmicUkeHl3FX2fxVVuZwmA/0",
        "gender": 2,
        "city": "Hangzhou",
        "province": "Zhejiang",
        "country": "China",
        "language": "zh_CN",
        "status": "NORMAL",
        "mobile": "13588235393",
        "email": "xiaoni960@163.com",
        "university": "杭州电子科技大学",
        "subject": "数字媒体技术",
        "degree": "本科",
      }
    },
    {
      "order_id": 2,
      "order_sn": "18021250445844",
      "open_id": "olx8H0Tx0rlev97sa2bCIOQcWVKo",
      "status": "INIT",
      "payment": "200.00",
      "order_time": "2018-02-05 10:31:42",
      "pay_time": null,
      "publication": 200,
      "citation": 200,
      "review": 100,
      "immigration_type": "EB1A",
      "user_info": {
        "open_id": "olx8H0UHfk3RrzTe4ofZBWzl8J-0",
        "nick_name": "小样儿960",
        "user_name": "刘小倪",
        "avatar_url": "https://wx.qlogo.cn/mmopen/vi_32/wUMSLGCic1FOhTM5yV1Nw3S7txib7v0Fp0TPogtegNUeqvKS9t0OFxRiaqo27KgxtwReJmicUkeHl3FX2fxVVuZwmA/0",
        "gender": 2,
        "city": "Hangzhou",
        "province": "Zhejiang",
        "country": "China",
        "language": "zh_CN",
        "status": "NORMAL",
        "mobile": "13588235393",
        "email": "xiaoni960@163.com",
        "university": "杭州电子科技大学",
        "subject": "数字媒体技术",
        "degree": "本科",
      }
    }],
  },  
  onLoad: function(options) {  
    this.setData({
      currentTab: parseInt(options.currentTab),
      isStatus:options.otype
    });
    this.loadOrderList();
  },


  loadOrderList: function(){
    var that = this;
    var params={
      token:app.d.token,
      status:that.data.isStatus
    }
    common.shopCall("POST", config.GET_ORDER_LIST,params,(data)=>{
      console.log("加载订单成功");
      var orderList=data.order_list;
      that.setData({
        orderList:orderList
      })

    })

   
  },

  bindChange: function(e) {  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  },  
  

  payOrderByWechat: function (e) {
    var order_id = e.currentTarget.dataset.orderId;
    var order_sn = e.currentTarget.dataset.ordersn;
    if(!order_sn){
      wx.showToast({
        title: "订单异常!",
        duration: 2000,
      });
      return false;
    }
    wx.request({
      url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
      data: {
        order_id: order_id,
        order_sn: order_sn,
        uid: app.d.userId,
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        if (res.data.status == 1) {
          var order = res.data.arr;
          wx.requestPayment({
            timeStamp: order.timeStamp,
            nonceStr: order.nonceStr,
            package: order.package,
            signType: 'MD5',
            paySign: order.paySign,
            success: function (res) {
              wx.showToast({
                title: "支付成功!",
                duration: 2000,
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '../user/dingdan?currentTab=1&otype=deliver',
                });
              }, 3000);
            },
            fail: function (res) {
              wx.showToast({
                title: res,
                duration: 3000
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
      fail: function (e) {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    })
  },
  //切换导航栏
  swichNav: function (e) {
    var that = this;
    if (that.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var current = e.target.dataset.current;
      that.setData({
        currentTab: parseInt(current),
        isStatus: e.target.dataset.otype,
      });
    };
    that.loadOrderList();
  }, 

})