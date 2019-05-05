<template>
    <div class="test_body">
        <div class="test_body__header">
            <h1>{{ data.name }}</h1>
        </div>
        <div class="divider"></div>
        <div class="test_body__content">
            <ul v-if="data.length !== 0">
                <li>Test Description: <span>{{ data.description }}</span></li>
                <li>
                    Questions:
                    <ul v-for="question in data.questions">
                        <li>Question: <span>{{question.description}}?</span></li>
                        <li>Type of answer: <span>{{question.type}} answer(s)</span></li>
                        <li>
                            Answers:
                            <ul v-for="answer in question.answers">
                                <li>Answer: <span>{{answer.content}}</span></li>
                                <li>Is Correct: <span>{{(answer.is_right) ? "Yes" : "No"}}</span></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="test_body__controls">
            <v-btn round flat @click="submitTest">Create</v-btn>
            <v-btn round flat @click="cancel">Cancel</v-btn>
        </div>

        <v-dialog v-model="dialog" persistent width="29rem">
            <div class="dialog_body">
                <h1>Enter name of test:</h1>
                <v-text-field
                        v-model="testname"
                        solo
                        background-color="#01AFD1"
                        class="input"
                        height="3.125rem"
                        required
                        placeholder="Name of test"
                ></v-text-field>
                <v-btn flat round @click="change">OK</v-btn>
            </div>
        </v-dialog>

        <v-dialog v-model="second_dialog" persistent width="40rem">
            <div class="dialog_body second">
                <div class="container">
                    <div class="col">
                        <label for="description">Enter description</label>
                        <textarea id="description" v-model="description">

                        </textarea>
                    </div>
                    <div class="col">
                        <label for="weight">Weight</label>
                        <input type="text" id="weight" v-model="weight">
                        <v-btn flat round @click="addQuestions">Questions</v-btn>
                        <v-btn flat round @click="create" style="margin-top: 4rem;margin-left: -55%; width: 15rem;"
                               v-bind:disabled="disabled">Done
                        </v-btn>
                    </div>
                </div>
            </div>
        </v-dialog>

        <v-dialog v-model="third_dialog" persistent width="29rem">
            <div class="dialog_body second">
                <h3 v-if="questions.length === 0">No questions yet</h3>
                <div v-else class="questions">
                    <table>
                        <thead>
                        <tr>
                            <td>№</td>
                            <td>Type</td>
                            <td>Answers</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(question, key) in questions">
                            <td>{{ key }}</td>
                            <td>{{ question.type }}</td>
                            <td>{{ question.answers.length}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <v-btn flat round style="background: white;border: 0.0625rem solid black;color: black;"
                       @click="newQuestion">Add question
                </v-btn>
                <v-btn flat round @click="questionsFinish">OK</v-btn>
            </div>
        </v-dialog>

        <v-dialog v-model="fourth_dialog" persistent width="46rem">
            <div class="dialog_body second">
                <div class="container">
                    <div class="col">

                        <label for="question">Question:</label>
                        <textarea id="question" v-model="question">

                        </textarea>

                        <label>Type of answer</label>
                        <div class="radios">
                            <div class="radio">
                                <input id="one" type="radio" name="type" value="one" v-model="type">
                                <label for="one">One answer</label>
                            </div>
                            <div class="radio">
                                <input id="few" type="radio" name="type" value="many" v-model="type">
                                <label for="few">Few answers</label>
                            </div>
                            <div class="radio">
                                <input id="word" type="radio" name="type" value="text" v-model="type">
                                <label for="word">Word</label>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="answers" v-if="type === 'one'">
                            <h1 v-if="answers.length === 0">No answers yet</h1>
                            <table v-else>
                                <v-radio-group v-model="correct">
                                    <tr v-for="(answer, key) in answers">
                                        <td>{{ answer }}</td>
                                        <td>
                                            <v-radio :value=key></v-radio>
                                        </td>
                                    </tr>
                                </v-radio-group>
                            </table>
                            <v-btn flat round :disabled="disabled_2" @click="addAnswer">Add Answer</v-btn>
                        </div>
                        <div class="answers" v-else-if="type === 'many'">
                            <h1 v-if="answers.length === 0">No answers yet</h1>
                            <table v-else>
                                <tr v-for="(answer, key) in answers">
                                    <td>{{ answer }}</td>
                                    <td>
                                        <v-checkbox :value="key+1" v-model="correct"></v-checkbox>
                                    </td>
                                </tr>
                            </table>
                            <v-btn flat round :disabled="disabled_2" @click="addAnswer">Add Answer</v-btn>
                        </div>
                        <div class="answers" v-else-if="type === 'text'">
                            <input type="text" v-model="correct" style="margin-top: 2rem;" placeholder="Enter the answer...">
                        </div>
                        <v-btn flat round @click="submitQuestion" :disabled="disabled_4">Submit</v-btn>
                    </div>
                </div>
            </div>
        </v-dialog>

        <v-dialog v-model="fifth_dialog" persistent width="29rem">
            <div class="dialog_body second">
                <div class="container">
                    <div class="col" style="text-align: -webkit-center; width: 100%;">
                        <label for="answer">Answer Text</label>
                        <input type="text" id="answer" v-model="answer" style="margin-top: 1rem;">
                        <v-btn flat round @click="answerAdd" :disabled="disabled_3">ADD</v-btn>
                    </div>
                </div>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "CreateTest",
        data() {
            return {
                data: {},

                dialog: true,
                second_dialog: false,
                third_dialog: false,
                fourth_dialog: false,
                fifth_dialog: false,

                disabled: true,
                disabled_2: false,
                disabled_3: true,
                disabled_4: true,

                testname: "",
                description: "",
                weight: "",

                questions: [],
                question: "",
                type: "",
                correct: [],
                answers: [],
                answer: ""
            }
        },
        watch: {
            type: function () {
                this.answers = [];
                if(this.type === "one" || this.type === "text") {
                    this.correct = ""
                }else if(this.type === "many") {
                    this.correct = [];
                }
            },

            correct: function() {
               if(this.type === "text" && this.correct !== ""){
                   this.disabled_4 = false;
               }
            },

            answer: function () {
                this.disabled_3 = this.answer === "";
            },

            answers: function () {
                this.disabled_4 = this.answers.length < 2 || this.question === "";
                this.disabled_2 = this.answers.length >= 4;

            }
        },
        methods: {
            cancel: function () {
                location.href = "/#/";
            },

            change: function () {
                this.dialog = false;
                this.second_dialog = true;
            },

            create: function () {
                this.data = {
                    name: this.testname,
                    description: this.description,
                    questions: this.questions
                };

                this.second_dialog = false;
            },

            addQuestions: function () {
                this.second_dialog = false;
                this.third_dialog = true;
            },

            newQuestion: function () {
                this.third_dialog = false;
                this.fourth_dialog = true;

                this.question = "";
                this.answers = [];
                this.type = "";
            },

            questionsFinish: function () {
                this.third_dialog = false;
                this.second_dialog = true;
                if (this.questions.length > 0) {
                    this.disabled = false;
                }
            },

            addAnswer: function () {
                this.fourth_dialog = false;
                this.fifth_dialog = true;
            },

            answerAdd: function () {
                this.fifth_dialog = false;
                this.fourth_dialog = true;

                this.answers.push(this.answer);
                this.answer = "";
            },

            submitQuestion: function () {
                let a = [];

                if(this.type === "one") {
                    for (let i = 0; i < this.answers.length; i++) {
                        a.push({content: this.answers[i], is_right: i === this.correct})
                    }
                }else if(this.type === "many") {
                    let aa;

                    for (let i = 0; i < this.answers.length; i++) {
                        for(let j of this.correct) {
                            if(i+1 === j) {
                                aa = true;
                                break;
                            }else {
                                aa = false;
                            }
                        }
                        a.push({content: this.answers[i], is_right: aa})
                    }
                }else if(this.type === "text") {
                    a.push({content: this.correct, is_right: true})
                }

                let q = {
                    description: this.question,
                    type: this.type,
                    answers: a
                };

                this.questions.push(q);

                this.fourth_dialog = false;
                this.third_dialog = true;
            },

            submitTest: function () {
                this.$store.dispatch("createTest", this.data);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/colors.scss";

    .test_body {
        &__header {
            width: 100%;
            height: 2rem;
            background: $lighter-blue;
            padding: .38rem .75rem;

            h1 {
                font-size: 1.125rem;
                font-weight: 100;
            }
        }

        .divider {
            width: 100%;
            height: .5rem;
            background: $lighter-pink;
        }

        &__content {
            width: 100%;
            min-height: 24.1875rem;
            background: #f2f2f2;
            margin-top: .5rem;
            box-shadow: inset 0 3px 5px 0 #777;
            padding: 0 .5rem;

            li span {
                color: #777777;
            }
        }

        &__controls {
            margin-top: .5rem;
            display: flex;
            justify-content: space-between;

            button {
                width: 11.625rem;
                height: 2.8125rem;
                border-radius: 2rem;
                background: $blue;
                color: white;
                font-size: 1.4rem;
                font-weight: 100;
                text-transform: none;
            }
        }

        .v-dialog__content--active {
            background: rgba(0, 0, 0, .5);
        }

        .dialog_body {
            background: white;
            border-radius: 3.45rem;
            text-align: -webkit-center;
            padding: 7rem 3.5rem;

            &.second {
                padding: 2rem;
            }

            .questions {
                width: 100%;
                text-align: left;

                table {
                    width: 100%;

                    thead {
                        td {
                            background: $lighter-blue;
                            padding: .25rem 1rem;
                            border: .0625rem solid black;
                        }
                    }

                    td {
                        border: .0625rem solid black;
                        padding: .25rem 1rem;
                    }
                }
            }

            .container {
                display: flex;
                justify-content: space-between;
                padding: 0;

                .col {
                    width: 45%;
                    text-align: left;

                    label {
                        margin: 0;
                        text-align: left;
                        font-size: 1.5rem;
                        color: #0B5665;
                    }

                    textarea, input {
                        border: .5rem solid #01AFD1;
                        background: white;
                        width: 100%;
                        border-radius: .5rem;
                        font-size: .875rem;
                        padding: 0 .5rem;
                        margin-bottom: 2rem;
                        box-shadow: inset 0 5px 5px -2px rgba(0, 0, 0, .3);
                        outline: none;
                    }

                    textarea {
                        height: 8.875rem;
                    }

                    input {
                        height: 2.875rem;
                        border-radius: 2rem;
                    }

                    .radios {
                        text-align: left;

                        .radio {
                            label {
                                cursor: pointer;
                                background: #01AFD1;
                                width: 100%;
                                line-height: 2.5;
                                font-size: 1.2rem;
                                padding: .5rem 2rem;
                                color: white;
                                border-radius: 1rem;
                                transition: .5s;
                            }

                            input {
                                display: none;

                                &:checked ~ label {
                                    background: #015667;
                                }
                            }
                        }
                    }
                }
            }

            h1 {
                font-size: 1.875rem;
                font-weight: 100;
                color: #0B5665;
            }

            .input {
                width: 20.625rem;
                font-size: 1rem;
            }

            button {
                width: 10rem;
                height: 2.8125rem;
                background: $green;
                border-radius: 2rem;
                color: white;
                font-size: 1rem;
            }
        }
    }
</style>
