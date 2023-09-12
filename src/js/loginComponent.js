import { loginUser } from "@/service/login.service";

export default {
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        // value => (value && value.length >= 5) || 'Min 5 characters',
      ],
      user: {
        uname: "",
        upassword: "",
        userType: "",
      },
    };
  },
  methods: {
    userLogin() {
      var payload = {
        email: this.user.uname,
        loginPassword: this.user.upassword,
        userType: this.user.userType,
      };
      loginUser({
        success: (response) => {
          localStorage.setItem("id", response.data.id);
          console.log(response);
          if (response.status == 200) {
            if (this.user.userType == "admin") {
              this.$router.push({ path: "/admin/inventory" });
            } else {
              this.$router.push({ path: "/user/" });
            }
          } else {
            alert("invalid credentials");
          }
        },
        error: (e) => {
          console.log(e);
        },
        object: payload,
      });
    },
    userReset() {
      this.user.uname = "";
      this.user.upassword = "";
      this.user.userType = "";
    },
  },
};
