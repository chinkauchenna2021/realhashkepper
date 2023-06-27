/* eslint-disable no-unused-vars */
import React,{useEffect, useReducer, useState} from 'react'
import MainLayout from '../layout/MainLayout'
import { GlobalStyling } from '../globalStyles/Global'
import * as S from "./style/Styles"
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useLocalStorage from "use-local-storage";
import preval from "babel-plugin-preval/macro";
import { ToastContainer, toast } from "react-toastify";




const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password1: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/^(.*[!@#$%^&*]){2}/, 'Password is not strong enough')
    .required('Required'),
  password2: Yup.string()
    .oneOf([Yup.ref('password1'), null], 'Passwords must match')
    .required('Required'),
  nickname: Yup.string().required('Required'),

});


function Register() {
  // const[doNavigate, setDoNavigate]= useState(false)
  const [saveUsersDetails, setSavedUsersDetails] = useLocalStorage(
    "usersDetails",
    { valueData: {}, isLoggedin: false }
  );
  const [value] = useLocalStorage("usersDetails", undefined)
  const navigate=useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password1: '',
      password2: '',
      nickname:"",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission
    },

  });

  const fetchAccount = async () => {
    return await axios
      .get(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}createWallet`)
      .then((returnedData) => returnedData.data);
  };

  const {
    isLoading,
    isError,
    data: queryUsersAccount,
    error,
    refetch,
  } = useQuery({ queryKey: ["usersAccount"], queryFn: fetchAccount });

  console.log(queryUsersAccount);
   
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const secreteFiles = preval`
  //     const fs = require('fs')
  //     module.exports = fs.readFileSync(require.resolve('./secretes.txt'), 'utf8')
  //   `;

  //       if (
  //         secreteFiles !== "" &&
  //         saveUsersDetails.isLoggedin == true &&
  //         Object.keys(saveUsersDetails.valueData).length != 0
  //       ) {
  //         navigate("/home");
  //       }

  //       if (
  //         saveUsersDetails.isLoggedin == false &&
  //         secreteFiles != "" &&
  //         Object.keys(saveUsersDetails.valueData).length == 0
  //       ) {
  //         navigate("/login");
  //       }
  //       if (
  //         saveUsersDetails.isLoggedin == false &&
  //         secreteFiles == "" &&
  //         Object.keys(saveUsersDetails.valueData).length == 0
  //       ) {
  //         navigate("/");
  //       }
  //     } catch {}
  //   })();
  // }, []);
  console.log(formik);

  // function saveToLocalStorage(){
  //   let data = {
  //     password: formik.values.password2,
  //     walletAddress: queryUsersAccount.publicKeys,
  //     privateKey: queryUsersAccount.privateKeys,
  //     seedPhrase: queryUsersAccount.seedPhrases,
  //     // nickname: formik.values.nickname,
  //     email: formik.values.email,
  //     accountID: queryUsersAccount.accountID,
  //   };

  //   console.log(data);
  //   let store=JSON.parse(window.localStorage.getItem("usersDetails"))||null
  // }

   const navigateUsersPage = async () => {
      try {  
        // if (
        //   !formik.errors && formik.touched
        // ) {
          let data = {
            password: formik.values.password2,
            walletAddress: queryUsersAccount.publicKeys,
            privateKey: queryUsersAccount.privateKeys,
            seedPhrase: queryUsersAccount.seedPhrases,
            nickname: formik.values.nickname,
            email: formik.values.email,
            accountID: queryUsersAccount.accountID,
          };
          console.log(data);
          setSavedUsersDetails({ valueData: data, isLoggedin: true })
          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}register`,
            data
          );
          console.log(response);
          if (response.status === 200) {
            //  updateInput(updateStorage); //clean update redux
  
            const secreteFiles = preval`
        const fs = require('fs')
        module.exports = fs.writeFileSync(require.resolve('./secretes.txt'),'secrete saved');
        `;
            toast("🤝 Registration was Successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
  
            // const updateStorage = {
            //   email: register.email,
            //   password: register.password,
            //   nickname: register.nickname,
            //   usersAccount: register.usersAccount,
            //   usersPrivateKey: register.usersPrivateKey,
            //   usersSeedPhrase: queryUsersAccount.seedPhrases,
            //   accountID: queryUsersAccount.accountID,
            // };
            navigate("/seedphrase");
          } else {
            toast("🤝 Registration failed please try again later", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
          } catch (err) {
            console.log(err);
            toast("🤝 Registration failed with errors", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          }
    };

  return (
    <MainLayout>
    <S.ScrollBar className='w-full h-full'>
      <GlobalStyling />
      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
        <div className='h-full w-full text-center items-center'>
          <div className=" h-fit w-full text-rgb(0,123,255) tracking-wide text-lg font-bold py-5 px-2 border-b border-slate-300 text-white">
            Register
          </div>

          <div className=' w-full flex flex-col justify-center items-center gap-1 pt-12'>

            
            <div className='w-full h-fit'>
              <input type="email" placeholder='Email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className='w-[90%] h-[50px] text-white px-3 bg-[#0f0f0f8f] border border-[#131313] rounded-lg py-3 outline-none' name="email" />
            </div>
            <div className={'w-[90%] flex items-center'}>
              <div className={`text-red-500 h-7 ${formik.touched.email && formik.errors.email ? "opacity-1" : "opacity-0"}`}>{formik.errors.email}</div>
            </div>

            

            <div className='w-full h-fit'>
              <input type="password" placeholder='password' id="password1" value={formik.values.password1} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className='w-[90%] h-[50px] text-white px-3 bg-[#0f0f0f8f] border border-[#131313] rounded-lg py-3 outline-none' name="password1" />
            </div>
            <div className={'w-[90%] flex items-center'}>
              <div className={`text-red-500 h-7 flex justify-center items-center ${formik.touched.password1 && formik.errors.password1 ? "opacity-1" : "opacity-0"}`}>{formik.errors.password1}</div>
            </div>

            

            <div className='w-full h-fit'>
              <input type="password" placeholder='repeat password' id="password2" value={formik.values.password2} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className='w-[90%] h-[50px] text-white px-3 bg-[#0f0f0f8f] border border-[#131313] rounded-lg py-3 outline-none' name="password2" />
            </div>
            <div className={'w-[90%] flex items-center'}>
              <p className={`text-red-500 h-7 ${formik.touched.password2 && formik.errors.password2 ? "opacity-1" : "opacity-0"}`}>{formik.errors.password2}</p>
            </div>

            <div className='w-full h-fit'>
              <input type="text" placeholder='Nickname' id="nickname" value={formik.values.nickname} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className='w-[90%] h-[50px] text-white px-3 bg-[#0f0f0f8f] border border-[#131313] rounded-lg py-3 outline-none' name="nickname" />
            </div>
            <div className={'w-[90%] flex items-center'}>
              <p className={`text-red-500 h-7 ${formik.touched.nickname && formik.errors.nickname ? "opacity-1" : "opacity-0"}`}>{formik.errors.nickname}</p>
            </div>

            <div onClick={navigateUsersPage}
              className={`w-[90%] h-fit py-[5px] `}>
              {!formik.isValid ?

                <button
                  type="submit"
                  className={"w-full h-fit bg-[#03f58444] py-[10px] px-3 rounded-md text-md font-semibold text-white"}
                  disabled
                >
                  WAITING
                </button>
                :
                <button
                  type="submit"
                  className={"w-full h-fit bg-[#03f584] py-[10px] px-3 rounded-md text-md font-semibold text-white"}
                >
                  REGISTER
                </button>
              }
            </div>
          </div>

        </div>
      </form>
    </S.ScrollBar>
  </MainLayout>

  )
}

export default Register



