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
    open_id:app.d.open_id,
  },
  onLoad: function (options) {
    var that=this;
    var evalateInfo = app.globalData.evalateInfo;
    var open_id = wx.getStorageSync('open_id');
    this.setData({
      evalateInfo: evalateInfo,
      open_id:open_id
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
    common.shopCall("POST", config.GET_USERINFO,{open_id:that.data.open_id},(data)=>{
      console.log(data);
      var user_info=data;
      app.globalData.userInfo = user_info;
      if(user_info!==""){
        that.setData({
          hadFillInfo:true
        })
      }
    },(error)=>{
      console.log(error)
    })
  },
  onShow:function(){

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