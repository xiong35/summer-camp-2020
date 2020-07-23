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
    title: "",
    categorys,
    curCat: 0,
    areas,
    curArea: 0,
    block: 0,
    price: 0,
    des: "",
    id: "",
    canSubmit: false,
    pictures: [],
  },

  checkSubmit() {
    let { title, des, price, id } = this.data;
    if (title && des && price && id) {
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
        count: 5,
        sourceType: ["album", "camera"],
        success: (result) => {
          resolve(result);
        },
      });
    });

    let pictures = [];

    for (let i = 0; i < tempFilePaths.length; i++) {
      let res = await request(
        "image.getToken",
        { type: 0, suffix: ".jpg" },
        "POST",
        true
      );

      let { token, url } = res.data.data;

      upload(tempFilePaths[i], null, null, {
        region: "ECN",
        domain: "bzkdlkaf.bkt.clouddn.com",
        key: url.replace(
          "http://image.youjie-mp.hustonline.net/",
          ""
        ),
        uptoken: token,
      });

      pictures.push(url);
    }

    this.setData({
      pictures,
    });
  },

  chooseCat(e) {
    this.checkSubmit();
    this.setData({
      curCat: e.detail.value,
    });
  },

  chooseArea(e) {
    this.checkSubmit();
    this.setData({
      curArea: e.detail.value,
      block: 0,
    });
  },

  chooseBlock(e) {
    this.checkSubmit();
    this.setData({
      block: e.detail.value,
    });
  },

  priceInput(e) {
    this.checkSubmit();
    this.setData({
      price: e.detail.value,
    });
  },

  titleInput(e) {
    this.checkSubmit();
    this.setData({
      title: e.detail.value,
    });
  },

  desInput(e) {
    this.checkSubmit();
    this.setData({
      des: e.detail.value,
    });
  },

  wxidInput(e) {
    this.checkSubmit();
    this.setData({
      id: e.detail.value,
    });
  },

  async submit() {
    this.checkSubmit();

    let {
      title,
      des,
      curCat,
      curArea,
      block,
      price,
      id,
      canSubmit,
      pictures,
    } = this.data;

    if (!canSubmit) {
      return;
    }

    let data = {
      type: 2,
      title,
      description: des,
      pictures,
      rent_price: price,
      sell_price: price,
      origin_price: price,
      address:
        areas[curArea].title +
        "|" +
        (block ? block + "栋" : "全区"),
      category: curCat,
      contact_way: id,
    };

    let res = await request("market.publish", data, "POST", true);
    console.log(res);
  },
});
