
Page({
  data: {
    Filled: false,
    disbaled: true,
    userInfo: {},
  },
  onLoad: function () {
    var that = this;
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
        if (res.data.code = "OK") {
          var userInfo = res.data.user_info
          if (userInfo.email) {
            that.setData({
              Filled: true,
              userInfo: userInfo
            })
          }
        }
      },
      fail: function (e) {
        wx.showToast({
          title: 'network err！',
          duration: 2000
        });
      },
    })
  },

  modify: function () {
    this.setData({
      Filled: false,
    })
  },
  //提交用户个人信息
  formSubmit: function (e) {
    var userInfo = e.detail.value;
    //上传用户信息
    wx.request({
      url: config.UPDATE_USERINFO,
      method: 'post',
      data: {
        token: app.d.token,
        user_name: userInfo.user_name,
        mobile: userInfo.mobile,
        email: userInfo.email,
        university: userInfo.university,
        subject: userInfo.subject,
        degree: userInfo.degree
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
        wx.showToast({
          title: 'update fail！',
          duration: 2000
        });
      },
    })  
  },
})