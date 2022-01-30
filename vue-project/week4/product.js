import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
import pagination from "./pagination.js";

// 建立modal
let projectModal = {};
let delProductModal = {};

const app = createApp({
  components: {
    pagination,
  },
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io/v2",
      path: "shio-vue",
      status: false,
      pagination: {},
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  mounted() {
    // 將token夾帶到header裡面
    //  取得token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //   把token夾帶到header裡面
    axios.defaults.headers.common["Authorization"] = token;
    this.checkLogin();

    // 產品用modal
    // 刪除產品用modal
    projectModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        // 不能透過esc關掉modal
        keyboard: false,
      }
    );
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
      }
    );
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
          alert(err.data.message);
          location.href = "./login.html";
        });
    },

    //取得產品列表
    getProducts(page = 1) {
      //參數預設值 不代入任何參數的情況下的預設
      axios
        .get(
          // query的特殊代法
          `https://vue3-course-api.hexschool.io/v2/api/shio-vue/admin/products/?page=${page}`
        )
        // 成功的結果
        .then((res) => {
          // 將產品列表帶入空陣列
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        // 失敗的結果
        .catch((error) => {
          console.dir(error);
        });
    },
    openProduct(item) {
      this.tempProduct = item;
    },

    // status 為true的時候意思為新增的產品，false則屬於編輯
    updateProduct() {
      let url = `${this.url}/api/${this.path}/admin/product`;
      let method = "post";
      // 根據status來決定要串接post或是put api
      // 編輯的狀態
      if (!this.status) {
        url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
        method = "put";
      }
      // post和put需要代的參數相同，因此可以寫在一起
      // [method]裡帶入httpmethods
      axios[method](url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          projectModal.hide();
          // 重新取得產品列表
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },

    // 刪除產品
    delProduct() {
      let url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url, { data: this.tempProduct })
        .then((response) => {
          alert(response.data.message);
          delProductModal.hide();
          // 重新取得產品列表
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },

    // modal的JS
    // 參數的status  new edit delete
    openModal(status, item) {
      if (status === "new") {
        this.tempProduct = {
          // 需要做清空的動作
          imagesUrl: [],
        };
        // 改變status的狀態
        this.status = true;
        projectModal.show();
      } else if (status === "edit") {
        // 需要將產品資料帶上去，因此使用淺拷貝方式 目的是為了不要改變原始物件資料
        this.tempProduct = { ...item };
        // 因為非新增物件，因此狀態為false
        this.status = false;
        projectModal.show();
      } else if (status === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },
  },
});
app.component("productModal", {
  props: ["tempProduct"],
  template: "#templateforProduct",
});
app.mount("#app");
