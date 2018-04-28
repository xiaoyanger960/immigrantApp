var app = getApp();
const config = require("../../config.js")
const common = require("../../utils/common.js")
Page({
  data:{
    hostImg:app.d.hostImg,
    itemData:{},
    userId:0,
    paytype:'weixin',
    remark:'',
    cartId:0,
    addrId:0,
    btnDisabled:false,
    address:{},
    total:500,
    vid:0,
    addemt:1,
    products:[],
    showModal: false,
    orderId:0,
    orderSn:0
  },

  onLoad:function(){
    var userInfo = app.globalData.userInfo;
    console.log('pay.js从全局获取的用户信息', userInfo);
    var evalateInfo = app.globalData.evalateInfo;
    console.log('pay.js从全局获取的评估信息', evalateInfo);
    var total=500;
    if (evalateInfo.immType=="EB1A"){
      total=500;
    } else if (evalateInfo.immType == "EB1B"){
      total = 400;
    }else{
      total = 300;
    }
    this.setData({
      userInfo: userInfo,
      evalateInfo: evalateInfo,
      total:total
    })
  },

  placeOrder:function(){
    var that=this;
    this.setData({
      showModal: true
    })
    var evalateInfo = that.data.evalateInfo;
    var params={
      token:app.d.token,
      publication: evalateInfo.publication,
      citation: evalateInfo.citation,
      review: evalateInfo.review,
      immigration_type: evalateInfo.immigration_type,
      payment:evalateInfo.total,
    }
    common.shopCall("POST", config.PLACE_ORDER,params,(data)=>{
      console.log("下单成功")
      var orderInfo=data.order_info;
      app.globalData.orderInfo=orderInfo;
      that.setData({
        orderId: orderInfo.order_id,
        orderSn: orderInfo.orderSn
      })
    })
    
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    var that= this;
    this.hideModal();
    var params={
      token:app.d.token,
      order_id:that.data.orderId,
      order_sn:that.data.orderSn,
      status:"PAID"
    }
    common.shopCall("POST", config.RECORD_ORDER,params,(data)=>{
      wx.showToast({
        title: 'success pay',
        duration:2000,
        icon:"success"
      })
      wx.switchTab({
        url: '../user/user',
      })
      /*setTimeout(function () {
        wx.redirectTo({
          url: '../user/dingdan?currentTab=1&otype=deliver',
        });
      }, 2500);*/
    },(error)=>{
      wx.showToast({
        title: 'fail pay',
        duration: 2000,
        icon: "none"
      })
      wx.switchTab({
        url: '../user/user',
      })
     /* setTimeout(function () {
        wx.redirectTo({
          url: '../user/dingdan?currentTab=1&otype=deliver',
        });
      }, 2500);*/
    })
  }

  //生命周期函数 监听页面加载
 /* onLoad:function(options){

    var total = 0;
    for (var i = 0; i < app.globalData.products.length; i++) {
        total += app.globalData.products[i].count * app.globalData.products[i].price;
        total = parseFloat(total);
      
    }
    this.setData({
      products: app.globalData.products,
      total: total
    });  
    this.loadDefaultAddr();
  },
  loadDefaultAddr:function(){
    var that = this;
    var dafaultAdd = [' DEFAULT']
    wx.request({
      url: app.d.ceshiUrl + 'AddressController/getUserAddressList',
      method:'post',
      data: {
        token:app.d.token,
        //status: dafaultAdd
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var adds = res.data.data.list[0];
        if (adds){
          var addrId = adds.id;
          that.setData({
            address: adds,
            addrId: addrId,
            addemt:0
          });
        }
        //that.setData({
          //addemt: res.data.addemt,       
       // });
      },
    });
  },

  remarkInput:function(e){
    this.setData({
      remark: e.detail.value,
    })
  },


//微信支付
  createProductOrderByWX:function(e){
    this.setData({
      paytype: 'weixin',
    });

    this.createProductOrder();
  },


  //确认订单
  createProductOrder:function(){
    this.setData({
      btnDisabled:false,
    })

    //创建订单
    var that = this;
    wx.request({
      url: app.d.ceshiUrl + 'OrderController/placeOrder',
      method:'post',
      data: {
        token:app.d.token,
        products:that.data.products,
        user_address_id: that.data.addrId,
       // remark: that.data.remark
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)     
        var data = res.data;
        if(data.status == 1){
          //创建订单成功
          if(data.arr.pay_type == 'weixin'){
            //微信支付
            that.wxpay(data.arr);
          }
        }else{
          wx.showToast({
            title:"下单失败!",
            duration:2500
          });
        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！err:createProductOrder',
          duration: 2000
        });
      }
    });
  },
  
  //调起微信支付
  wxpay: function(order){
      wx.request({
        url: app.d.ceshiUrl + '/Api/Wxpay/wxpay',
        data: {
          order_id:order.order_id,
          order_sn:order.order_sn,
          uid:this.data.userId,
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'Content-Type':  'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function(res){
          if(res.data.status==1){
            var order=res.data.arr;
            wx.requestPayment({
              timeStamp: order.timeStamp,
              nonceStr: order.nonceStr,
              package: order.package,
              signType: 'MD5',
              paySign: order.paySign,
              success: function(res){
                wx.showToast({
                  title:"支付成功!",
                  duration:2000,
                });
                setTimeout(function(){
                  wx.navigateTo({
                    url: '../user/dingdan?currentTab=1&otype=deliver',
                  });
                },2500);
              },
              fail: function(res) {
                wx.showToast({
                  title:res,
                  duration:3000
                })
              }
            })
          }else{
            wx.showToast({
              title: res.data.err,
              duration: 2000
            });
          }
        },
        fail: function() {
          // fail
          wx.showToast({
            title: '网络异常！err:wxpay',
            duration: 2000
          });
        }
      })
  },
  onUnload: function () {
    app.globalData.products.pop();
    //console.log(app.globalData.products);
  },
*/
});