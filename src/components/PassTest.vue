<template>
    <div class="context">
        <!--        <div class="navbar">-->
        <!--            <div class="navbar__logo">-->
        <!--                <router-link to="/">-->
        <!--                    <img src="../assets/logo.png" alt="logo">-->
        <!--                </router-link>-->
        <!--            </div>-->
        <!--            <div class="navbar__left">-->
        <!--                <div class="navbar__left&#45;&#45;logo">-->
        <!--                    <img src="../assets/name.png" alt="name">-->
        <!--                </div>-->
        <!--            </div>-->
        <!--            <div class="navbar__right">-->
        <!--                <v-btn flat round class="btn pink" to="/user/create-test">Create Test</v-btn>-->
        <!--                <v-btn flat round class="btn pink" to="/logout">Sign Out</v-btn>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="body">
            <div class="line"></div>
            <div class="slide_numbers">
                <div v-for="(val, key) in numbers" @click="toggle(key)" :class="{active: numbers[key]}"
                     class="slide_numbers--number">
                    {{key+1}}
                </div>
            </div>
            <div class="slides">
                <h1 class="slides__title">
                    {{test.name}}
                </h1>
                <div class="slide" v-show="numbers[key]" v-for="(val, key) in test.questions">
                    <p>{{val.description}}</p>
                    <input placeholder="Enter your answer..." type="text" v-if="val.type === 'text'"
                           @keydown="answerText" v-model="answers">

                    <div class="answers" v-if="val.type === 'one'">
                        <v-btn round v-for="(value, kkey) in val.answers" @click="answerOne(value)">{{kkey+1}})&nbsp;&nbsp;{{value.content}}</v-btn>
                    </div>

                    <div class="answers" v-if="val.type === 'many'">
                        <v-checkbox v-for="(value, kkey) in val.answers" :key="kkey" :value="value"
                                    :label="value.content" v-model="answers"></v-checkbox>
                    </div>
                    <v-btn round block color="green white--text" @click="answerMany" v-if="val.type === 'many'">
                        Submit
                    </v-btn>

                    <div class="text-xs-center" v-if="response.questions.length === numbers.length">
                        <v-btn color="red white--text" style="margin-top: 1rem;" @click="submitTest" round>Finish Test</v-btn>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PassTest",
        data() {
            return {
                tmp: [],
                current_question: "",
                response: {
                    questions: [],
                    questions_feedback: [
                        {
                            id: 4,
                            answers: [
                                {
                                    id: 8,
                                    content: "Да"
                                }
                            ]
                        },
                        {
                            id: 5,
                            answers: [
                                {
                                    id: 10,
                                    content: "Юмор"
                                },
                                {
                                    id: 11,
                                    content: "Компетенция"
                                }
                            ]
                        },
                        {
                            id: 6,
                            answers: [
                                {
                                    id: 16,
                                    content: "Информативно"
                                },
                                {
                                    id: 19,
                                    content: "Доходчиво"
                                }
                            ]
                        }
                    ]
                },
                answers: []
            }
        },
        beforeCreate() {
            this.$store.dispatch("startTest", this.$route.params.id);
            let result = this.$store.state.current_test;

            if (result.date_open !== null) {
                if (result.date_close !== null) {
                    alert("This test is closed!");
                    this.$router.push("/");
                }
            } else {
                alert("This test is not opened yet!");
                this.$router.push("/");
            }
        },
        computed: {
            test: function () {
                return this.$store.state.current_test;
            },
            numbers: function () {
                let result = [];

                if (this.tmp.length === 0) {
                    for (let i = 0; i < this.test.questions.length; i++) {
                        result.push(i === 0);
                    }
                } else {
                    result = this.tmp;
                }

                return result;
            }
        },
        watch: {
            numbers: function () {
                for (let i = 0; i < this.numbers.length; i++) {
                    if (this.numbers[i]) {
                        this.current_question = this.test.questions[i];
                        break;
                    }
                }
            }
        },
        methods: {
            toggle: function (key) {
                let length = this.numbers.length;
                this.tmp = [];
                this.answers = [];

                for (let i = 0; i < length; i++) {
                    this.tmp.push(i === key);
                }
            },

            answerOne: function (answer) {
                let ans = [
                    {
                        id: answer.id,
                        content: answer.content,
                        is_right: answer.is_right
                    }
                ];

                this.response.questions.push({
                    id: this.current_question.id,
                    answers: ans
                });

                this.nextSlide();
            },

            answerMany: function () {
                this.response.questions.push({
                    id: this.current_question.id,
                    answers: this.answers
                });

                this.nextSlide();
            },

            answerText: function (event) {
                if (event.key === "Enter") {
                    let ans = [
                        {
                            id: this.current_question.answers[0].id,
                            content: this.answers,
                            is_right: this.current_question.answers[0].content === this.answers
                        }
                    ];


                    this.response.questions.push(
                        {
                            id: this.current_question.id,
                            answers: ans
                        }
                    );

                    this.nextSlide();
                }
            },

            nextSlide: function () {
                for (let i = 0; i < this.numbers.length; i++) {
                    if (this.numbers[i] && i !== this.numbers.length - 1) {
                        this.toggle(i + 1);
                        break;
                    }
                }
            },

            submitTest: function () {
                let data = [
                    this.test.id,
                    this.response
                ];

                this.$store.dispatch("submitTest", data)
                    .then(() => {
                        this.$router.push("/");
                        },
                        (error) => {
                            console.error(error)
                        });
            }
        },
    };
