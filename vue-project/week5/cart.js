import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

const url =  "https://vue3-course-api.hexschool.io/v2";
const apiPath = "shio-vue";

const app = createApp({
    data() {
        return {
            cartData:{},
            products:[],
        }
    },
    methods: {
        getProducts() {
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
        }
    },
    mounted() {
        this.getProducts();
    }

})

app.mount('#app');