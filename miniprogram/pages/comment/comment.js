// pages/comment/comment.js
const db = wx.cloud.database(); // 初始化数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:{},//保存电影详情页
    count:'',//保存评论内容
    score:5,//保存评论分数
    imagesList:[],//保存上传的图片
    fileIDs:[],
    movieid:-1
  },
  //评论内容
  getCount:function(e){
    this.setData({
      count:e.detail
    })
  },
  //评分
  getScore:function(e){
    this.setData({
      score: e.detail
    })
  },
  //提交
  getFrom:function(){
    console.log(this.data.count,this.data.score)
    //上传到云存储
    let arr=[];
    for (let i = 0; i < this.data.imagesList.length;i++){

    
    arr.push(new Promise((reslove,reject)=>{
      let item = this.data.imagesList[i];
      let suffix= /\.\w+$/.exec(item)[0]; //正则表达式，返回文件扩展名
      wx.cloud.uploadFile({
        cloudPath: 'example.png',//上传至云端的路径
        filePath: item, // 文件路径
      }).then(res => {
        // get resource ID
        console.log(res.fileID)
        this.setData({
          fileIDs: this.data.fileIDs.concat(res.fileID)
        })
        reslove();
      }).catch(error => {
        // handle error
      })
    }))
    }
    Promise.all(arr).then(res=>{
      //插入数据
      db.collection("comment").add({
        data:{
          content:this.data.count,
          score:this.data.score,
          movieid: this.data.movieid,
          fileIds: this.data.fileIDs
        }
      }).then(res=>{
        wx.showToast({
          title: '评论成功',
        })
      }).catch(err=>{
        console.log(err)
      })
    })
  },
  //上传图片
  setPhoto:function(){
    wx.chooseImage({
      count: 9,//图片张数
      sizeType: ['original', 'compressed'],//original 图片原尺寸 compressed  可以被压缩
      sourceType: ['album', 'camera'],
      success:res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        this.setData({
          imagesList: this.data.imagesList.concat(tempFilePaths)
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      movieid: options.movied
    })
    console.log(options);
    wx.cloud.callFunction({
      name: 'getmoviecomment',
      data: {
        movied: options.movied
      }
    }).then(res => {
      console.log(res);
      this.setData({
        detail:JSON.parse(res.result)
      })
    }).catch(err => {
      console.error(err);

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