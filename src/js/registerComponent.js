import { registerUser } from "../service/register.service";
export default {
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 5) || "Min 5 characters",
    ],
    phoneRules: [
        (v) => !!v || 'Phone number is required',
        (v) => /^[0-9]{10}$/.test(v) || 'Phone number must be 10 digits',
    ],
    emailRule: [
      // Defi a custom email validation rule
       (v) => {
        // Regular expression for email validation
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        
        // Test the entered email against the regex
        if (!v.match(emailRegex)) {
          return 'Invalid email format';
        } else {
          return true;
        }
      }
  ],
    error: "",
    user: {
      username: "",
      mobno: '',
      address: "",
      email: "",
      password: "",
      cpassword: "",
    },
  }),
  methods: {
    register() {
      console.log(typeof(this.user.phoneNo),this.user.phoneNo);
      if (
        (this.user.username == "" ||
          this.user.mobno == "" ||
          this.user.address == "",
        this.user.email == "" || this.user.password == " " )
      ) {
        this.error = "Please enter the fields";
      } else if (this.user.password != this.user.cpassword) {
        this.error = "Password does not match";
      } else {
        this.error = " ";
        console.log("register success");
        localStorage.setItem("users", []);
        var payload = {
          userName: this.user.username,
          phoneNo: this.user.mobno,
          address: this.user.address,
          email: this.user.email,
          userType: "customer",
          loginPassword: this.user.password,
        };
        console.log(payload);
        registerUser({
          success: (response) => {
            this.$router.push({ path: `/login` });
            console.log(response);
            alert("success");
          },
          error: (e) => {
            console.log(e);
            alert("error");
          },
          object: payload,
        });
        this.error = "";
      }
    },
    goLogin() {
      this.$router.push({ path: `/login` });
    },
  },
};
