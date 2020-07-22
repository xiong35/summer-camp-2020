// pages/searchResult/searchResult.js

import { request } from "../../network/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    leftItems: [],
    rightItems: [],
    leftH: 0,
    rightH: 0,
  },

  async onLoad(options) {
    let res = await request(
      "search.content",
      { content: options.kw, type: 1 },
      "POST",
      true
    );

    let { leftH, rightH, leftItems, rightItems } = this.data;

    const newItems = res.data.data;

    newItems.forEach((item) => {
      let curH = 0;
      if (item.pictures.length > 0) {
        curH = 225.33;
      } else {
        curH = 92.33;
      }
      if (leftH > rightH) {
        rightItems.push(item);
        rightH += curH;
      } else {
        leftItems.push(item);
        leftH += curH;
      }
    });

    this.setData({
      rightH,
      leftH,
      rightItems,
      leftItems,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
