"use strict";(self["webpackChunkproject"]=self["webpackChunkproject"]||[]).push([[962],{530:function(t,n,i){function e(t){return{all:t=t||new Map,on:function(n,i){var e=t.get(n);e?e.push(i):t.set(n,[i])},off:function(n,i){var e=t.get(n);e&&(i?e.splice(e.indexOf(i)>>>0,1):t.set(n,[]))},emit:function(n,i){var e=t.get(n);e&&e.slice().map((function(t){t(i)})),(e=t.get("*"))&&e.slice().map((function(t){t(n,i)}))}}}i.d(n,{Z:function(){return s}});const o=e();var s=o},962:function(t,n,i){i.r(n),i.d(n,{default:function(){return D}});var e=i(252),o=i(577),s=i(963);const l=(0,e._)("h2",null,"購物車",-1),u={class:"table align-middle"},a=(0,e._)("thead",null,[(0,e._)("tr",null,[(0,e._)("th",null,"圖片"),(0,e._)("th",null,"商品名稱"),(0,e._)("th",null,"價格"),(0,e._)("th")])],-1),c={style:{width:"200px"}},r={key:0,class:"h5"},d={key:1},p={class:"h6"},h={class:"h5"},g={class:"btn-group btn-group-sm"},_=["onClick"],b=["onClick","disabled"],f={class:"fas fa-spinner fa-pulse"},v=(0,e.Uk)(" 加到購物車 ");function k(t,n,i,k,m,w){return(0,e.wg)(),(0,e.iD)(e.HY,null,[l,(0,e._)("table",u,[a,(0,e._)("tbody",null,[((0,e.wg)(!0),(0,e.iD)(e.HY,null,(0,e.Ko)(m.products,(n=>((0,e.wg)(),(0,e.iD)("tr",{key:n.id},[(0,e._)("td",c,[(0,e._)("div",{style:(0,o.j5)([{height:"100px","background-size":"cover","background-position":"center"},{backgroundImage:`url(${n.imageUrl})`}])},null,4)]),(0,e._)("td",null,(0,o.zw)(n.title),1),(0,e._)("td",null,[n.price===n.origin_price?((0,e.wg)(),(0,e.iD)("div",r,(0,o.zw)(n.price)+" 元",1)):((0,e.wg)(),(0,e.iD)("div",d,[(0,e._)("del",p,"原價 "+(0,o.zw)(n.origin_price)+" 元",1),(0,e._)("div",h,"現在只要 "+(0,o.zw)(n.price)+" 元",1)]))]),(0,e._)("td",null,[(0,e._)("div",g,[(0,e._)("button",{type:"button",class:"btn btn-outline-secondary",onClick:i=>t.openProductModal(n.id)}," 查看更多 ",8,_),(0,e._)("button",{type:"button",class:"btn btn-outline-danger",onClick:t=>w.addToCart(n.id),disabled:m.isLoadingItem===n.id},[(0,e.wy)((0,e._)("i",f,null,512),[[s.F8,m.isLoadingItem===n.id]]),v],8,b)])])])))),128))])])],64)}var m=i(530),w={data(){return{cartData:{},products:[],isLoadingItem:""}},methods:{getProducts(){this.$http.get("https://vue3-course-api.hexschool.io/api/shio-vue/products/all").then((t=>{this.products=t.data.products}))},addToCart(t,n=1){const i={product_id:t,qty:n};this.isLoadingItem=t,this.$http.post("https://vue3-course-api.hexschool.io/api/shio-vue/cart",{data:i}).then((t=>{console.log(t),this.isLoadingItem="",m.Z.emit("get-cart")}))}},mounted(){this.getProducts()}},y=i(744);const C=(0,y.Z)(w,[["render",k]]);var D=C}}]);
//# sourceMappingURL=962.8024405c.js.map