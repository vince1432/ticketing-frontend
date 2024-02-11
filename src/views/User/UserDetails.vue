<template>
	<q-toolbar class="shadow-up-7 text-primary w-full">
		<q-btn flat round dense icon="fa-solid fa-arrow-left" @click="router.push({ name: 'user' })"/>
		<q-toolbar-title>
			<div v-if="userID">User #{{ userID }}</div>
			<div v-else>New User</div>
		</q-toolbar-title>
	</q-toolbar>
	<div class="q-pa-md">
		<q-form
			@submit.prevent=""
			class="row"
		>
			<div class="q-pa-md col-12">
				<q-input
					filled dense
					v-model="user.name"
					label="Name"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Please add name']"
				/>
			</div>
			<div class="q-pa-md col-12">
				<q-input
					filled dense
					v-model="user.email"
					label="Email"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Please add email']"
				/>
			</div>
      <div class="q-pa-md col-12" v-if="isCreate">
				<q-input
					filled dense
					v-model="user.password"
					label="Password"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Please add password']"
				/>
			</div>
      <div class="q-pa-md col-12" v-if="isCreate">
				<q-input
					filled dense
					v-model="user.password_confirmation"
					label="Confirm Password"
					lazy-rules
					:rules="[ val => val && val.length > 0 || 'Please confirm password']"
				/>
			</div>
			<div class="q-pa-md col-12">
				<q-file
					v-model="user.image"
					label="Pick image"
					filled
					counter
					accept=".jpg,.jpeg,.png"
				>
					<template v-slot:prepend>
						<q-icon name="attach_file" />
					</template>
				</q-file>
			</div>
			<div class="q-gutter-md col-12 row justify-center">
				<q-btn :label="btnText" type="button" color="primary" :loading="btnLoading" @click="onSubmit()"/>
				<q-btn label="Cancel" type="button" color="negative" flat class="q-ml-sm" @click="router.push({ name: 'user' })"/>
			</div>
		</q-form>

	</div>



</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import apiError from '../../composables/apiErrorComposable';
import loadingComposable from '../../composables/loadingComposable';
import { addUser, getUser, updateUser } from '../../utils/api';
import { successToast } from '../../utils/quasarNotif';

const route = useRoute();
const router = useRouter();
const { handle } = apiError();
const { showLoading } = loadingComposable();

const $store = inject('$store')
const activeUser = $store.getters.activeUser;

const userID = ref(route.params.user);
const isCreate =  ref(route.path === '/user/create');
const user = ref({
	id: null,
	name: null,
	email: null,
	password: null,
  password_confirmation: null,
	image: null,
});
const btnLoading = ref(false);
const btnText = ref("Create");
const canLoadComment = ref(true);

// set button text
btnText.value = (isCreate.value) ? 'Create' : 'Update';

onMounted(() => {
	// dont call if the page is for creating ticket

	if(!isCreate.value) {
		showLoading(true)
		UserDetails()
	}
})

// send request
const onSubmit = () => {
	btnLoading.value = true;

	if(isCreate.value)
		UserAdd(user.value)
	else
		UserUpdate(userID.value, user.value)
}

// ----------- tickets api call -----------//

// ticket create
const UserAdd = (data) => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('password_confirmation', data.password_confirmation);
  formData.append('image', data.image);

	addUser(formData)
			.then(function ({ data }) {
				router.push({ name: 'ticket-details', params: { ticket: data.data.id}})
				isCreate.value = false
				btnText.value = "Update"
				successToast(`Ticket created successfuly`, `Ticket #${data.data.id}`)
				userID.value = data.data.id;
				canLoadComment.value = false;
			})
			.catch(function ({ response }) {
				handle(response)
			})
			.finally(() => {
				btnLoading.value = false;
			});
}

// ticket update
const UserUpdate = (id, data) => {
	updateUser(id, data)
			.then(function ({ data }) {
				successToast("User updated successfuly")
			})
			.catch(function (response) {
				handle(response)
			})
			.finally(() => {
				btnLoading.value = false;
			});
}

// ticket details
const UserDetails = () => {
	getUser(userID.value)
			.then(function ({ data }) {
				user.value = data.data
			})
			.catch(function ({ response }) {
				handle(response)
			})
			.finally(function () {
				showLoading(false)
			})
}

</script>

<style lang="scss" scoped>
.comment_subhead {
	font-weight:lighter;
	font-size: 10px;
}
</style>
