<template>
    <div class="cover">
        <div class="main_content">
            <v-btn class="cross" flat round to="/">
                <v-icon>clear</v-icon>
            </v-btn>
            <p>
                We are just a humble group of students,
                who wants to make easy way to
                pass tests and get good marks
            </p>
            <br>
            <p>
                Working for you since 2019
                <br>
                <v-icon>favorite_border</v-icon>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "About"
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
            height: 25.75rem;
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

                i {
                    font-size: 1.875rem;
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
        }
    }

</style>
