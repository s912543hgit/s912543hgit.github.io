<template>
  <h2>購物車</h2>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div style="height: 100px; background-size: cover; background-position: center"
          :style="{ backgroundImage:`url(${product.imageUrl})`}"></div>
        </td>
        <td>
          {{ product.title }}
        </td>
        <td>
          <div class="h5" v-if="product.price === product.origin_price">{{ product.price }} 元</div>
          <div v-else>
            <del class="h6">原價 {{ product.origin_price }} 元</del>
            <div class="h5">現在只要 {{ product.price }} 元</div>
          </div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary"  @click="openProductModal(product.id)"
>
              <!-- <i class="fas fa-spinner fa-pulse" ></i> -->
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger" @click="addToCart(product.id)" :disabled ="isLoadingItem === product.id">
              <i class="fas fa-spinner fa-pulse" v-show="isLoadingItem === product.id"></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cartData: {},
      products: [],
      isLoadingItem: ''
    }
  },
  methods: {
    getProducts () {
      this.$http.get('https://vue3-course-api.hexschool.io/api/shio-vue/products/all')
        .then((res) => {
          this.products = res.data.products
        })
    },
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http.post('https://vue3-course-api.hexschool.io/api/shio-vue/cart', { data })
        .then((res) => {
          console.log(res)
          this.isLoadingItem = ''
          // 觸發navbar上的監聽行為
          emitter.emit('get-cart')
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
