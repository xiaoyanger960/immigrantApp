// pages/result/result.js
var app = getApp();
const config = require("../../config.js")
const common = require("../../utils/common.js")
Page({
  data: {
    evalateInfo:{
      pubNum:"1",
      citaNum:"1",
      revNum:"1",
      immType:"EB1A"
    },
    iconType:"info",
    result:"",
    reason:'',
    fit:false,
    color:"red",
    hadFillInfo:false,
  },
  onLoad: function (options) {
    var evalateInfo = app.globalData.evalateInfo;
    this.setData({
      evalateInfo: evalateInfo,
    })
    console.log(evalateInfo);
    if (evalateInfo.immType=="EB1A"){
      if (evalateInfo.pubNum>=10){
        if (evalateInfo.citaNum>=100){
          if (evalateInfo.revNum>=10){
            var fit=true;
            
            this.setData({
              fit:fit,
              iconType:"success",
              color:"green"
            })

          } else {
            var reason = "Number of article reviews";
            this.setData({
              reason: reason
            })
          }

        } else {
          var reason = "Number of citations";
          this.setData({
            reason: reason
          })
        }
      }else{
        var reason ="Number of publications";
        this.setData({
          reason: reason
        })
      }

    } else if (evalateInfo.immType == "EB1B"){
      if (evalateInfo.pubNum >= 10) {
        if (evalateInfo.citaNum >= 80) {
          if (evalateInfo.revNum >= 10) {
            var fit = true;
            this.setData({
              fit: fit,
              iconType: "success",
              color: "green"
            })

          } else {
            var reason = "Number of article reviews";
            this.setData({
              reason: reason
            })
          }

        } else {
          var reason = "Number of citations";
          this.setData({
            reason: reason
          })
        }
      } else {
        var reason = "Number of publications";
        this.setData({
          reason: reason
        })
      }



    }else{
      if (evalateInfo.pubNum >= 5) {
        if (evalateInfo.citaNum >=50) {
          if (evalateInfo.revNum >= 5) {
            var fit = true;
            this.setData({
              fit: fit,
              iconType: "success",
              color: "green"
            })

          } else {
            var reason = "Number of article reviews";
            this.setData({
              reason: reason
            })
          }

        } else {
          var reason = "Number of citations";
          this.setData({
            reason: reason
          })
        }
      } else {
        var reason = "Number of publications";
        this.setData({
          reason: reason
        })
      }
    }
    common.shopCall("POST", config.GET_USERINFO,{token:app.d.token},(data)=>{
      data={
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
      if(user_info.email!==""){
        that.setData({
          hadFillInfo:true
        })
      }
    },(error)=>{
      console.log(error)
    })
  },
  bindreturn:function(){
    wx.navigateBack();
  },
  bindFillInfo:function(){
    if (this.data.hadFillInfo){
      wx.navigateTo({
        url: '../order/pay',
      });
    }else{
      wx.navigateTo({
        url: '../fillInfo/fillInfo',
      });
    }
  }
})