var app = getApp();
const config = require("../../config.js")
Page({
  data: {
    Filled:false,
    disbaled: true,
    userInfo:{},
    open_id:app.d.open_id,
  },
  onLoad:function(){
    var that=this;
    var open_id = wx.getStorageSync('open_id');
    that.setData({
      open_id:open_id,
    })
    wx.request({
      url: config.GET_USERINFO,
      method: 'post',
      data: {
        open_id:open_id
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code = "OK") {
          var userInfo=res.data.data;
          if(userInfo.hasOwnProperty('mobile_phone')){
            if (userInfo.mobile_phone !== "") {
              that.setData({
                Filled: true,
                userInfo: userInfo
              })
            }
          }
        }

        if(res.data.code='FAIL'){

        }
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })

  },

  modify:function(){
   this.setData({
   Filled: false,
  })

  },
  //提交用户个人信息
  formSubmit: function (e) {
    var that=this;
    var userInfo = e.detail.value;
    if (userInfo.userName == "") {
      wx.showToast({
        title: 'input name！',
        duration: 2000,
        icon: "none"
      });
    }  else if (userInfo.university == "") {
      wx.showToast({
        title: 'input address！',
        duration: 2000,
        icon: "none"
      });
    } else if (userInfo.subject == "") {
      wx.showToast({
        title: 'input subject！',
        duration: 2000,
        icon: "none"
      });
    } else if (userInfo.university == "") {
      wx.showToast({
        title: 'input academic degree！',
        duration: 2000,
        icon: "none"
      });
    } else {
      app.globalData.userInfo = userInfo;
      console.log('填写个人信息', userInfo);
      console.log('填写个人信息', app.globalData.userInfo);
      //上传用户信息
      wx.request({
        url: config.UPDATE_PERSON_USERINFO,
        method: 'post',
        data: {
          token:app.d.token,
          open_id:that.data.open_id,
          user_name:userInfo.user_name,
          mobile:userInfo.mobile,
          email:userInfo.email,
          university:userInfo.university,
          subject:userInfo.subject,
          degree:userInfo.degree
        },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res); 
          wx.showToast({
            title: "success",
            duration: 2000,
            icon: "success"
          });
          setTimeout(function () {
            wx.navigateBack({

            })
          }, 2500);    
        },
        fail: function (e) {
          wx.showToast({
            title: 'update fail！',
            duration: 2000
          });
        },
      })
    }
  },
  
})