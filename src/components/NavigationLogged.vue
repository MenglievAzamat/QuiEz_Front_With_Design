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
            <div class="account_info">
                <div class="account_info__header">
                    <h1>{{ text }}</h1>
                </div>
                <div class="divider"></div>
                <div class="account_info__body">
                    <router-view></router-view>
                </div>
            </div>
            <div class="menu_info">
                <div class="menu_info__header">
                    <h1>Menu</h1>
                </div>
                <div class="divider"></div>
                <div class="menu_info__cards">

                    <router-link v-for="(route, key) in routes" :key="key" :to="route.route">
                        <div class="item">
                            {{route.label}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavigationLogged",
        data() {
            return {
                routes: [
                    {label: 'Profile', route: '/user/tests'}
                ]
            }
        },
        beforeCreate() {
            this.$store.dispatch("getUserData");
        },
        computed: {
            firstname: function () {
                return this.$store.state.user_data.first_name;
            },
            lastname: function() {
                return this.$store.state.user_data.last_name;
            },
            text: function() {
                return "Your account, " + this.firstname + " " + this.lastname;
            }
        },
        methods: {

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

        .account_info {
            width: 42.875rem;
            min-height: 37.125rem;
            background: #fff;
            box-shadow: 0 8px 10px -3px lightgrey;

            &__header {
                width: 100%;
                min-height: 3.625rem;
                background-color: $lighter-blue;
                text-align: center;
                padding: .9rem 0;

                h1 {
                    font-size: 1.5rem;
                    font-weight: 100;
                }
            }

            .divider {
                width: 100%;
                height: .875rem;
                background: $lighter-pink;
                box-shadow: 0 5px 5px 0 lightgrey;
            }

            &__body {
                width: 100%;
                min-height: 32.61rem;
                padding: .875rem;

                &--header {
                    width: 100%;
                    height: 1.95rem;
                    background: $lighter-blue;

                    h1 {
                        font-size: 1.125rem;
                        font-weight: 100;
                        padding: .375rem .6875rem;
                    }
                }

                .divider-small {
                    width: 100%;
                    height: .4875rem;
                    background: $lighter-pink;
                }

                &--controls {
                    width: 100%;

                    .v-btn-toggle--selected {
                        box-shadow: unset;
                        display: block;
                    }

                    button {
                        height: 2rem;
                        font-size: 1.125rem;
                        text-transform: none;

                        &:first-of-type {
                            background: $lighter-pink;
                            width: 8.125rem;
                            margin-right: .625rem;
                        }

                        &:last-of-type {
                            background: $lighter-blue;
                            width: 10.25rem;
                        }
                    }
                }

                &--content {
                    width: 100%;
                    height: 25.375rem;
                    margin-top: .5rem;
                    background: #f2f2f2;
                    box-shadow: inset 0 4px 5px 0 #666;
                }
            }
        }

        .menu_info {
            width: 15.9375rem;
            height: 37.125rem;

            &__header {
                width: 100%;
                height: 3.625rem;
                background-color: $lighter-blue;
                text-align: center;
                padding: 1rem 0;

                h1 {
                    font-size: 1.5rem;
                    font-weight: 100;
                }
            }

            .divider {
                width: 100%;
                height: .875rem;
                background: $lighter-pink;
                box-shadow: 0 7px 5px -2px lightgrey;
            }

            &__cards {
                a {
                    text-decoration: none;

                    .item {
                        width: 15.9375rem;
                        height: 4.0625rem;
                        background: #E5F0F2;
                        text-align: right;
                        padding: 1.2rem .8125rem;
                        margin-top: .59rem;
                        font-size: 1.5rem;
                        color: #000;
                    }

                    &.router-link-active {
                        .item {
                            background: #AFC6CA;
                            box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
                        }
                    }
                }
            }
        }
    }
</style>
