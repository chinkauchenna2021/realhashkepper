/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import { GlobalStyling } from '../globalStyles/Global'
import * as S from "./style/Styles"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import useLocalStorage from "use-local-storage";




function SeedPhraseValidation() {
    const [matchingSeed, setMatchingSeed] = useState({ "input3": "", "input5": "", "input7": "" });
    const [value] = useLocalStorage("usersDetails", undefined)
    const {valueData}= value
    const navigate=useNavigate()
    const splitted_seedphrase = valueData.seedPhrase.split(" ")
    const num=[2, 4,6]

    function change(e){
      setMatchingSeed({...matchingSeed, [e.target.name]:e.target.value})
    }
    
     function handleBlur(e){
      if(splitted_seedphrase[e.target.id]===e.target.value){
        return toast("input matched", {
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
      else if(e.target.value ===""){
        return toast("😰  input must not be empty", {
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
      else if(splitted_seedphrase[e.target.id]!==e.target.value){
        return toast("😰  inputs do not match", {
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

    }

    function validate(){
      if(matchingSeed["input3"]===splitted_seedphrase[2] && matchingSeed["input5"]===splitted_seedphrase[4] && matchingSeed["input7"]===splitted_seedphrase[6]){
        navigate("/home")
      }else{
        return toast("😰  inputs do not match", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }) 
      }
    }

  return (
    <MainLayout>
      <S.ScrollBar className='w-full h-full'>
        <GlobalStyling />
        <div className='h-full w-full text-center relative'>
          <div className=" h-fit w-full text-rgb(0, 123, 255) tracking-wide text-lg font-bold items-center py-3 px-2 border-b border-slate-300/20 text-white">
            Validation
          </div>
          <div className="text-sm rounded-lg border-[#eec305] border p-2 tracking-wide py-4 flex justify-start font-semibold text-[#ffe60085]">
            Please validate your account, complete the missing phrases. Click on the box to complete
          </div>
          <div className='w-full h-fit text-center'>
            <div className='grid grid-cols-3 gap-4 pt-6 px-3'>
              {splitted_seedphrase && splitted_seedphrase.map((word, index) => (
                // {clipboard.concat("", word)}
                <div className="border border-gray-500 text-white rounded-lg" key={index}>
                  {!num.includes(index) ? word : <input className='outline-none bg-transparent text-white rounded-md pl-3 '
                    placeholder='enter'
                    name={`input${index + 1}`}
                    onChange={change}
                    id={index}
                    onBlur={handleBlur}
                  />}
                </div>
              ))}
            </div>
          </div>
          <div onClick={validate} className='h-fit w-full absolute bottom-12 flex flex-col justify-center items-center gap-3 '>
            <div className="w-[80%] h-fit py-3 px-3 rounded-lg space-x-4 text-sm font-semibold tracking-wider text-white cursor-pointer border transition-[.5s] border-[#15e193] bg-[#15e19342] hover:bg-[#10e795]">
              Validate
            </div>
          </div>

          {/* {copy&&<} */}
        </div>
      </S.ScrollBar>
    </MainLayout>

  )
}

export default SeedPhraseValidation

