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
    isStatus:'INIT',//10待付款，20待发货，30待收货 40、50已完成
    page:0,
    refundpage:0,
    orderList: [],
    token:'',
    open_id:'',
  },  
  onLoad: function(options) {  
    var that=this;
    var open_id = wx.getStorageSync('open_id');
    var token = wx.getStorageSync('token');
    if (open_id) {
      that.setData({
        open_id: open_id,
      })
    }
    if (token) {
      that.setData({
        token: token,
      })
    }
    this.setData({
      currentTab: parseInt(options.currentTab),
      isStatus:options.otype
    });
    this.loadOrderList();
  },


  loadOrderList: function(){
    var that = this;
    var params={
      open_id:that.data.open_id,
      token:that.data.token,
      //status:'ALL',
      status:that.data.isStatus
    }
    common.shopCall("POST", config.ORDER_LIST,params,(data)=>{
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