//Component Object
Component({
  properties: {
    items: {
      type: Array,
      value: [],
      observer: function () {},
    },
  },
  data: {
    now: new Date() * 1,
  },
});
