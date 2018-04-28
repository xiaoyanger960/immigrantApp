var app = getApp();
Page({
  data:{
    hostImg:app.d.hostImg,
    page:1,
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    total: 0,
    carts: [],
  },

//减号
bindMinus: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var count = that.data.carts[index].count;
    if (count > 1) {
      count --;
    }
    console.log(count);
    //var cart_id = e.currentTarget.dataset.cartid;
    wx.request({
      url: app.d.ceshiUrl + 'CartController/updateCartItem',
      method:'post',
      data: {
      token:app.d.token,
      count: count,
      product_id : that.data.carts[index].product_id
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        var data = res.data;
        if (data.code == 'OK'){
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = count <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].count = count;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        }else{
          wx.showToast({
            title: '操作失败！',
            duration: 2000
          });
        }
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
},

//加号
bindPlus: function(e) {
    var that = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var count= that.data.carts[index].count;
    var product_id = e.currentTarget.dataset.id;
    console.log(product_id);
    // 自增
    count ++;
    wx.request({
      url: app.d.ceshiUrl + 'CartController/updateCartItem',
      method:'post',
      data: {
        token: app.d.token,
        count:count,
        product_id:product_id
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res);
        var data = res.data;
        if (data.code == 'OK') {
          // 只有大于一件的时候，才能normal状态，否则disable状态
          var minusStatus = count <= 1 ? 'disabled' : 'normal';
          // 购物车数据
          var carts = that.data.carts;
          carts[index].count = count;
          // 按钮可用状态
          var minusStatuses = that.data.minusStatuses;
          minusStatuses[index] = minusStatus;
          // 将数值与状态写回
          that.setData({
            minusStatuses: minusStatuses
          });
          that.sum();
        }else{
          wx.showToast({
            title: '操作失败！',
            duration: 2000
          });
        }
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
}, 

bindCheckbox: function(e) {
  /*绑定点击事件，将checkbox样式改变为选中与非选中*/
  //拿到下标值，以在carts作遍历指示用
  var index = parseInt(e.currentTarget.dataset.index);
  //原始的icon状态
  var selected = this.data.carts[index].selected;
  var carts = this.data.carts;
  // 对勾选状态取反
  carts[index].selected = !selected;
  // 写回经点击修改后的数组
  this.setData({
    carts: carts
  });
  this.sum()
},

bindSelectAll: function() {
   // 环境中目前已选状态
   var selectedAllStatus = this.data.selectedAllStatus;
   // 取反操作
   selectedAllStatus = !selectedAllStatus;
   // 购物车数据，关键是处理selected值
   var carts = this.data.carts;
   // 遍历
   for (var i = 0; i < carts.length; i++) {
     carts[i].selected = selectedAllStatus;
   }
   this.setData({
     selectedAllStatus: selectedAllStatus,
     carts: carts
   });
   this.sum()
 },


//
bindCheckout: function() {
   //var toastStr = '';
   // 遍历取出已勾选的cid
   for (var i = 0; i < this.data.carts.length; i++) {
     if (this.data.carts[i].selected) {
       //toastStr += this.data.carts[i].id;
       //toastStr += ',';
       app.globalData.products.push(this.data.carts[i]);
     }
   }
   if (app.globalData.products==''){
     wx.showToast({
       title: '请选择商品！',
       duration: 2000
     });
     return false;
   }
   //存回data
   wx.navigateTo({
     url: '../order/pay'
   })
 },

 bindToastChange: function() {
   this.setData({
     toastHidden: true
   });
 },

sum: function() {
    var carts = this.data.carts;
    // 计算总金额
    var total = 0;
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected) {
        total += carts[i].count * carts[i].price;
        total =parseInt(total);
      }
    }
    // 写回经点击修改后的数组
    this.setData({
      carts: carts,
      total: '¥ ' + total
    });
  },

onLoad:function(options){
    this.loadProductData();
    this.sum();
},

onShow:function(){
  this.loadProductData();
},

removeShopCard:function(e){
    var that = this;
    // var index = parseInt(e.currentTarget.dataset.index);
    //console.log(index);
    //var product_id = that.data.carts[index].product_id;
    var product_id = e.currentTarget.dataset.id;
    console.log(product_id);
    wx.showModal({
      title: '提示',
      content: '你确认移除吗',
      success: function(res) {
        res.confirm && wx.request({
          url: app.d.ceshiUrl + 'CartController/updateCartItem',
          method:'post',
          data: {
            token:app.d.token,
            count:0,
            product_id: product_id
          },
          header: {
            'Content-Type':  'application/x-www-form-urlencoded'
          },
          success: function (res) {
            var code = res.data.code;
            if(code == 'OK'){
              //that.data.productData.length =0;
              that.loadProductData();
            }else{
              wx.showToast({
                title: '操作失败！',
                duration: 2000
              });
            }
          },
        });
      },
      fail: function() {
        // fail
        wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
      }
    });
  },

  //加载购物车信息
  loadProductData:function(){
    var that = this;
    var token = app.d.token;
    wx.request({
      url: app.d.ceshiUrl + 'CartController/getUserCart',
      method:'post',
      data: {
        token:token
      },
      header: {
        'Content-Type':  'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data.data)
        var cart = res.data.data.cart;
        that.setData({
          carts:cart,
        });
      },
    });
  },

})