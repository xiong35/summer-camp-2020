// pages/postSale/postSale.js

import { request } from "../../network/request";
import { upload } from "../../network/uploadImg";

const categorys = [
  "未选择",
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
];
const areas = [
  { title: "未选择", maxBlock: 0 },
  { title: "韵苑", maxBlock: 28 },
  { title: "沁苑", maxBlock: 13 },
  { title: "紫菘", maxBlock: 13 },
  { title: "研究生公寓", maxBlock: 0 },
  { title: "博士生公寓", maxBlock: 0 },
];

Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    id: "",
    contact_way: "",
    canSubmit: false,
    pictures: [],
  },

  checkSubmit() {
    let { name, id, contact_way } = this.data;
    if (name && id && contact_way) {
      this.setData({
        canSubmit: true,
      });
    } else {
      this.setData({
        canSubmit: false,
      });
    }
  },

  async addImg() {
    let { tempFilePaths } = await new Promise((resolve, _) => {
      wx.chooseImage({
        count: 1,
        sourceType: ["camera"],
        success: (result) => {
          resolve(result);
        },
      });
    });

    let pictures = [];

    let res = await request(
      "image.getToken",
      { type: 0, suffix: ".jpg" },
      "POST",
      true
    );

    let { token, url } = res.data.data;

    upload(tempFilePaths[0], null, null, {
      region: "ECN",
      domain: "bzkdlkaf.bkt.clouddn.com",
      key: url.replace(
        "http://image.youjie-mp.hustonline.net/",
        ""
      ),
      uptoken: token,
    });

    pictures.push(url);

    this.setData({
      pictures,
    });
  },

  nameInput(e) {
    this.checkSubmit();
    this.setData({
      name: e.detail.value,
    });
  },

  idInput(e) {
    this.checkSubmit();
    this.setData({
      id: e.detail.value,
    });
  },

  contactInput(e) {
    this.checkSubmit();
    this.setData({
      contact_way: e.detail.value,
    });
  },

  async submit() {
    this.checkSubmit();

    let { name, id, canSubmit, pictures, contact_way } = this.data;

    if (!canSubmit) {
      return;
    }

    let data = {
      name,
      code: id,
      picture: pictures[0],
      contact_way,
    };

    let res = await request("user.verify", data, "POST", true);
  },

  onLoad(options) {
    wx.setNavigationBarTitle({
      title: "填写个人信息",
    });
  },
});
