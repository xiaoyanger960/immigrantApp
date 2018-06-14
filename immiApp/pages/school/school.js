// pages/school/school.js
const config = require("../../config.js")
Page({
  data: {
    uni_info:{},
    hostUrl: 'http://localhost:8088/immigrantApi/upload/',
  
  },
  onLoad: function (options) {
    var that=this;
    var university_id=options.schoolId;
    console.log(university_id);
    wx.request({
      url: config.UNIVER_INFO,
      method: 'post',
      data: {
        university_id:university_id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var universityInfo = res.data.data;
        universityInfo.photo_path = universityInfo.photo_path.replace(/\\/ig, '/');
        that.setData({
          uni_info: universityInfo
        })

      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
        }
    })


  
  },
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})