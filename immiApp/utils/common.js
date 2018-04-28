var app = getApp();
var MD5Encode = require("MD5Encode.js");

function shopCall(requestType, urlPath, params, onSuccess, onError, onComplete) {
  var requestType = arguments[0] ? arguments[0] : "POST";
  var urlPath = arguments[1] ? arguments[1] : '';
  var params = arguments[2] ? arguments[2] : {};
  var onSuccess = arguments[3] ? arguments[3] : function () { };
  var onError = arguments[4] ? arguments[4] : function () { };
  var onComplete = arguments[5] ? arguments[5] : this.onComplete;
  var that = this;

  //防止重复提交，相同请求间隔时间不能小于500毫秒
  /*var nowTime = new Date().getTime();
  if (this.requestCount[urlPath] && (nowTime - this.requestCount[urlPath]) < 500) {
    return;
  }
  this.requestCount[urlPath] = nowTime;
  //是否验证重复提交
  if (isVerify) {
    if (this.verifyCount[urlPath]) {
      return;
    }
    this.verifyCount[urlPath] = true; //重复验证开关开启
  }*/

  //console.log("发起网络请求, 路径:" + urlPath + ", 参数:" + JSON.stringify(params) + ',请求类型:' + requestType);
  wx.showNavigationBarLoading();
  wx.request({
    url: urlPath,
    data: params,
    method: requestType, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': requestType == 'POST' ?
        'application/json' : 'application/x-www-form-urlencoded'
    }, // 设置请求的 header
    success: function (res) {
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading() //完成停止加载
      console.log("返回结果：", res);
      if (res.statusCode === 200) {
        if (res.data.code === "OK") {
          onSuccess(res.data.data);
        } else if (res.data.code === "FAIL") {
          onError(res.data.data);
        }
      } else if (res.statusCode === 401) {
        onError(res.data.error);
        console.log("401无权限登录！")
      } else if (res.statusCode === 403) {
        onError(res.data.error);
        console.log("非法登录")
      } else if (res.statusCode === 500) {
        wx.showToast({
          title: '服务器内部错误!',
          duration: 2000,
          icon: "none"
        });
        console.log("服务器错误")
      } else {
        onError(res.data.error == null ? "请求失败 , 请重试" : res.data.error);
      }
    },
    fail: function (res) {
      wx.showToast({
        title: '网络异常！',
        duration: 2000,
        icon: "none"
      });
    },
    complete: function (res) {
      function onComplete() {
        console.log("sss");
      };
      //请求完成后，2秒后重复验证的开关关闭
      /*if (isVerify) {
        setTimeout(function () {
          that.verifyCount[urlPath] = false;
        }, 2000);
      }*/
    }
  })
}

/**
 * 对字符串判空
 */
function isStringEmpty(data) {
    if (null == data || "" == data) {
        return true;
    }
    return false;
}

/**
 * 封装网络请求
 */
function sentHttpRequestToServer(uri, data, method, successCallback, failCallback, completeCallback) {
    wx.request({
        url: app.d.hostUrl + uri,
        data: data,
        method: method,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: successCallback,
        fail: failCallback,
        complete: completeCallback
    })
}

/**
 * 将map对象转换为json字符串
 */
function mapToJson(map) {
    if (null == map) {
        return null;
    }
    var jsonString = "{";
    for (var key in map) {
        jsonString = jsonString + key + ":" + map[key] + ",";
    }
    if ("," == jsonString.charAt(jsonString.length - 1)) {
        jsonString = jsonString.substring(0, jsonString.length - 1);
    }
    jsonString += "}";
    return jsonString;
}

/**
 * 弹窗提示成功
 */
function toastSuccess() {
    wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
    })
}

/**
 * 调用微信支付
 */
function doWechatPay(prepayId, successCallback, failCallback, completeCallback) {
    var nonceString = getRandomString();
    var currentTimeStamp = getCurrentTimeStamp();
    var packageName = "prepay_id=" + prepayId;
    var dataMap = {
        timeStamp : currentTimeStamp,
        nonceStr : nonceString,
        package : packageName,
        signType : "MD5",
        paySign : getWechatPaySign(nonceString, packageName, currentTimeStamp),
        success : successCallback,
        fail : failCallback,
        complete : completeCallback
    }
    console.log(dataMap);
    wx.requestPayment(dataMap);
}

/**
 * 获取微信支付签名字符串
 */
function getWechatPaySign(nonceStr, packageName, timeStamp){
    var beforMD5 = "appid=" + app.d.appId + "&nonceStr=" + nonceStr + "&package=" + packageName + "&signType=MD5" + "&timeStamp=" + timeStamp + "&key=" + app.d.appKey;
    return doMD5Encode(beforMD5).toUpperCase();
}

/**
 * 获取当前时间戳
 */
function getCurrentTimeStamp() {
    var timestamp = Date.parse(new Date());
    return timestamp + "";
}

/**
 * 获取随机字符串，32位以下
 */
function getRandomString() {
    return Math.random().toString(36).substring(3, 8);
}

/**
 * MD5加密
 */
function doMD5Encode(toEncode){
    return MD5Encode.hexMD5(toEncode);
}

module.exports = {
    isStringEmpty: isStringEmpty,
    sentHttpRequestToServer: sentHttpRequestToServer,
    mapToJson: mapToJson,
    toastSuccess: toastSuccess,
    doWechatPay: doWechatPay,
    shopCall:shopCall,
}