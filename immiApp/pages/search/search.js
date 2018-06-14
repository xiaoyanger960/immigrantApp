const config = require("../../config.js")
var app = getApp();
Page({
  data:{
    hostImg: app.d.hostImg,
    focus:true,
    searchValue:'',
    page:0,
    productData:[],
  },
  onLoad:function(options){
  
  },
  doKeySearch:function(e){
    var key = e.currentTarget.dataset.key;
    this.setData({
       searchValue: key
    });

    this.data.productData.length = 0;
    this.searchProductData();
  },

  //点击搜索按钮
  doSearch:function(){
    var that = this;
    var searchKey = this.data.searchValue;
    if (!searchKey) {
        this.setData({
            focus: true,
        });
        return;
    };    
    this.data.productData.length = 0;
    console.log(that.data.searchValue);
    //这个接口好像暂时还没有
    wx.request({
      url: app.d.ceshiUrl + 'ProductController/search',
      method: 'post',
      data: {
        keyword: that.data.searchValue
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var data = res.data.data.product_list;
        that.setData({
          productData: that.data.productData.concat(data),
        });
      },
      fail: function (e) {
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  }, 

  //监听搜索框的输入 e.detail.value为输入的值
  searchValueInput:function(e){
    var value = e.detail.value;
    this.setData({
      searchValue:value,
    });
  },
  

});