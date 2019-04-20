<template>
  <div class="cover">
    <div class="main_content">
      <v-btn class="cross" flat round to="/">
        <v-icon>clear</v-icon>
      </v-btn>
      <v-btn class="arrow" flat round to="/login">
        <v-icon>arrow_right_alt</v-icon>
      </v-btn>
      <v-form class="main_content__form" v-model="valid">
        <v-text-field
                v-model="username"
                prepend-inner-icon="person"
                name="name"
                label="Имя"
                type="text"
                :rules="usernameRules"
                solo
                background-color="#01AFD1"
                class="main_content__form--input"
                height="2.8125rem"
        ></v-text-field>

        <v-text-field
                v-model="surname"
                prepend-inner-icon="person"
                name="surname"
                label="Фамилия"
                type="text"
                :rules="usernameRules"
                solo
                background-color="#01AFD1"
                class="main_content__form--input"
                height="2.8125rem"
        ></v-text-field>

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
                height="2.8125rem"
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
                height="2.8125rem"
        ></v-text-field>
        <v-btn flat round class="custom" @click="submit()">Sign Up</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    valid: false,
    email: "",
    emailRules: [
      v => !!v || "Введите почту",
      v => /.+@.+\..{2,}/.test(v) || "Неправильное значение поля"
    ],
    password: "",
    passwordRules: [v => !!v || "Введите пароль"],
    username: "",
    usernameRules: [v => !!v || "Поле не должно быть пустым"],
    surname: ""
  }),
  methods: {
    submit() {
      if (this.valid) {
        let data = {
          first_name: this.username,
          last_name: this.surname,
          email: this.email,
          password: this.password
        };

        this.$store.dispatch("register", data);
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

      .arrow {
        float:left;
        transform: rotateZ(180deg);
        width: 2.25rem;
        height: 2.25rem;
        margin-top: -.2rem;
        margin-left: -.5rem;

        i {
          font-size: 2.25rem;
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
          background: #1A9D66;
          color: white;
          border-radius: 4.375rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          margin: 0;
          width: 10rem;
          height: 2.8125rem;
          font-size: 1.875rem;
          top: 21rem;
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
          margin-bottom: 2rem;
        }
      }
    }
  }
</style>
