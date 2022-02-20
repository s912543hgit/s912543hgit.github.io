// import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js";
const { createApp } = Vue;

const apiUrl =  "https://vue3-course-api.hexschool.io/v2";
const apiPath = "shio-vue";

//載入規則
VeeValidate.defineRule('email', VeeValidateRules['email']);
VeeValidate.defineRule('required', VeeValidateRules['required']);
//載入外部資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),//將其切換成中文版
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});


const app = createApp({
    data() {
        return {
            cartData:{},
            products:[],
            productId:'',
            isLoadingItem:'',
            form: {
                user: {
                    email: '',
                    name: '',
                    address: '',
                    phone: ''
                },
                message:''
            }
        };
    },
    methods: {
        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products/all`)
            .then((res)=>{
                // console.log(res);
                this.products = res.data.products;
            });
        },
        openProductModal(id){
            this.productId = id;
            this.$refs.productModal.openModal();
        },
        // 取得購物車內容
        getCart(){
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then((res)=>{
                console.log(res);
                //購物車的資料有兩層data
                this.cartData = res.data.data;
            });
        },
        //加入購物車
        // 帶入兩個參數 使用參數預設值
        addToCart(id, qty = 1) {
            //建立資料格式
            const data = {
                product_id : id,
                qty,
            }
            this.isLoadingItem = id;
            // 將資料格式帶入
            axios.post(`${apiUrl}/api/${apiPath}/cart`,{ data })
            .then((res)=>{
                console.log(res);
                this.getCart();
                this.isLoadingItem = '';
                this.$refs.productModal.closeModal();
            });
        },
        // 刪除產品
        removeCartItem(id){
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`,)
            .then((res)=>{
                console.log(res);
                this.getCart();
                this.isLoadingItem = '';
            });
        },
        //更新購物車
        updateCartItem(item) {
            const data = {
              product_id: item.id,
              qty: item.qty,
            };
            this.isLoadingItem = item.id;
            axios.put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data }).then((res) => {
              console.log(res);
              this.getCart();
              this.isLoadingItem = '';
            });
          },
          putOrder(data) {
            axios.post(`${apiUrl}/api/${apiPath}/order`,{data: this.form})
            .then((res)=>{
                console.log(res);
                this.getCart();
                //清空表單
                this.$refs.form.resetForm();
            })
            .catch((error) => {
                alert(error.data.message);
            });
          },
          //驗證手機號碼
          isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
          }
    },
    mounted(){
        this.getProducts();
        // this.$refs.productModal.openModal()
        this.getCart();
    },
});

// $refs
app.component('product-modal',{
    props:['id'],
    template: '#userProductModal',
    data(){
        return {
            modal:{},
            product:{},
            //購物車的項目至少要有一個，所以填入1
            qty:1,
        }

    },
    //當id有變動的時候觸發getproduct行為
    watch:{
        id(){
            this.getProduct();
        },
    },
    methods:{
        openModal(){
            this.modal.show();
        },
        closeModal(){
            this.modal.hide();
        },
        getProduct(){
            axios.get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
            .then((res)=>{
                console.log(res);
                this.product = res.data.product;
            });
        },
        addToCart(){
            // 將預設值帶入
            this.$emit('add-cart', this.product.id, this.qty);
        },
    },
    mounted(){
        this.modal = new bootstrap.Modal(this.$refs.modal);
        // this.modal.show();
    },
});

//表單驗證相關
// 引用了VeeValidate裡面的code，並註冊為元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');
