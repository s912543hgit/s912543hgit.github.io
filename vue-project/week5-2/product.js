import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";

//匯入元件
import pagination from './component/pagination.js';
import productModal from './component/productmodal.js';
import delModal from  './component/delmodal.js';


// 建立modal
let productmodal = {};
let delProductModal = {};
//宣告變數
const apiUrl =  "https://vue3-course-api.hexschool.io/v2";
const apiPath = "shio-vue";

const app = createApp({
  //區域註冊
  components:{
    pagination,
    productModal,
    delModal
  },
  data() {
    return {
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
      // this.projectModal = new bootstrap.Modal(document.this.$refs.modal)
    productmodal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        // 不能透過esc關掉modal
        keyboard: false,
      }
    );
        // 刪除產品用modal
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
        .post(`${apiUrl}/api/user/check`)
        // 成功的結果
        .then((res) => {
          // 取得產品列表
          this.getProducts();
        })
        // 失敗的結果
        .catch((error) => {
          console.dir(error);
          // 若沒登入跳轉到登入頁面
          alert(error.data.message);
          location.href = "./login.html";
        });
    },

    //取得產品列表
    getProducts(page = 1) {
      //參數預設值 不代入任何參數的情況下的預設
      //此處代表預設值為第一頁
      axios
        .get(
          // query的特殊代法
          `${apiUrl}/api/${apiPath}/admin/products/?page=${page}`
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
        productmodal.show();
      } else if (status === "edit") {
        // 需要將產品資料帶上去，因此使用淺拷貝方式 目的是為了不要改變原始物件資料
        this.tempProduct = { ...item };
        // 因為非新增物件，因此狀態為false
        this.status = false;
        productmodal.show();
      } else if (status === "delete") {
        this.tempProduct = { ...item };
        delProductModal.show();
      }
    },

    closeDelModal() {
      delProductModal.hide();
    },
    closeProductModal() {
      productmodal.hide();
    }
  },
});
app.mount("#app");
