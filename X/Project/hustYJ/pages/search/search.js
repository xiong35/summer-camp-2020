// pages/search/search.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    input: "",
    history: [],
    hot: [],
  },

  onInput(e) {
    this.setData({
      input: e.detail.value,
    });
  },

  search(e) {
    let { keyword } = e.currentTarget.dataset;
    let history = wx.getStorageSync("searchHistory") || [];
    let ind = history.indexOf(keyword);
    if (ind !== -1) {
      history.splice(ind, 1);
    }
    history.unshift(keyword);
    wx.setStorage({
      key: "searchHistory",
      data: history.slice(0, 5),
    });

    wx.navigateTo({
      url: "/pages/searchResult/searchResult?kw=" + keyword,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let history = wx.getStorageSync("searchHistory") || [];
    this.setData({
      history,
    });

    wx.request({
      url: "https://youjie.hustonline.net/2.0/search.hot",
      success: (result) => {
        this.setData({
          hot: result.data.data,
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
});
