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
            <tr v-for="(row, key) in resp">
                <td>{{ row.name }}</td>
                <td>{{ row.description }}</td>
                <td>{{ row.date_creation }}</td>
                <td><v-btn :disabled="disabledOpen[key]" color="green white--text" @click="openTest(row.id)">Open</v-btn><v-btn :disabled="disabledClose[key]" color="red white--text" @click="closeTest(row.id)">Close</v-btn></td>
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
                let userid = this.$store.state.user_data.id;
                let data = this.$store.state.test_data;
                let arr = [];

                for(let row of data) {
                    if(row.owner.id === userid) {
                        arr.push(row);
                    }
                }

                return arr;
            },

            disabledOpen: function() {
                let result = [];

                for(let date of this.resp) {
                    result.push(date.date_open !== null);
                }

                return result;
            },

            disabledClose: function() {
                let result = [];

                for(let date of this.resp) {
                    result.push(date.date_close !== null);
                }

                return result;
            }
        },
        methods: {
            openTest: function(id) {
                this.$store.dispatch("openTest", id);
            },

            closeTest: function(id) {
                this.$store.dispatch("closeTest", id);
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
