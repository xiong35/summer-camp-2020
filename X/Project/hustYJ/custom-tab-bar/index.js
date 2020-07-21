//Component Object
Component({
  properties: {
    myProperty: {
      type: String,
      value: "",
      observer: function () {},
    },
  },
  data: {
    curPage: "market",
    open: false,
  },
  methods: {
    handleBtnClick() {
      this.setData({
        open: !this.data.open,
      });
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});
