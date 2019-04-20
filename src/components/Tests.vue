<template>
    <div class="profile_body">
        <div class="profile_body__header">
            <h1>List of tests</h1>
        </div>
        <div class="divider"></div>
        <div class="profile_body__controls">
            <router-link to="/user/tests/all">
                <div class="item all">
                    All Tests
                </div>
            </router-link>
            <router-link to="/user/tests/done">
                <div class="item done">
                    Done Tests
                </div>
            </router-link>
        </div>
        <div class="profile_body__content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile"
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/colors.scss";

    .profile_body {
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

        &__controls {
            display: flex;

            a {
                text-decoration: none;
                color: black;
                font-size: 1.125rem;

                .item {
                    height: 2rem;
                    text-align: center;
                    padding: .3rem;
                    transition: .3s;

                    &.all {
                        width: 8.125rem;
                        background: $lighter-pink;
                        margin-right: .6875rem;
                    }

                    &.done {
                        width: 10.1875rem;
                        background: $lighter-blue;
                    }
                }

                &.router-link-active {
                    .item {
                        box-shadow: inset 0 3px 5px 0 #777;
                    }
                }
            }
        }

        &__content {
            width: 100%;
            height: 25.375rem;
            background: #f2f2f2;
            margin-top: .5rem;
            box-shadow: inset 0 3px 5px 0 #777;
        }
    }
</style>
