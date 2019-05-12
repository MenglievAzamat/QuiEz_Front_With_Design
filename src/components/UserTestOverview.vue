<template>
    <div class="container">
        <table>
            <thead>
            <tr>
                <td colspan="2">Test Name: <b>{{resp.name}}</b></td>
            </tr>
            <tr>
                <td>Question Number</td>
                <td>Result</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, key) in resp.questions">
                <td>{{key+1}}</td>
                <td v-if="row.type === 'one' || row.type === 'text'"
                    :class="{red: !row.participant_answers[0].is_right, green: row.participant_answers[0].is_right}">{{
                    row.participant_answers[0].content }}
                </td>
                <td v-if="row.type === 'many'">
                    <div v-for="answer in row.participant_answers"
                         :class="{red: !answer.is_right, green: answer.is_right}">{{ answer.content }}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <br>
        <p><b>Total Results:</b> {{ results.right + " / " + results.total + "&nbsp;&nbsp;(" + results.percentage + "%)" }}</p>
    </div>
</template>

<script>
    export default {
        name: "UserTestOverview",
        beforeCreate() {
            let userid = this.$route.params.userid;
            let testid = this.$route.params.testid;

            this.$store.dispatch("getTestResult", [testid, userid]);
        },
        computed: {
            resp: function () {
                return this.$store.state.passed_test_result;
            },

            results: function() {
                let total = this.resp.questions.length;
                let right = 0;

                for(let question of this.resp.questions) {
                    if(question.type === 'one' || question.type === 'text') {
                        right += (question.participant_answers[0].is_right) ? 1 : 0;
                        console.log(right);
                    }else if (question.type === 'many') {
                        let trues = 0;

                        for(let answer of question.answers) {
                            trues += (answer.is_right) ? 1 : 0;
                        }

                        for(let answer of question.participant_answers) {
                            right += (answer.is_right) ? 1/trues : 0;
                        }
                        console.log(right);
                    }
                }

                return {
                    total: total,
                    right: right,
                    percentage: right * 100 / total
                };
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/colors";

    .container {
        table {
            width: 100%;
            text-align: center;

            thead {
                background: $blue;
                color: white;
            }

            td {
                width: 50%;
                border: .0625rem solid black;
                min-height: 2rem;

                div {
                    padding: .35rem;
                }

                .red {
                    background: #ff4342;
                }

                .green {
                    background: #67d05b;
                }
            }
        }
    }
</style>
