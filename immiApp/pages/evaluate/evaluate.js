var app = getApp();
Page({
  data: {
    ImmigrationType:[
      "please choose",
      "EB1A",
      "EB1B",
      "NIW"
    ],
    Index:0,
    disbaled:true,
  },
  formSubmit:function(e){
    var evalateInfo = e.detail.value;
    if (evalateInfo.pubNum==""){
      wx.showToast({
        title: 'publications！',
        duration: 4000,
        icon:"none"
      });
    } else if (!(/^[0-9]+$/.test(evalateInfo.pubNum))){
      wx.showToast({
        title: 'input Number！',
        duration: 4000,
        icon: "none"
      });
    } else if (evalateInfo.citaNum==""){
      wx.showToast({
        title: ' citations！',
        duration: 4000,
        icon: "none"
      });
    } else if (!(/^[0-9]+$/.test(evalateInfo.citaNum))) {
      wx.showToast({
        title: 'input Number！',
        duration: 4000,
        icon: "none"
      });
    }
    else if (evalateInfo.revNum == "") {
      wx.showToast({
        title: ' citations！',
        duration: 4000,
        icon: "none"
      });
    } else if (!(/^[0-9]+$/.test(evalateInfo.revNum))) {
      wx.showToast({
        title: 'input Number！',
        duration: 4000,
        icon: "none"
      });
    } else if (evalateInfo.ImmType=="please choose"){
      wx.showToast({
        title: 'choose type！',
        duration: 4000,
        icon: "none"
      });
    }else{
      app.globalData.evalateInfo = evalateInfo;
      wx.showToast({
        title: "evaluating",
        duration: 2000,
        icon:"loading"
      });
      setTimeout(function () {
        wx.navigateTo({
          url: '../result/result',
        });
      }, 2500);
    }
  },
  bindPickerChangeImmigrationType:function(e){
    console.log(e.detail.value);
    this.setData({
      Index: e.detail.value
    })
  }
})