</script>

<style scoped lang="scss">
    @import "../assets/css/colors.scss";

    .navbar {
        display: flex;
        width: 100%;
        height: 8.5rem;
        justify-content: space-between;
        position: relative;

        &__logo {
            position: absolute;
            width: 4.625rem;
            height: 4.625rem;
            left: 50%;
            top: 4.5%;
            border-radius: 5rem;
            border: .375rem solid #f2f2f2;
            box-sizing: border-box;
            z-index: 5;
            cursor: pointer;
            transform: translateX(-50%);

            img {
                width: 3.875rem;
                height: 3.875rem;
            }
        }

        &__left {
            width: 49.5%;
            height: 5.375rem;
            background: $pink;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &--logo {
                margin-top: 4.5rem;

                img {
                    width: 18rem;
                    height: 9.8rem;
                }
            }
        }

        &__right {
            width: 49.5%;
            height: 5.375rem;
            background: $blue;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn {
            width: 10rem;
            height: 3.125rem;
            border-radius: 5rem;
            color: white;
            font-size: 1.25rem;
            text-transform: none;

            &:first-of-type {
                margin-left: 2.625rem;
            }

            &.pink {
                background: $pink !important;
            }

            &.blue {
                background: $blue !important;
                margin-right: 2.625rem;
                margin-left: 0;
            }
        }
    }

    .body {
        width: 100%;
        /*min-height: 38.625rem;*/
        padding-top: .5rem;

        .line {
            width: 100%;
            height: .5rem;
            background: $lighter-pink;
            box-shadow: 0 .125rem .2rem 2px rgba(black, .2);
        }

        .slide_numbers {
            display: flex;
            box-shadow: 0 .125rem .2rem 2px rgba(black, .2);
            background: white;

            &--number {
                margin-left: .9375rem;
                width: 2.875rem;
                height: 2.875rem;
                background: $lighter-pink;
                text-align: center;
                font-size: 1.875rem;
                padding: .25rem 0;
                cursor: pointer;

                &.active {
                    background: $blue;
                    box-shadow: inset 0 0 .2rem 2px rgba(black, .5);
                }
            }
        }

        .slides {
            width: 100%;
            background: white;
            margin: 1.25rem auto 2rem;
            box-shadow: inset 0 .25rem .3rem 0 rgba(black, .3);

            &__title {
                text-align: center;
                padding: 1rem 0;
                background: $blue;
                color: white;
            }

            .slide {
                padding: 1.5rem;

                p {
                    border: .0625rem solid black;
                    padding: .5rem;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    font-size: 1.2rem;
                    border-radius: .5rem;
                }

                input {
                    box-shadow: 0 3px 5px 1px rgba(black, .4);
                    border-radius: 1rem;
                    padding: .5rem 1rem;
                    width: 20rem;
                    margin-left: 50%;
                    transform: translateX(-50%);
                    outline: none;
                    transition: .3s;

                    &:focus {
                        transform: translateX(-50%) scale(1.2);
                        box-shadow: 0 5px 20px 1px rgba(black, .3);
                    }
                }

                .answers {
                    display: flex;
                    flex-wrap: wrap;

                    button {
                        width: 48.6%;
                        height: 3rem;
                        font-size: 1rem;
                        color: #333;
                    }
                }
            }
        }
    }
</style>
