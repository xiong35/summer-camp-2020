// pages/market/market.js
import { request } from "../../network/request";

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

const choices = [
  {
    title: "类别",
    tabs: [
      "电子设备",
      "书籍资料",
      "宿舍百货",
      "乐器",
      "门票卡劵",
      "美妆护肤",
      "女装",
      "男装",
      "鞋帽配饰",
      "代步工具",
      "户外运动",
      "其它",
    ],
  },
  {
    title: "区域",
    tabs: ["韵苑", "沁苑", "紫菘", "研究生公寓", "博士生公寓"],
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
    filterIsOpen: false,
    choices,
    chosen: [[], []],
  },

  handleTap(e) {
    this.setData({
      curPage: e.target.dataset.index,
    });
    this.getItems(true);
  },

  toggleFilter() {
    this.setData({
      filterIsOpen: !this.data.filterIsOpen,
    });
  },

  chooseTab(e) {
    let { chosen } = this.data;
    let { cat, tab } = e.target.dataset;
    let targetChosen = chosen[cat];
    let ind = targetChosen.indexOf(tab);

    if (ind !== -1) {
      targetChosen.splice(ind, 1);
    } else {
      targetChosen.push(tab);
    }

    this.setData({
      chosen,
    });
  },

  getFilteredItems() {
    this.getItems(true, true);
    this.toggleFilter();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.getItems(true);
  },

  async getItems(init, filtered = false) {
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
      chosen,
    } = this.data;

    let config = {
      ...configs[curPage],
      page: itemsPage,
    };

    if (filtered) {
      config.category = chosen[0].map((i) => i + 1);
      config.areas = chosen[1].map((i) => choices[1].tabs[i]);
    }

    const res = await request(config.path, config, "POST", true);

    if (!res.data || !res.data.success) {
      return false;
    }

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

    return true;
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
  onReachBottom: async function () {
    wx.showLoading({
      title: "加载中...",
    });
    let res = await this.getItems(false);
    wx.hideLoading();
    if (!res) {
      wx.wx.showToast({
        title: "已无更多数据",
      });
    }
  },
});
