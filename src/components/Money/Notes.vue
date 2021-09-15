<template>
  <div>
    <label class="notes">
      <span class="name">{{ fieldName }}</span>
      <input type="text" v-model="value" :placeholder="this.placeholder" />
    </label>
  </div>
</template>

<script>
export default {
  name: "Notes",
  props: ["fieldName", "placeholder"],
  data() {
    return {
      value: "",
    };
  },
  watch: {
    value: {
      handler(newvalue) {
        this.$bus.$emit("update:value", newvalue);
      },
    },
  },
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