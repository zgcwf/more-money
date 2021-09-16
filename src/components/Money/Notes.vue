<template>
  <div>
    <label class="notes">
      <span class="name">{{ fieldName }}</span>
      <input
        type="text"
        @input="onInput($event.target.value)"
        :value="value"
        :placeholder="this.placeholder"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "Notes",
  props: ["fieldName", "placeholder", "value"],
  methods: {
    onInput(value) {
      // console.log("onInput ", value);
      value !== this.value && this.$bus.$emit("update:value", value);
    },
  },
  // watch: {
  //   value: {
  //     immediate: true,
  //     handler(prev, cur) {
  //       console.log("watch ", prev, cur);
  //       this.onInput(prev);
  //     },
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    height: 48px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>