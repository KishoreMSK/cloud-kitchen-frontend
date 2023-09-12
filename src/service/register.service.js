import axios from 'axios';
export const registerUser = ({success, error,object})=>{
  const api ="http://192.168.43.32:5001/createUser/createadd" 
  axios
  .post(api,object)
  .then((response)=>{   
    
    console.log(response)
    success && success(response)      
  }).catch((e) => {
      error && error(e)
  })
}
