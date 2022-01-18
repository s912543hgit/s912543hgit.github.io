Vue.createApp({
    data(){
    return {
        url:'https://vue3-course-api.hexschool.io/v2',
        path:'shio-vue'
        }
    },
    methods:{
    // 登入用
    login:function(){
    // 變數
    const emailInput = document.querySelector('#username');
    const pwInput = document.querySelector('#password');
    const username = emailInput.value;
    const password = pwInput.value;
    const user = {
        username,
        password
    }
    console.log(username,password);
    //發送API至遠端並登入(並儲存token)
    axios.post(`${this.url}/admin/signin`, user)
     //成功的結果 
    .then((res)=> {
        console.log(res);
        const {token, expired } = res.data;
        // 儲存token
        // expire設置有效時間
        document.cookie = `hexToken=${ token }; expires=${ new Date(expired)};`;
        // 登入成功後跳轉到商品頁面
        location.href = '/product.html';
        })
         //失敗的結果
        .catch((error)=>{
            console.dir(error);
            })
        },
    },
}).mount('#app')