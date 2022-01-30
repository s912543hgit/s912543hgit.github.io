export default {
  props: ["pages"],
  template: `<nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item disabled" :class="{ disabled: !pages.has_pre }">
        <a class="page-link">Previous</a>
      </li>
      <li class="page-item" v-for="page in pages.total_pages" >
        <a class="page-link" href="#" @click="$emit('get-product', page)">{{ page }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" :class="{ disabled: !pages.has_next }">Next</a>
      </li>
    </ul>
  </nav> `,
};
