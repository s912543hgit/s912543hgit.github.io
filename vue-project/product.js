

const data = {
    temp:{},

    products: [
  {
    category: "甜甜圈",
    content: "尺寸：14x14cm",
    description: "濃郁的草莓風味，中心填入滑順不膩口的卡士達內餡，帶來滿滿幸福感！",
    id: "-L9tH8jxVb2Ka_DYPwng",
    is_enabled: true,
    origin_price: 150,
    price: 99,
    title: "草莓莓果夾心圈",
    unit: "個",
    num: 10,
    imageUrl: "https://images.unsplash.com/photo-1583182332473-b31ba08929c8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzR8fGRvbnV0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    imagesUrl: [
      "https://images.unsplash.com/photo-1626094309830-abbb0c99da4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2832&q=80",
      "https://images.unsplash.com/photo-1559656914-a30970c1affd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTY0fHxkb251dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
    ]
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description: "蜜蜂蜜蛋糕，夾層夾上酸酸甜甜的檸檬餡，清爽可口的滋味讓人口水直流！",
    id: "-McJ-VvcwfN1_Ye_NtVA",
    is_enabled: true,
    origin_price: 1000,
    price: 900,
    title: "蜂蜜檸檬蛋糕",
    unit: "個",
    num: 1,
    imageUrl: "https://images.unsplash.com/photo-1627834377411-8da5f4f09de8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1001&q=80",
    imagesUrl: [
      "https://images.unsplash.com/photo-1618888007540-2bdead974bbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80",
    ]
  },
  {
    category: "蛋糕",
    content: "尺寸：6寸",
    description: "法式煎薄餅加上濃郁可可醬，呈現經典的美味及口感。",
    id: "-McJ-VyqaFlLzUMmpPpm",
    is_enabled: true,
    origin_price: 700,
    price: 600,
    title: "暗黑千層",
    unit: "個",
    num: 15,
    imageUrl: "https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    imagesUrl: [
      "https://images.unsplash.com/flagged/photo-1557234985-425e10c9d7f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTA5fHxjYWtlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
      "https://images.unsplash.com/photo-1540337706094-da10342c93d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2V8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"
    ]
  }
]
}

Vue.createApp({
            data(){
                return {
                  ...data,
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
              // 確認是否登入 若無登入則被導回登入頁面
              checkLogin:function(params){

                // 確認是否登入
                axios.post(`${this.url}/api/user/check`) 
                // 成功的結果
                .then((res)=>{
                  console.log(res.data);
                })
                // 失敗的結果
                .catch((error)=>{
                  console.dir(error);
                  // 若沒登入跳轉到登入頁面
                  alert('請先登入')
                  location.href = '/login.html';
                })
              }
            },
            mounted(){
              // 取得token
              const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
              console.log(token);
              // 將token夾帶到header裡面
              axios.defaults.headers.common['Authorization'] = token;
              this.checkLogin();
            }
        }).mount('#app')