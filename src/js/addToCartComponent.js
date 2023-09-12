import { mapGetters } from "vuex";
import { orderProduct ,cancelProduct } from "../service/product.service";
export default {
  data() {
    return {
      cartlist: [],
      total: 0,
      orderStatus: '',
    };
  },

  mounted() {
    this.getcart();
    var status = sessionStorage.getItem("status");
    if (!status) {
      this.orderStatus = true;
    } else {
      this.orderStatus = false;
    }
    console.log(this.orderStatus);
  },
  computed: {
    ...mapGetters({
      uniqueItem: "getUniqueItemList",
    }),
  },
  methods: {
    cancelOrder() {
      var users = JSON.parse(localStorage.getItem("users") || "[]");
      var id = localStorage.getItem("id");
      var obj = {};
      var array = [];
      users.forEach((element) => {
        obj = {
          orderId: Date.now() + id,
          customerId: id,
          productId: element.foodId,
          productName: element.foodName,
          price: element.price,
          quantity: element.quantity,
          orderStatus: "Cancelled",
        };
        array.push(obj);
      });
      // const users = JSON.parse(localStorage.getItem("users") || "[]");

      console.log(array);
      cancelProduct({
        success: (response) => {
          console.log(response);
          if (response.data == "sent") {
            alert("Order cancelled successfully");
            this.orderStatus = false;
            sessionStorage.removeItem("status");
          }
        },
        error: (e) => {
          console.log(e);
        },
        object: array,
      });
    },
    getcart() {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      this.cartlist = users;
    },
    emptyCart() {
      localStorage.setItem("users", []);
      this.getcart();
    },
    placeOrder() {
      var users = JSON.parse(localStorage.getItem("users") || "[]");
      var id = localStorage.getItem("id");
      var obj = {};
      var array = [];
      console.log(users);
      users.forEach((element) => {
        obj = {
          orderId: id + Date.now(),
          customerId: id,
          productId: element.id,
          productName: element.foodName,
          price: element.price * element.quantity,
          quantity: element.quantity,
          orderStatus: "ordered"
        };
        array.push(obj);
      });
      orderProduct({
        success: (response) => {
          console.log(response);
          if (response.status == 200) {
            alert("Order Placed Successfully");
            sessionStorage.setItem("status", "ordered");
            this.orderStatus = true;
            setTimeout(() => {
            sessionStorage.setItem("status", null);
            this.orderStatus = false;      
            this.emptyCart()
            },60000)
          }
        },
        error: (e) => {
          console.log(e);
        },
        object: array,
      });
    },
    quantity(item, operation) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      console.log(users);
      var array = [];

      if (operation == "reduce") {
        users[item].quantity = users[item].quantity - 1;
      } else if (operation == "increase") {
        users[item].quantity = users[item].quantity + 1;
      }
      localStorage.setItem("users", JSON.stringify(users));
      this.getcart();
      console.log(array);
    },
    removeItem(value) {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      console.log(value, users);
      var array = [];
      var i = 0;
      users.forEach((element) => {
        console.log(element);
        if (i != value) {
          array.push(element);
        }
        i = i + 1;
      });

      localStorage.setItem("users", JSON.stringify(array));
      this.getcart();
      console.log(array);
    },
  },
};
