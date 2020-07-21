// pages/market/market.js
import { request } from "../../network/request";

const infoConfig = {
  type: 2,
  category: [],
  areas: [],
  label: "hot",
  page: 0,
  per_page: 14,
};

Page({
  data: {
    curPage: 0,
    nameList: ["最新", "最热", "求购"],
  },

  handleTap(e) {
    console.log(e);
    this.setData({
      curPage: e.target.dataset.index,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let config = {
      ...infoConfig,
    };
    const res = await request(
      "market.index",
      config,
      "POST",
      true
    );

    console.log(res);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
});
