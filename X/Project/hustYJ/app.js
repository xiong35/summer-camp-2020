//app.js

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs);

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
  },
  globalData: {
    userInfo: null,
  },
});
