// pages/goodPage/goodPage.js
import { request } from "../../network/request";

Page({
  data: {
    item: {
      address: "暂无",
      description: "暂无",
      title: "暂无",
      sell_price: "暂无",
      create_at: new Date() * 1,
    },
    now: new Date() - 0,
    collected: false,
    isWant: false,
  },

  async onLoad(options) {
    const { id, want } = options;
    let path = want == "true" ? "reward.get" : "market.get";

    const res = await request(path, { _id: id }, "POST", true);
    this.setData({
      item: res.data.data,
      collected: res.data.data.is_collect,
      isWant: want == "true",
    });
  },

  async collect() {
    const res = await request(
      "market.collect",
      { _id: this.data.item._id },
      "POST",
      true
    );
    this.setData({
      collected: !this.data.collected,
    });
  },

  copy() {
    wx.setClipboardData({
      data: this.data.item.contact_way,
    });
  },
});
