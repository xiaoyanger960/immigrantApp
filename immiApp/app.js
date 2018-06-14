// app.js
const config = require("config.js")
App({
  d: {
    //open_id 
    open_id:1,
    token: 1,
    appId: "wx91a0b72999ba4ecf",
    appKey: "3283d346054ce2b8488af5f2656fbab8",   
  },
  

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    //这次系统是按open_id来获取的
    var open_id = wx.getStorageSync('open_id');
    var token = wx.getStorageSync('token');
    this.d.open_id=open_id;
    this.d.token=token;
    if (!open_id){
      this.getUserInfo();
    }
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
          that.getUserSessionKey(code);
         wx.getUserInfo({
            success: function (res) {
              console.log('aaaa')
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo);
          
              console.log('获取微信用户信息',res);
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
      method:'POST',
      data: {
        code: code
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {  
        console.log('code换取token和userInfo的结果：',res);    
        var data = res.data.data;
        //console.log(data);    //token user_info{....}
        var token = data.token;   
        var open_id = data.user_info.wx_app_open_id; 

        wx.setStorageSync('token', token);
        wx.setStorageSync('open_id', open_id);
  

        if (!open_id) {
          wx.showToast({
            title: '登录失败！',
            duration: 3000
          });
          return false;
        }
        that.d.open_id = open_id;
        that.d.token = token;

        //在拿到token之后再调用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: res => {
                  console.log("来获取用户信息le")
                  this.globalData.userInfo = res.userInfo
                  that.onLoginUser();
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })




      
      },
      fail:function(e){
        console.log(e);   
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
    var open_id=that.d.open_id;
    wx.request({
      url: config.UPDATE_USERINFO,
      method:'post',
      data: {
        open_id:open_id,
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
        wx.setStorageSync('userInfo', that.globalData.userInfo); 
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





