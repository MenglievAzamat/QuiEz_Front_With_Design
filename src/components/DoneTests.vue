<template>
    <div class="container">
        <table>
            <thead>
            <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Creation Date</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="row in resp">
                <td>{{ row.name }}</td>
                <td>{{ row.description }}</td>
                <td>{{ row.date_creation }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "DoneTests",
        computed: {
            resp: function() {
                var userid = this.$store.state.user_data.id;
                var data = this.$store.state.test_data;
                var arr = [];

                for(let row of data) {
                    if(row.owner.id === userid) {
                        arr.push(row);
                    }
                }

                return arr;
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
