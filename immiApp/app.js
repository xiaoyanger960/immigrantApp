// app.js
const config = require("config.js")
App({
  d: {
    userId: 1,
    token: 1,
    appId: "wx91a0b72999ba4ecf",
    appKey: "3283d346054ce2b8488af5f2656fbab8",   
  },
  

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.getUserInfo();
  },  

  //登录并获取用户信息
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo);
      console.log(this.globalData.userInfo);
    }else{
      //调用登录接口获取登录凭证code
      wx.login({
        success: function (res) {
          var code = res.code;
          console.log('小程序调用wx.login获取的code',code)
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
              that.getUserSessionKey(code);
              //console.log(res.userInfo);
            }
          });
        }
      });
    }
  },

  //获取会话密钥
  getUserSessionKey:function(code){
    var that = this;
    wx.request({
      url: config.CODE_COMES,
      method:'post',
      data: {
        code: code
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {      
        var data = res.data.data;
        //console.log(data);    //token user_info{....}
        var token = data.token;  
        that.globalData.token = token;   
        that.globalData.userInfo['token'] = token;        
        that.globalData.userInfo['id'] = data.user_info.wx_app_open_id;
        var userId = data.user_info.wx_app_open_id;

        if (!userId) {
          wx.showToast({
            title: '登录失败！',
            duration: 3000
          });
          return false;
        }
        that.d.userId = userId;
        that.d.token = token;
        that.onLoginUser();
      
      },
      fail:function(e){
        wx.showToast({
          title: '网络异常！err:getsessionkeys',
          duration: 2000
        });
      },
    });
  },

  //上传用户信息
  onLoginUser:function(){
    var that = this;
    var user = that.globalData.userInfo;
    var token = that.d.token;
    wx.request({
      url: config.UPDATE_USERINFO,
      method:'post',
      data: {
        token: token,
        nick_name: user.nickName,
        avatar_url: user.avatarUrl,
        gender:user.gender,   
        city:user.city,
        province: user.province,
        country:user.country,        
        language:user.language
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {    
        //console.log(res.data);   OK done:4
        var data = res.data;     
      },
      fail:function(e){
        wx.showToast({
          title: '网络异常！err:authlogin',
          duration: 2000
        });
      },
    });
  },

 globalData:{
    userInfo:null,
    products: [],
    carts:[],
    token:''
  },

  onPullDownRefresh: function (){
    wx.stopPullDownRefresh();
  },

  globalData: {
    evalateInfo:{},
    userInfo:null,
  }
});





