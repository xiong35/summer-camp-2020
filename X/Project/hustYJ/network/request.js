import { getJWT } from "./getJWT";

exports.request = async (
  path,
  data,
  method = "POST",
  auth = true
) => {
  let base = "https://youjie.hustonline.net/2.0/";
  if (path[0] === "/") {
    path = path.slice(1);
  }
  let url = base + path;

  let header = { "content-type": "application/json" };
  if (auth) {
    const token = await getJWT();
    header["Authorization"] = "Bearer " + token;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      dataType: "json",
      responseType: "text",
      success: (result) => {
        resolve(result);
      },
      fail: (reason) => {
        reject(reason);
      },
    });
  });
};
