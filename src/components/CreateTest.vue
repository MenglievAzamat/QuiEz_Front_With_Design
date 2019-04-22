<template>
    <div class="test_body">
        <div class="test_body__header">
            <h1>{{ testname }}</h1>
        </div>
        <div class="divider"></div>
        <div class="test_body__content">

        </div>
        <div class="test_body__controls">
            <v-btn round flat>Add Question</v-btn>
            <v-btn round flat>Create</v-btn>
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
                ></v-text-field>
                <v-btn flat round @click="dialog = false">OK</v-btn>
            </div>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "CreateTest",
        data() {
            return {
                testname: "_Name_Of_Test_",
                dialog: true
            }
        },
        methods: {
            cancel: function () {
                location.href = "/#/";
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
            height: 24.1875rem;
            background: #f2f2f2;
            margin-top: .5rem;
            box-shadow: inset 0 3px 5px 0 #777;
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
            height: 22rem;
            border-radius: 3.45rem;
            text-align: -webkit-center;
            padding: 7rem 3.5rem;

            h1 {
                font-size: 1.875rem;
                font-weight: 100;
                color: #0B5665;
            }

            .input {
                width: 20.625rem;
                font-size: 1rem;
            }

            button  {
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
