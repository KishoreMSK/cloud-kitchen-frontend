import EditProductComponent from "../components/EditProductComponent";
import {
  createProduct,
  getProduct,
  deleteProduct,
} from "../service/product.service";
export default {
  data() {
    return {
      product: {
        foodName: "",
        category: "",
        itemType: "",
        price: "",
        cuisine: "",
        rating: "",
        duration: "",
        offer: "",
        coupon: "",
        stockCount: null,
        description: "",
        image: "",
      },
      search: "",
      name: "InventoryComponent",
      dialog: false,
      dialog2: false,
      components: {
        EditProductComponent
      },
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      headers: [
        { text: "url", value: "url" },
        { text: "Product Name", value: "foodName" },
        { text: "Item type", value: "itemType" },
        { text: "Category", value: "category" },
        { text: "cuisine", value: "cuisine" },
        { text: "price", value: "price" },
        { text: "description", value: "description" },
        { text: "rating", value: "rating" },
        { text: "duration", value: "duration" },
        { text: "offer", value: "offer" },
        { text: "coupon", value: "coupon" },
        { text: "Availablity", value: "stockCount" },
        { text: "Actions", value: "Actions" },
      ],
      products: [],
    };
  },
  mounted() {
    this.getProductsList();
    console.log(this.dialog2);
  },
  methods: {
    getProductsList() {
      getProduct({
        success: (response) => {
          this.products = response.data;
        },
        error: (e) => {
          console.log(e);
        },
      });
    },
    deleteItem(item) {
      deleteProduct({
        success: (response) => {
          console.log(response);
          this.getProductsList();
        },
        error: (e) => {
          console.log(e);
          alert("error");
        },
        object: item.foodId,
      });
    },
    saveInventory() {
      console.log(this.product);
      createProduct({
        success: (response) => {
          console.log(response);
          this.dialog = false;
          this.getProductsList();
        },
        error: (e) => {
          console.log(e);
          alert("error");
        },
        object: this.product,
      });
    },
  },
  components: {},
};
