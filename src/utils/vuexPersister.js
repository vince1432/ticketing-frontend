import VuexPersister from 'vuex-persister';

const vuexPersister = new VuexPersister({
	key: 'vuex',
	overwrite: true,
	storage: window.localStorage
})

export default vuexPersister;