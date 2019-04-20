<template>
    <v-container fluid>
        <h1>Logging out...</h1>
    </v-container>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            localStorage.removeItem('token');
            this.$router.push("/");
            location.reload();
        }
    }
</script>

<style scoped>

</style>
