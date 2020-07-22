//Component Object
Component({
  properties: {
    curPage: {
      type: String,
      value: "market",
    },
  },
  data: {
    open: false,
  },
  methods: {
    handleBtnClick() {
      this.setData({
        open: !this.data.open,
      });
    },
  },
});
