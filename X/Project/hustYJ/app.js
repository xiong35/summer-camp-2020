//app.js
import { request } from "./network/request";

App({
  onLaunch: async function () {
    // 展示本地存储能力
    wx.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo;
            },
          });
        } else {
          wx.authorize({
            scope: "scope.userInfo",
            success() {
              wx.getUserInfo({
                success: (res) => {
                  this.globalData.userInfo = res.userInfo;
                },
              });
            },
          });
        }
      },
    });

    let res = await request("user.index", {}, "GET", true);
    this.globalData.gotUserInfo = res.data.data;
  },

  globalData: {
    userInfo: null,
  },
});
