<template>
    <div class="unlogged">
        <div class="navbar">
            <div class="navbar__logo">
                <router-link to="/">
                    <img src="../assets/logo.png" alt="logo">
                </router-link>
            </div>
            <div class="navbar__links">
                <v-btn to="/about" round flat>About Us</v-btn>
                <v-btn to="/login" round flat>Sign In</v-btn>
            </div>
        </div>
        <div class="body_content">
            <div class="body_content--left">
                <h1>Qui</h1>
                <div class="image">
                    <img src="../assets/photo.png" alt="">
                </div>
            </div>
            <div class="body_content--right">
                <h1>Ez</h1>
                <h2>
                    Make
                    <br>
                    learning
                    <br>
                    <span>awesome!</span>
                </h2>
            </div>
        </div>
        <transition name="router-animation"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Navigation"
    };
</script>

<style scoped lang="scss">
    @import "../assets/css/colors.scss";

    .navbar {
        width: 100%;
        height: 4.375rem;
        position: relative;

        &__logo {
            position: absolute;
            width: 8.4375rem;
            height: 8.4375rem;
            left: calc(50% - 4.21875rem);
            top: .8125rem;
            -webkit-border-radius: 5rem;
            -moz-border-radius: 5rem;
            border-radius: 5rem;
            border: .6875rem solid #f2f2f2;
            box-sizing: border-box;
            z-index: 5;
            cursor: pointer;

            img {
                width: 7.0625rem;
                height: 7.0625rem;
            }
        }

        &__links {
            width: fit-content;
            margin: 0 auto;

            a {
                text-decoration: none;
                color: white;
                width: 10rem;
                height: 3.125rem;
                font-size: 1.2rem;
                margin-top: .625rem;

                &:first-of-type {
                    background: $blue;
                    margin-right: 4.6875rem;

                    &:hover {
                        background: $lighter-blue;
                    }
                }

                &:last-of-type {
                    background: $pink;
                }
            }
        }
    }

    .body_content {
        width: 100%;
        display: flex;
        padding: 0 !important;
        height: 43.75rem;
        justify-content: space-between;

        h1 {
            font-size: 6rem;
            letter-spacing: -5px;
            -webkit-text-stroke: 5px white;
            font-weight: 100;
            margin-top: 6rem;
        }

        &--left {
            width: 49.3%;
            background: $pink;
            position: relative;

            h1 {
                text-align: right;
                color: $blue;
                margin-right: 2rem;
            }

            .image {
                width: 32.8125rem;
                background: white;
                height: 16.25rem;
                border-radius: 1rem;
                position: absolute;
                top: 20rem;
                left: 4.6875rem;
                padding: 1.25rem;
                z-index: 5;

                img {
                    width: 30rem;
                    height: 13.75rem;
                }
            }
        }

        &--right {
            width: 49.3%;
            background: $blue;
            position: relative;

            h1 {
                color: $pink;
                margin-left: 1.2rem;
            }

            h2 {
                font-size: 3rem;
                line-height: 1.7;
                letter-spacing: 5px;
                color: white;
                font-weight: 100;
                text-align: right;
                position: absolute;
                top: 20.7rem;
                right: 2.8125rem;

                span {
                    background: $pink;
                    padding: .5rem 1.5rem 1rem;
                    -webkit-border-radius: 5rem;
                    -moz-border-radius: 5rem;
                    border-radius: 5rem;
                    box-shadow: 0 6px 20px -5px #333;
                }
            }
        }
    }
</style>
