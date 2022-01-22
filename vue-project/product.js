import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
const app = createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "shio-vue",
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    // 確認是否登入 若無登入則被導回登入頁面
    checkLogin() {
      // 確認是否登入
      axios
        .post(`${this.url}/api/user/check`)
        // 成功的結果
        .then((res) => {
          // 取得產品列表
          this.getProducts();
        })
        // 失敗的結果
        .catch((error) => {
          console.dir(error);
          // 若沒登入跳轉到登入頁面
          alert("請先登入");
          location.href = "./login.html";
        });
    },

    //取得產品列表
    getProducts() {
      axios
        .get(
          `https://vue3-course-api.hexschool.io/v2/api/shio-vue/admin/products`
        )
        // 成功的結果
        .then((res) => {
          // 將產品列表帶入空陣列
          this.products = res.data.products;
        })
        // 失敗的結果
        .catch((error) => {
          console.dir(error);
        });
    },
    openProduct(item) {
      this.tempProduct = item;
    },
  },
  mounted() {
    // 將token夾帶到header裡面
    //  取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    console.log(token);
    //   把token夾帶到header裡面
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();
  },
});

app.mount("#app");
