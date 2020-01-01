// pages/cakelist/cakelist.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    childcakelist:[]//保存所有的儿童蛋糕列表
  },
  goitem:function(e){
    //console.log(e)
    let name=e.currentTarget.dataset.name;
    //console.log(name)
    wx.navigateTo({
      url: "/pages/cakeitem/cakeitem?name="+name 
    })


    //  db.collection("allcakeitem").add({
    //   data:
    //   {
    //     name: "米道",
    //     price: "298.00",
    //     image: [
    //       "/images/childcakelist/2.jpg",
    //       "/images/childcakelist/cake22.jpg",
    //       "/images/childcakelist/cake222.jpg",
    //       "/images/childcakelist/cake2.jpg"
    //     ],
    //     bigImg:[
    //       "/images/childcakelist/cake2-2.jpg",
    //       "/images/childcakelist/cake2-22.jpg",
    //       "/images/childcakelist/cake2-222.jpg",
    //       "/images/childcakelist/cake2-2.png"
    //     ],
    //     size:[
    //       "454g",
    //       "908g",
    //     ],
    //     content: "天真、天然是我们做这款蛋糕唯一的出发点"
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
    //从childcakelist数据库获取儿童蛋糕渲染到页面上
    db.collection("childcakelist").get({
      success: res => {
        wx.hideLoading();
        //console.log(res.data) 
        this.setData({
          //给childcake赋值，没有这一步的话，前台就不会显示值
          childcakelist: res.data
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