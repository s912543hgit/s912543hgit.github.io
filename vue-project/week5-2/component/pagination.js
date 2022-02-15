export default {
    props:['pages'],
      methods:{
    // 接收外部傳來的pages
    emitPages(item) {
      this.$emit('emit-pages', item);
    }
  },
    template:`
    <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <a href="#" class="page-link" aria-label="Previous" @click="emitPages(pages.current_page - 1)">Previous</a>
      </li>
      <li class="page-item" :class="{ active : page === pages.current_page }" v-for="page in pages.total_pages" >
        <a class="page-link" href="#" @click="emitPages(pages.current_page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <a class="page-link" aria-label="Next" href="#" @click="emitPages(pages.current_page + 1)">Next</a>
      </li>
    </ul>
  </nav> `
}

