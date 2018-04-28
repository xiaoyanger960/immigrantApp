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

  //下拉加载更多
  /*onReachBottom:function(){
      this.setData({
        page:(this.data.page+10)
      })
      
      this.searchProductData();
  },*/

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
    var searchKey = this.data.searchValue;
    if (!searchKey) {
        this.setData({
            focus: true,
        });
        return;
    };    
    this.data.productData.length = 0;
    this.searchProductData();
  }, 

  //监听搜索框的输入 e.detail.value为输入的值
  searchValueInput:function(e){
    var value = e.detail.value;
    this.setData({
      searchValue:value,
    });
  },
  
  //搜索商品信息
  searchProductData:function(){
    var that = this;
    console.log(that.data.searchValue);
    wx.request({
      url: app.d.ceshiUrl + 'ProductController/search',
      method:'post',
      data: {
        keyword:that.data.searchValue
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) { 
        console.log(res);  
        var data = res.data.data.product_list;
        that.setData({
          productData:that.data.productData.concat(data),
        });
      },
      fail:function(e){
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      },
    });
  },

});