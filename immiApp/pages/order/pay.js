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
    orderSn:0,
    //标识用户
    token:app.d.token,
    open_id:app.d.open_id,
  },

  onLoad:function(){
    var that=this;
    var open_id = wx.getStorageSync('open_id');
    var token = wx.getStorageSync('token');
    if(open_id){
      that.setData({
        open_id:open_id,
      })
    }
    if (token) {
      that.setData({
        token: token,
      })
    }
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

//提交订单
  placeOrder:function(){
    var that=this;
    this.setData({
      showModal: true
    })
    console.log(that.data.evalateInfo)
    var evalateInfo = that.data.evalateInfo;
    var params={
      token:that.data.token,
      publication: evalateInfo.pubNum,
      citation: evalateInfo.citaNum,
      review: evalateInfo.revNum,
      immigration_type: evalateInfo.ImmType,
      payment:that.data.total,
    }
    common.shopCall("POST", config.PLACE_ORDER,params,(data)=>{
      console.log("下单成功");
      console.log(data)
      var orderInfo=data.order_info;
      //app.globalData.orderInfo=orderInfo;
      that.setData({
        orderId: orderInfo.order_id,
      })
    })
    
  },

  //弹出框蒙层截断touchmove事件
 
  preventTouchMove: function () {
  },

  // 隐藏模态对话框

  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
 
  //对话框取消按钮点击事件
 
  onCancel: function () {
    this.hideModal();
  },
  
  // 对话框确认按钮点击事件
   
  onConfirm: function () {
    var that= this;
    this.hideModal();
    var params={
      token:that.data.token,
      order_id:that.data.orderId,
      new_status:"PAID"
    }
    common.shopCall("POST", config.CHANGE_ORDER_STATUS,params,(data)=>{
      wx.showToast({
        title: 'success pay',
        duration:2000,
        icon:"success"
      })
      setTimeout(function(){
        wx.switchTab({
          url: '../user/user',
        })
      },2500);
      /*setTimeout(function () {
        wx.redirectTo({
          url: '../index/index',
        });
      }, 2500);*/
    },(error)=>{
      wx.showToast({
        title: 'fail pay',
        duration: 2000,
        icon: "none"
      })
      setTimeout(function () {
        wx.switchTab({
          url: '../user/user',
        })
      }, 2500);
     /* setTimeout(function () {
        wx.redirectTo({
          url: '../user/dingdan?currentTab=1&otype=deliver',
        });
      }, 2500);*/
    })
  },
});