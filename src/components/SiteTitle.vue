<script>
export default {
  name: "site-title",
  props: ["title"],
  created() {
    document.title = this.title;
  },
  watch: {
    title() {
      document.title = this.title;
    }
  }
};
</script>
