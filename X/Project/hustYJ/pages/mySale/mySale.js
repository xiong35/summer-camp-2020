import { request } from "../../network/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: "market",
    items: [],
    now: new Date().getTime(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const { type } = options;

    wx.setNavigationBarTitle({
      title: type == "market" ? "闲置" : "求购",
    });

    const res = await request(`user.${type}.pub`, {}, "GET", true);
    this.setData({
      items: res.data.data,
      type,
    });
  },

  async canclePost(e) {
    let { type } = this.data;
    let { _id, ind } = e.target.dataset;

    const res = await request(
      "user.item.delete",
      { _id, type: type == "market" ? 1 : 2 },
      "POST",
      true
    );

    if (!res.data || !res.data.success) {
      return;
    }

    let { items } = this.data;
    items.splice(ind, 1);
    this.setData({
      items,
    });

    wx.showToast({
      title: "删除成功",
    });
  },

  editPost(e) {
    wx.redirectTo({
      url: `/pages/postSale/postSale?id=${e.target.dataset._id}&type=${this.data.type}`,
    });
  },
});
