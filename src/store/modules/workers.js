import axios from 'axios';

export default {
  state: {
    workers: [],
    worker: {},
    loading: false,
  },
  getters: {
    workers: s => s.workers,
    worker: s => s.worker,
    loading: s => s.loading,
  },
  mutations: {
    SET_WORKERS(state, workers) {
      state.workers = workers;
    },
    ADD_WORKER(state, newWorker) {
      state.workers.push(newWorker);
    },
    UPDATE_WORKER(state, worker) {
      const foundIndex = state.workers.findIndex(x => x.id == worker.id);
      state.workers[foundIndex] = worker;
    },
    DELETE_WORKER(state, worker) {
      state.workers = state.workers.filter(item => item.id != worker.id);
    },
    GET_WORKER(state, workerID) {
      state.worker = state.workers.find(item => item.id == workerID);
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    async fetchWorkers({commit}) {
      commit('SET_LOADING', true);
      const response = await axios.get('https://my-json-server.typicode.com/ruslantahiruly/fake-api/workers');
      const workers = response.data;
      commit('SET_WORKERS', workers);
      commit('SET_LOADING', false);
    },
    getWorker({commit}, workerID) {
      commit('GET_WORKER', workerID);
    },
    addWorker({commit}, worker) {
      commit('ADD_WORKER', worker);
    },
    updateWorker({commit}, worker) {
      commit('UPDATE_WORKER', worker);
    },
    deleteWorker({commit}, worker) {
      commit('DELETE_WORKER', worker);
    },
  },
}