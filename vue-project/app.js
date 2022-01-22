import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "shio-vue",
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    // 登入用
    login() {
      //發送API至遠端並登入(並儲存token)
      axios
        .post(`${this.url}/admin/signin`, this.user)
        //成功的結果
        .then((res) => {
          console.log(res);
          const { token, expired } = res.data;
          // 將token儲存在cookie裡面
          // expire設置有效時間
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          // 登入成功後跳轉到商品頁面
          location.href = "./product.html";
        })
        //失敗的結果
        .catch((error) => {
          alert(error.data.message);
        });
    },
  },
});
app.mount("#app");
