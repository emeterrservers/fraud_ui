import axios from 'axios'

export default defineNuxtPlugin(async (nuxtApp) => { 
    const url = `http://localhost:8000/`
    const UseAxios = axios.create({
      baseURL: url
        // responseType: 'json',
    });

    nuxtApp.vueApp.provide('UseAxios', UseAxios);
    nuxtApp.provide('UseAxios', UseAxios);
})