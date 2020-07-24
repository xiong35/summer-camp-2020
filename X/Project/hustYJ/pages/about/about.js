import { request } from "../../network/request";
// pages/about/about.js
Page({
  data: {
    avatarUrl:
      "https://wx.qlogo.cn/mmopen/vi_32/x9U78tCoyfia9BZXzibADqibCV1uGwjZV4wKaLZPtGtf5jqKyf4XUOwPcf4smFxibicVpeG5S1oA20n3jvXoLuenXSA/132",
    nickName: "三十五画生",
    userInfo: {
      num_of_collect: "---",
      num_of_pub: "---",
      num_of_rent: "---",
      num_of_view: "---",
      status: 1,
    },
  },

  async onLoad(options) {
    // let res = await request("user.index", {}, "GET", true);

    // this.setData({
    //   userInfo: res.data.data,
    // });

    const app = getApp();
    try {
      const { avatarUrl, nickName } = app.globalData.userInfo;
      this.setData({
        avatarUrl,
        nickName,
      });
    } catch (err) {
      console.log(err);
    }
    try {
      const userInfo = app.globalData.gotUserInfo;
      this.setData({
        userInfo,
      });
    } catch (err) {
      console.log(err);
    }
  },

  notYet() {
    wx.showToast({
      title: "暂时不支持此操作QwQ",
      icon: "none",
    });
  },
});
