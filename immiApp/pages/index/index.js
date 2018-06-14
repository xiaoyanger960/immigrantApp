var app = getApp();
const config = require("../../config.js")
Page({
  data: {
    hostUrl:'http://localhost:8088/immigrantApi/upload/',
    hostImg:app.d.hostImg,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    recommendSchoolData:[],
    rankSchoolData:[],
    schoolData:{}
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: config.UNIVER_LIST,
      method:'post',
      data: {},
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {       
        var school = res.data.data;
        console.log(school);
        for(var i=0;i<school.length;i++){
          school[i].badge_path=school[i].badge_path.replace(/\\/ig, '/');
          school[i].photo_path = school[i].photo_path.replace(/\\/ig, '/');
        }
        console.log('替换后',school);
        that.setData({
          schoolData: school
        })
    
      },
      fail:function(e){
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    })
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  onShareAppMessage: function () {
    return {
      title: 'DIYimigrant',
      path: '/pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },
  searchRedirect:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  }

});