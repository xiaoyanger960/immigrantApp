var app = getApp();
const config = require("../../config.js")
const common = require("../../utils/common.js")
Page({
  data: {
    disbaled: true,
  },
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
    } else if (userInfo.university=="") {
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
    } else if (userInfo.degree == "") {
      wx.showToast({
        title: 'input academic degree！',
        duration: 2000,
        icon: "none"
      });
    }else {
      app.globalData.userInfo = userInfo;
      console.log('填写个人信息', userInfo);
      console.log('填写个人信息', app.globalData.userInfo);
      var params={
        token:app.d.token,
        user_name: userInfo.userName,
        mobile: userInfo.mobile,
        email:userInfo.email,
        university: userInfo.university,
        subject: userInfo.subject ,
        degree: userInfo.degree,

      }
      common.shopCall("POST", config.UPDATE_USERINFO,params,(data)=>{
        wx.showToast({
          title: "success",
          duration: 2000,
          icon: "success"
        });
        setTimeout(function () {
          wx.navigateTo({
            url: '../order/pay',
          });
        }, 2500);
      })
    }
  },
  bindPickerChangeImmigrationType: function (e) {
    console.log(e.detail.value);
    this.setData({
      Index: e.detail.value
    })
  }
})