// pages/user/user.js
var app = getApp()
Page( {
  data: {
    orderInfo:{},  
    loadingText: '加载中...',
    loadingHidden: false,
  },

  //页面加载时执行的初始化工作
  onLoad: function () {
      var that = this; 
        that.setData({
          loadingHidden: true
        })
  },

 //页面打开时，触发执行的操作
  onShow:function(){
  },

  onShareAppMessage: function () {
    return {
      title: 'DIYimigrant',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})