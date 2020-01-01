// pages/cakeitem/cakeitem.js
const db = wx.cloud.database();//初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allcakeitem:[],
    indicatorDots: true,
    vertical: false,
    // autoplay: true,
    interval: 2000,
    duration: 500,
    count:1,//数量
    totle:0,
    show:false
  },
  clickUp:function(e){
    //console.log(this.data.count)
    let price = e.currentTarget.dataset.price; 
    let num = this.data.count;
    if (num>0){
      num++
    }else{
      num=1
    }
    this.data.totle = price * num;
    //console.log(num, this.data.totle)
    this.setData({
      count:num
    })
  },
  clickDown:function(e){
    console.log(e)
    let price = e.currentTarget.dataset.price;   
    let num = this.data.count;
    if (num > 1) {
      num--;
    } else {
      num = 1;
    }
    this.data.totle = price * num;
    console.log(num,this.data.totle)
    this.setData({
      count: num
    })
  },
  //点击 首页 (左下方)
  gotoHome:function(){console.log(1);
    wx.switchTab({////跳转到tabBar页面
       url: "/pages/index/index"
    })
  },
  //点击立即购买
  goShop:function(){
    this.setData({
      show:!this.data.show
    })
  },
  //点击加入购物车
  goCar: function () {
    this.setData({
      show: !this.data.show
    })
  },
  //点击X关闭按钮
  close:function(){
    this.setData({
      show: !this.data.show
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    //console.log(options)
    let name1=options.name;
    console.log(name1)

    db.collection('allcakeitem').where({ name: name1}).get({
        success:res=> {
          console.log(res.data)
          this.setData({
            allcakeitem: res.data
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