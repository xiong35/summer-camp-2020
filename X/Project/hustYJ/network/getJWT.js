exports.getJWT = async () => {
  let oldToken = wx.getStorageSync("token");
  if (oldToken) {
    const { token, time } = oldToken;
    if (
      new Date().getTime() <
      time * 1 + 1000 * 60 * 60 * 24 * 3
    ) {
      return token;
    }
  }

  const res = await new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        resolve(res);
      },
    });
  });

  const data = await new Promise((resolve, reject) => {
    wx.request({
      url: "https://youjie.hustonline.net/2.0/user.login",
      method: "POST",
      data: {
        code: res.code,
      },
      success: (data) => {
        resolve(data);
      },
    });
  });

  let { token } = data.data.data;
  wx.setStorageSync("token", {
    token,
    time: new Date().getTime(),
  });

  return token;
};
