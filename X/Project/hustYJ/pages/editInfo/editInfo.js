// pages/editInfo/editInfo.js
import { request } from "../../network/request";

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
    area: 0,
    block: 0,
    id: "",
    areas,
  },

  async onLoad(options) {
    // const res = await request("rank.address", {}, "GET", true);
    const res = await request("user.info.get", {}, "GET", true);
    let { address, contact_way } = res.data.data;

    let { area, block } = this.addr2Digit(address);

    this.setData({
      id: contact_way,
      area,
      block,
    });
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

  chooseArea(e) {
    this.setData({
      area: e.detail.value,
    });
  },
  chooseBlock(e) {
    this.setData({
      block: e.detail.value,
    });
  },
  wxidInput(e) {
    this.setData({
      id: e.detail.value,
    });
  },

  async submit() {
    let { area, id, block } = this.data;

    if (!id) {
      return;
    }

    let data = {
      type: 3,
      address:
        areas[area].title + "|" + (block ? block + "栋" : "全区"),
      college: "计算机科学学院",
      class: "本科19级",
      contact_way: id,
    };

    let res = await request(
      "user.info.update",
      data,
      "POST",
      true
    );

    console.log(res);
  },
});
