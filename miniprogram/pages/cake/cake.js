// pages/cake/cake.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background:[
     "/images/cake3.jpg",
      "/images/cake4.jpg",
      "/images/cake5.jpg"
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    childcake:[],//保存儿童蛋糕数据
    partycake: [],//保存聚会蛋糕数据
    snackscake: [],//保存小食数据
  },
  gotoCakeitem:function(e){
    let name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: "/pages/cakeitem/cakeitem?name=" + name 
    })
  },
  onAdd:function(){
    // db.collection("childcakelist").add({
    //   data:
    //   {
    //     name: "栗蓉暗香",
    //     price: "298.00",
    //     image: "/images/childcakelist/11.jpg"
    //   }
       
    //   ,
    //   success:res=>{
    //     console.log(res._id)
    //   }
    // })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    //从cake数据库获取儿童蛋糕渲染到页面上
    db.collection("cake").get({
      success: res => {
        wx.hideLoading();
        //console.log(res.data) 
        this.setData({
          //给childcake赋值，没有这一步的话，前台就不会显示值
          childcake: res.data
        })
      }
    }),
    //从partycake数据库获取聚会蛋糕渲染到页面上
    db.collection("partycake").get({
      success:res=>{
        //console.log(res.data)
        this.setData({
          partycake: res.data
        })
      }
    }),
      //从snackscake数据库获取聚会蛋糕渲染到页面上
      db.collection("snackscake").get({
        success: res => {
          //console.log(res.data)
          this.setData({
            snackscake: res.data
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})