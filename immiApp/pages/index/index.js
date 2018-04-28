var app = getApp();
const config = require("../../config.js")
Page({
  data: {
    imgUrls: [
      '../../images/banner/schoolbanner01.jpg',
      '../../images/banner/schoolbanner02.jpg',
      '../../images/banner/schoolbanner03.jpg'     
    ],
    hostImg:app.d.hostImg,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    recommendSchoolData:[
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard'  
    ],
    rankSchoolData:[
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard',
      'Harvard'  
    ],
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
        var school = res.data;
        console.log(res);
        console.log(typeof (res));
        console.log(typeof (school));
        //var bannerUrl=res.data.data.list;
        //that.setData({
          //imgUrls:bannerUrl
        //});      
      },
      fail:function(e){
        /*wx.showToast({
          title: '网络异常！',
          duration: 2000
        });*/
        //暂时在这里写上成功的代码
        var res = {
          "code": "OK",
          "data": {
            "list": [
              {
                "university_id": 1,
                "university_name": "Harvard",
                "badge": "../../images/hafouLogo.jpg",
                "image": "../../images/banner/schoolbanner01.jpg",
                "rank": 1,
                "status": "NORMAL",
                "desc": "Philadelphia University is located in Philadelphia, Pennsylvania, USA. In 1884, the Philadelphia Philology School",
                "address": "Philadelphia, Pennsylvania, USA"
              },
              {
                "university_id": 2,
                "university_name": "William and Mary College",
                "badge": "../../images/hafouLogo.jpg",
                "image": "../../images/banner/schoolbanner02.jpg",
                "rank": 2,
                "status": "NORMAL",
                "desc": "Founded in 1693, the William and Mary College, also known as the William and Mary College, is the second oldest institution of higher education in the nation with a history just behind Harvard University founded in 1636",
                "address": "Virginia, United States"
              },
            ]
          }
        }
        console.log(res);
        that.setData({
          schoolData:res.data.list
        })

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