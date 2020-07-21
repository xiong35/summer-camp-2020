// pages/market/market.js
import { request } from "../../network/request";

const infoConfig = {
  type: 2,
  category: [],
  areas: [],
  label: "new",
  page: 0,
  per_page: 14,
};

Page({
  data: {
    curPage: 0,
    nameList: ["最新", "最热", "求购"],
    items: [],
    now: new Date() * 1,
    itemsPage: 0,
  },

  handleTap(e) {
    this.setData({
      curPage: e.target.dataset.index,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getMore(true);
  },

  async getMore(init) {
    if (init) {
      this.setData({
        items: [],
        itemsPage: 0,
      });
    }
    let config = {
      ...infoConfig,
      page: this.data.itemsPage,
    };
    const res = await request(
      "market.index",
      config,
      "POST",
      true
    );

    this.setData({
      items: this.data.items.concat(res.data.data),
      itemsPage: this.data.itemsPage + 1,
    });
    console.log(res.data.data);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getMore(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getMore(false);
  },
});
