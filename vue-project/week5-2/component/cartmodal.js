const apiUrl =  "https://vue3-course-api.hexschool.io/v2";
const apiPath = "shio-vue";

export default {
    template:`
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
         aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ product.title }}</span>
          </h5>
            <button type="button" class="btn-close"
                    data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-6">
                <img class="img-fluid"  alt="" :src="product.imageUrl">
          </div>
              <div class="col-sm-6">
                <span class="badge bg-primary rounded-pill">{{  }}</span>
                <p>商品描述：{{ product.description }}</p>
                <p>商品內容：{{ product.content }}</p>
                <div class="h5" v-if="product.price === product.origin_price">{{ product.price }} 元</div>
                <del class="h6">原價 {{  product.origin_price}} 元</del>
                <div class="h5">現在只要 {{  product.price }} 元</div>
                <div>
                  <div class="input-group">
                    <input type="number" class="form-control"
                           min="1" v-model="qty">
                    <button type="button" class="btn btn-primary" @click="addToCart">加入購物車</button>
          </div>
          </div>
          </div>
              <!-- col-sm-6 end -->
          </div>
          </div>
          </div>
          </div>
          </div>`
}

