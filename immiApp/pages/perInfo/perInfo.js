var app = getApp();
const config = require("../../config.js")
Page({
  data: {
    Filled:false,
    disbaled: true,
    userInfo:{},
  },
  onLoad:function(){
    var that=this;
    wx.request({
      url: config.GET_USERINFO,
      method: 'post',
      data: {
        token: app.d.token,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        if (res.data.code = "OK") {
          wx.showToast({
            title: "success",
            duration: 2000,
            icon: "success"
          });
          setTimeout(function () {
            wx.navigateBack({

            })
          }, 2500);
        }
      },
      fail: function (e) {
        var res=
          {
          "code": "OK",
            "data": {
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
          }
        }
        console.log(res);
        if(res.data.code="OK"){
          var userInfo=res.data.user_info
          if(userInfo.email){
            that.setData({
              Filled:true,
              userInfo:userInfo
            })

          }
        }
        /*wx.showToast({
          title: 'network err！',
          duration: 2000
        });*/
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
    var userInfo = e.detail.value;
    if (userInfo.userName == "") {
      wx.showToast({
        title: 'input name！',
        duration: 2000,
        icon: "none"
      });
    } else if (!(/^(13\d|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(userInfo.mobile))) {
      wx.showToast({
        title: 'mobile error！',
        duration: 2000,
        icon: "none"
      });
    } else if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(userInfo.email))) {
      wx.showToast({
        title: ' email error！',
        duration: 2000,
        icon: "none"
      });
    } else if (userInfo.university == "") {
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
        url: config.UPDATE_USERINFO,
        method: 'post',
        data: {
          token:app.d.token,
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
          var res = {
            "code": "OK",
            "data": {
              "done": true
            }
          }
          console.log(res);
          if(res.data.code="OK"){
            wx.showToast({
              title: "success",
              duration: 2000,
              icon: "success"
            });
            setTimeout(function () {
              wx.navigateBack({

              })
            }, 2500);
          }   
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