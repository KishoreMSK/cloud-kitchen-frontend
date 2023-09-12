import { mapGetters } from "vuex";

export default {
  name: "ProductItemCartComponent",
  data() {
    return {
      filteredList: [],
    };
  },
  computed: {
    ...mapGetters({
      itemlist: "getitemlist",
      filtereditemList: "getitemfilteredlist",
    }),
  },
  mounted() {
    console.log(this.$route.params.id);
    this.filteredList = this.$store.dispatch(
      "SET_FILTERED_LIST",
      this.$route.params.id
    );
    console.log(this.filteredList);
  },
  methods: {
    addCart(item) {
      item.quantity = 1;
      // alert("Product Added to cart");
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push(item);
      console.log(users);
      localStorage.setItem("users", JSON.stringify(users));

      // this.$store.dispatch("SET_CART_LIST",item)
    },
  },
};
