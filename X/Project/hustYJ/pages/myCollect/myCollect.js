import { request } from "../../network/request";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res = await request(
      "user.collection",
      { type: 1 },
      "GET",
      true
    );
    this.setData({
      items: res.data.data,
    });
  },

  async cancleCollect(e) {
    let { _id, ind } = e.target.dataset;

    const res = await request(
      "market.collect",
      { _id },
      "DELETE",
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
  },
});
