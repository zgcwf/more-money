<template>
  <Layout class-prefix="layout">
    <NumberPad></NumberPad>
    <Notes></Notes>
    <Tags></Tags>
    <Types></Types>
  </Layout>
</template>

<script>
import NumberPad from "@/components/Money/NumberPad.vue";
import Types from "@/components/Money/Types.vue";
import Notes from "@/components/Money/Notes.vue";
import Tags from "@/components/Money/Tags.vue";
export default {
  name: "Money",
  components: {
    Types,
    NumberPad,
    Notes,
    Tags,
  },
};
</script>

<style >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
