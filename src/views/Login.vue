<template>
  <div class="form-container">
    <form @submit.prevent="" class="login-form">
      <p class="login-form__item sign-in">Sign In</p>
      <div class="login-form__item">
        <TextBox
          id="username"
          type="text"
          label="Username"
          :error=error.username
          class=""
          @update:text="(val) => (username = val)"
        />
      </div>
      <div class="login-form__item">
        <TextBox
          id="password"
          type="password"
          label="Password"
          :error=error.password
          class=""
          @update:text="(val) => (password = val)"
        />
      </div>
			<p class="error-msg login-form__item">{{ error.credential  }}</p>
      <div class="login-form__item login-form__option">
        <div class="remember-me">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            class="remember-me__check"
          />
          <label for="rememberMe" class="remember-me__label">Remember Me</label>
        </div>
        <router-link :to="{ name: 'login' }">Forgot Password</router-link>
      </div>
      <div class="login-form__item">
        <button class="login-form__button" @click="userLogin">Log In</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TextBox from '../components/TextBox.vue';
import { login } from '../utils/api';
import { serverError } from '../utils/sweetAlert';

const router = useRouter();

const username = ref('')
const password = ref('')
const error = reactive({})
const route = useRoute();

const userLogin = async () => {

	if(!validateForm())
		return;

  let data = {
    email: username.value,
    password: password.value,
  }

  login(data)
    .then(function ({ data }) {
      console.log(data, 'success')
			localStorage.token = data.data.token
			localStorage.refresh_token = data.data.refresh_token

			router.push({ path: 'home' })
    })
    .catch(function ({ response }) {
			if(response.status === 401)
				error.credential = 'Incorrect username or password.'
			else
				serverError()
    })
}

const validateForm = () => {
	error.username = ''
	error.password = ''
	error.credential = ''

  if (!username.value) error.username = 'Username is required.'
  if (!password.value) error.password = 'Password is required.'

	if(!username.value || !password.value)
		return 0;
	else
		return 1;
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 400px;
  margin: auto;
  align-items: center;
  height: 100vh;
  padding-top: 100px;
}

.login-form {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  padding: 0;
  margin: 0;
  width: auto;
  padding-top: 50px;
  height: 400px;
  box-shadow: 0px 10px 20px 5px rgba(1, 1, 1, 0.01);
  background-color: white;

  .sign-in {
    font-size: 30px;
  }
  .login-form__item {
    max-width: 500px;
    margin: 5px 50px;
    position: relative;

    .login-form__button {
      width: 100%;
      height: 50px;
      border-radius: 50px;
      background-color: #38d39f;
      border: none;
      color: white;
    }

    .login-form__button:hover {
      cursor: pointer;
    }
  }

  .login-form__option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #888;
    height: 60px;

    // .remember-me__check {
    // }

    .remember-me__check:hover {
      cursor: pointer;
    }

    .remember-me {
      display: flex;
      gap: 10px;
    }

    a {
      // text-decoration: none;
      color: inherit;
    }
  }
}
</style>
