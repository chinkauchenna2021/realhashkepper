/* eslint-disable no-unused-vars */
import React , {useState} from 'react'
import MainLayout from '../layout/MainLayout';
import { Global } from "../../module/globalStyles/GlobalStyles";
import InputsWithValidation from "../../module/inputs/InputsWithValidation";
import BigButton from "../../module/button/BigButton";

function Login() {
  const [getLogin , setGetLogin] = useState({password:"" , confirmPassword:""})
  return (
    <MainLayout>
      <Global />
      <form className="w-full my-6">
      <div  className="w-full text-center text-xl font-bold">Login Page</div>
              <InputsWithValidation
                inputName={"Enter Password"}
                setInputValue={(e) =>
                  setGetLogin((previousData) => ({
                    ...previousData,
                    password: e.target.value,
                  }))}
                  
              />
              <InputsWithValidation
                inputName={"Confirm Password"}
                setInputValue={(e) =>
                  setGetLogin((previousData) => ({
                    ...previousData,
                    confirmPassword: e.target.value,
                  }))}
            
              />
              <BigButton
                buttonLabel={"Login"}
                buttonClick={() => s()}
              />
            </form>


    </MainLayout>
  )
}

export default Login;