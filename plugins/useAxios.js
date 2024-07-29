import axios from 'axios'

export default defineNuxtPlugin(async (nuxtApp) => { 
    const url = `https://fraud-api.onrender.com/`
    const UseAxios = axios.create({
      baseURL: url
        // responseType: 'json',
    });

    nuxtApp.vueApp.provide('UseAxios', UseAxios);
    nuxtApp.provide('UseAxios', UseAxios);
})