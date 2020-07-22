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

const configs = [
  {
    type: 2,
    category: [],
    areas: [],
    label: "new",
    page: 0,
    per_page: 14,
    path: "market.index",
  },
  {
    type: 2,
    category: [],
    areas: [],
    label: "hot",
    page: 0,
    per_page: 14,
    path: "market.index",
  },
  {
    type: 2,
    category: [],
    areas: [],
    label: "new",
    page: 0,
    per_page: 14,
    path: "reward.index",
  },
];

Page({
  data: {
    curPage: 0,
    nameList: ["最新", "最热", "求购"],
    itemsPage: 0,
    leftH: 0,
    rightH: 0,
    leftItems: [],
    rightItems: [],
  },

  handleTap(e) {
    this.setData({
      curPage: e.target.dataset.index,
    });
    this.getItems(true);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getItems(true);
  },

  async getItems(init) {
    if (init) {
      this.setData({
        leftItems: [],
        rightItems: [],
        leftH: 0,
        rightH: 0,
        itemsPage: 0,
      });
    }
    let {
      leftH,
      rightH,
      leftItems,
      rightItems,
      itemsPage,
      curPage,
    } = this.data;

    let config = {
      ...configs[curPage],
      page: itemsPage,
    };
    const res = await request(config.path, config, "POST", true);

    const newItems = res.data.data;
    if (curPage === 2) {
      leftItems = newItems;
    } else {
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
    }

    this.setData({
      rightH,
      leftH,
      rightItems,
      leftItems,
      itemsPage: itemsPage + 1,
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getItems(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getItems(false);
  },
});
