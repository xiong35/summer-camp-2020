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
    _id: "",
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
      postType,
      _id,
    } = this.data;

    if (!canSubmit) {
      return;
    }

    let data = {
      type: 2,
      upload_times: 1,
      title,
      description: des,
      pictures,
      sell_price: price * 1,
      except_price: price * 1,
      is_deal: 1,
      address:
        areas[curArea].title +
        "|" +
        (block ? block + "栋" : "全区"),
      area: areas[curArea].title,
      category: curCat * 1,
      contact_way: id,
      contract_way: id,
    };

    let res = await request(
      postType + ".publish",
      data,
      "POST",
      true
    );

    if (_id) {
      this.canclePost(_id, postType);
    }

    wx.showToast({
      title: "发布成功!",
      duration: 1000,
      mask: true,
      complete: () => {
        wx.redirectTo({
          url: "/pages/market/market",
        });
      },
    });
  },

  onLoad(options) {
    let { type, id } = options;
    this.setData({
      postType: type,
    });
    wx.setNavigationBarTitle({
      title: type === "market" ? "发布闲置" : "发布求购",
    });

    if (id) {
      this.preLoad(id, type);
      wx.setNavigationBarTitle({
        title: type === "market" ? "编辑闲置" : "编辑求购",
      });
    }
  },

  async preLoad(id, type) {
    let res = await request(
      `${type}.get`,
      { _id: id },
      "POST",
      true
    );

    let {
      title,
      description,
      contact_way,
      pictures,
      category,
      sell_price,
      address,
    } = res.data.data;

    let { area, block } = this.addr2Digit(address);

    this.setData({
      title,
      des: description,
      id: contact_way,
      pictures,
      curCat: category,
      price: sell_price,
      curArea: area,
      block,
      _id: id,
      canSubmit: true,
    });
  },

  async canclePost(id, type) {
    const res = await request(
      "user.item.delete",
      { _id: id, type: type == "market" ? 1 : 2 },
      "POST",
      true
    );
  },

  addr2Digit(address) {
    let info = {
      area: 0,
      block: 0,
    };

    if (!address) {
      return info;
    }

    let addrs = address.split("|");

    info.block = parseInt(addrs[1]) || 0;
    info.area = areas.findIndex((obj) => obj.title === addrs[0]);

    return info;
  },
});
