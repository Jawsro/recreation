//index.js
const app = getApp()

Page({
  data: {
    background: [
      '/images/one.jpg',
      '/images/two.jpg',
      '/images/three.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    iconStyle: [
      {
        "type": "西点",
        "image": "/images/cake.png",
        "url": "../cake/cake"
      },
      {
        "type": "鲜花",
        "image": "/images/flower.png",
        "url": "../cake/cake"
      },
      {
        "type": "饮品",
        "image": "/images/drink.png",
        "url": "../cake/cake"
      },
    ]

  },
  goto:function(e){
    console.log(e)//获取点击的模块的值
    // wx.navigateTo({
    //   url: `../cake/cake`,
    // });
  },
  onLoad: function () {

  },

  onGetUserInfo: function (e) {

  },

  onGetOpenid: function () {

  },


  doUpload: function () {

  },

})
