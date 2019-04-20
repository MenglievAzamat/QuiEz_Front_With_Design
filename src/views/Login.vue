<template>
    <div class="cover">
        <div class="main_content">
            <v-btn class="cross" flat round to="/">
                <v-icon>clear</v-icon>
            </v-btn>
            <v-form class="main_content__form" v-model="valid">
                <v-text-field
                        v-model="email"
                        prepend-inner-icon="mail"
                        name="email"
                        label="Эл. почта"
                        type="email"
                        :rules="emailRules"
                        solo
                        background-color="#01AFD1"
                        class="main_content__form--input"
                        height="3.125rem"
                ></v-text-field>

                <v-text-field
                        v-model="password"
                        prepend-inner-icon="lock"
                        name="password"
                        label="Пароль"
                        type="password"
                        :rules="passwordRules"
                        solo
                        background-color="#01AFD1"
                        class="main_content__form--input"
                        height="3.125rem"
                ></v-text-field>
                <v-btn flat round class="custom" @click="submit">Sign In</v-btn>
                <p>If you don’t have an account</p>
                <v-btn flat round class="custom b2" to="/register">Sign Up</v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            token: "",
            valid: false,
            email: "",
            emailRules: [
                v => !!v || "Введите почту",
                v => /.+@.+\..{2,}/.test(v) || "Неправильное значение поля"
            ],
            password: "",
            passwordRules: [v => !!v || "Введите пароль"],
            username: "",
            usernameRules: [v => !!v || "Введите имя пользователя"]
        }),
        methods: {
            submit() {
                if (this.valid) {
                    let data = {
                        username: this.email,
                        email: this.email,
                        password: this.password
                    };

                    this.$store
                        .dispatch("login", data)
                        .then(() => {
                            this.$router.push("/");
                            location.reload();
                        })
                        .catch(error => {
                            localStorage.removeItem('token');
                        });
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .cover {
        position: absolute;
        width: 100%;
        height: 48.125rem;
        top: 0;
        z-index: 10;

        background: rgba(0, 0, 0, .7);

        .main_content {
            width: 29.8125rem;
            height: 30.8125rem;
            background: rgba(255, 255, 255, .8);
            border-radius: 3.75rem;
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            padding: 2rem;

            .cross {
                float: right;
                width: 1.875rem;
                height: 1.875rem;
                margin-right: -.5rem;

                i {
                    font-size: 2.5rem;
                }
            }

            p {
                font-size: 1.5625rem;
                margin-top: 2rem;
                color: #0B5665;
                font-weight: 100;
                text-align: center;

                i {
                    font-size: 5rem;
                    color: #0B5665;
                }
            }

            &__form {
                margin-top: 3rem;
                padding: 0 2.56rem;
                position: relative;

                .custom {
                    width: 14.375rem;
                    height: 4.375rem;
                    background: #1A9D66;
                    color: white;
                    border-radius: 4.375rem;
                    font-size: 3rem;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    margin: 0;

                    &.b2 {
                        width: 10rem;
                        height: 2.8125rem;
                        font-size: 1.875rem;
                        top: 21.5rem;
                    }
                }

                p {
                    position: absolute;
                    top: 15rem;
                    left: 50%;
                    transform: translateX(-50%);
                }

                &--input {
                    width: 20.625rem;
                    height: 3.125rem;
                    margin-bottom: 1.5625rem;
                }
            }
        }
    }
</style>
