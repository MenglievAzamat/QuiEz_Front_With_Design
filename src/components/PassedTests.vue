<template>
    <div class="container">
        <table>
            <thead>
            <tr>
                <td>Name</td>
                <td>Test Owner</td>
                <td>Description</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in resp">
                <td>{{ row.name }}</td>
                <td>{{ row.owner.first_name + " " + row.owner.last_name}}</td>
                <td>{{ row.description }}</td>
                <td style="border: none"><v-btn color="light-blue white--text" :to="'/test/' + row.id + '/result/' + owner.id" v-if="row.date_close !== null">Overview</v-btn></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "PassedTests",
        beforeCreate() {
            let id = this.$store.state.user_data.id;
            this.$store.dispatch("getPassedTests", id);
        },
        computed: {
            resp: function () {
                return this.$store.state.test_data;
            },

            owner: function() {
                return this.$store.state.user_data;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/colors.scss";

    .container {
        table {
            thead {
                td {
                    background: $lighter-blue;
                    border: .125rem solid black;
                    font-weight: bold;
                }
            }

            td {
                padding: .5rem;
                width: 16.66666%;
                border: .0625rem solid black;
                box-sizing: border-box;
                font-weight: 100;
            }
        }
    }
</style>
