<template>
    <div class="container">
        All
        {{resp}}
    </div>
</template>

<script>
    export default {
        name: "AllTests",
        beforeCreate() {
          this.$store.dispatch("getAllTests");
        },
        computed: {
            resp: function() {
                return this.$store.state.test_data;
            }
        }
    }
</script>
