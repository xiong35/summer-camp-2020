//Component Object
Component({
  properties: {
    items: {
      type: Array,
      value: [],
    },
    isWant: {
      type: Boolean,
      value: false,
    },
  },
  data: {
    now: new Date() * 1,
  },
});
