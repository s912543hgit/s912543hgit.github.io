<template>
  <h2>{{ product.title }}</h2>
  <img :src="product.imageUrl" alt="">
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      console.log(this.$route)
      const { id } = this.$route.params
      this.$http(`https://vue3-course-api.hexschool.io/v2/api/shio-vue/product/${id}`)
        .then(res => {
          this.product = res.data.product
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
