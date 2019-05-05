<template>
    <div class="context">
        <div class="navbar">
            <div class="navbar__logo">
                <router-link to="/">
                    <img src="../assets/logo.png" alt="logo">
                </router-link>
            </div>
            <div class="navbar__left">
                <div class="navbar__left--logo">
                    <img src="../assets/name.png" alt="name">
                </div>
            </div>
            <div class="navbar__right">
                <v-btn flat round class="btn pink" to="/user/create-test">Create Test</v-btn>
                <v-btn flat round class="btn pink" to="/logout">Sign Out</v-btn>
            </div>
        </div>
        <div class="body">
        </div>
    </div>
</template>

<script>
    export default {
        name: "PassTest",
        data() {
            return {

            }
        }
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
        min-height: 38.625rem;
        padding: .5rem 1rem 1rem 1rem;
        display: flex;
        justify-content: space-between;
    }
</style>
