//index.js
//获取应用实例
const app = getApp()

Page({
     data:{
         imgUrls:[],
         nowPlaying:[],
         comingSoon:[]
     },
      onReady(){
        this.getBannerUrl()
        this.getNowPlayingData()
        this.getNowSoonData()
      },
    // https://m.maizuo.com/v4/api/billboard/home?__t=1532426097714

    getBannerUrl(){
    wx.request({
        url: 'https://m.maizuo.com/v4/api/billboard/home', //仅为示例，并非真实的接口地址
        data: {
            "__t":1532426097714
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: this.handleGetBannerSucc.bind(this)
      })
    
    },
    handleGetBannerSucc(res){
       
        let data=res.data.data.billboards;
        let urls=[]
        for(var i=0;i<data.length;i++){
          urls.push(data[i].imageUrl);

        }
        this.setData({
            imgUrls:[...urls]
        })

    },

 getNowPlayingData(){
    //https://m.maizuo.com/v4/api/film/now-playing?__t=1532436595481&page=1&count=5
    wx.request({
        url: 'https://m.maizuo.com/v4/api/film/now-playing', //仅为示例，并非真实的接口地址
        data: {
            "__t":1532436595481,
            "page":1,
            "count":5
        },
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: this.handleGetnowPlaying.bind(this)
      })
    
    },
    handleGetnowPlaying(res){
        
         let data=res.data.data.films;
         this.setData({
             nowPlaying:[...this.data.nowPlaying,...data]
         })
       
    },
    getNowSoonData() {
      //https://m.maizuo.com/v4/api/film/coming-soon?__t=1532494371562&page=1&count=3
      wx.request({
        url: 'https://m.maizuo.com/v4/api/film/coming-soon', //仅为示例，并非真实的接口地址
        data: {
          "__t": 1532494371562,
          "page": 1,
          "count": 3
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: this.handleGetSoon.bind(this)
      })

    },
    handleGetSoon(res){
      console.log(res)
      let data=res.data.data.films;
      this.setData({
        comingSoon: [...this.data.comingSoon, ...data]
      })
    }

  })
