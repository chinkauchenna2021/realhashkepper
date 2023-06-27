/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import NavBar from '../layout/NavBar'
import * as S from './style/Styles'
import { GlobalStyling } from '../globalStyles/Global'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { MdArrowBack , MdSupervisedUserCircle , MdAccountBalanceWallet  , MdOutlineArrowDropDown , MdClose , MdAddCircle , MdRemoveCircle , MdInfo} from "react-icons/md";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';
import "./style/scrollbar.css"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useLocalStorage from "use-local-storage";





function SendHadera() {
    const [show, setShow] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [tokenTransfer, setTokenTransfer] = useState({
        tokenTo: "",
        tokenFrom: "",
        amount: 0,
      });
    const [value] = useLocalStorage("usersDetails", undefined)
    const {valueData}= value
    

    const usersID = valueData.accountID;

    const makeTransfer = async () => {
        setTokenTransfer((previousData) => ({
          ...previousData,
          tokenFrom: usersID,
        }));
        if (
          tokenTransfer.tokenTo == "" ||
          tokenTransfer.tokenFrom == "" ||
          tokenTransfer.amount == ""
        ) {
          toast("input can  not be Empty", {
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
    
        const transferData = {
          senderAddress: tokenTransfer.tokenFrom,
          receiverAddress: tokenTransfer.tokenTo,
          amount: tokenTransfer.amount,
        };
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}transfer`,
          transferData
        );
        if (response.status == 200) {
          toast(
            `🤝 transfer of ${tokenTransfer.amount} to ${tokenTransfer.tokenTo} `,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
        }
      };
    console.log(show);
  return (
    <MainLayout>
      <NavBar title={"send"} backArrow={<MdArrowBack size={18} className='text-white' />} />
        <GlobalStyling />
        <S.ScrollBar className="w-full h-[450px] overflow-y-scroll">
              <div className=' w-full min-h-[50px] mt-4  flex-col justify-center items-center space-y-3 pb-5'>
                  <div className='w-full pt-3 text-xs uppercase text-white tracking-wider px-4 font-semibold'>Recipient</div>
                  <div className='w-full flex justify-center items-center'>
                      <div className='w-11/12 flex flex-row justify-between items-center  border border-slate-300 rounded-md px-2'>
                          <input className='w-10/12 outline-none capitalize bg-transparent text-white h-10 rounded-md pr-3' placeholder='Enter recipient account Id' 
                          onChange={(e) => {setTokenTransfer((pastInput) => ({
                                ...pastInput,
                                tokenTo: e.target.value,
                            }));console.log(tokenTransfer)}}
                            />
                          <div className="capitalize font-semibold w-fit rounded-full px-4 py-2 bg-[#e11584]/90 text-orange-500 cursor-pointer text-white">paste</div>
                      </div>                     
                  </div>
                  
                  <div className="w-full h-fit py-5 flex justify-start items-center">
                      <div className="w-full flex flex-row justify-center items-center space-x-3 px-2">
                          <div className="cursor-pointer w-fit space-x-3 rounded-full  bg-[#e11584]/90 px-3 py-2 flex justify-between items-center">
                              <div className="w-fit h-fit"><MdSupervisedUserCircle size={25} className='text-white'/></div>
                              <div className="text-sm font-semibold tracking-wider text-white ">Contacts</div>
                          </div>
                              <div className="cursor-pointer w-fit  space-x-3 rounded-full bg-[#e11584]/90 px-3 py-2 flex justify-between items-center">
                              <div className="w-fit h-fit"><MdAccountBalanceWallet size={25} className='text-white' /></div>
                              <div className="text-sm font-semibold tracking-wider capitalize text-white">My Wallet</div>
                          </div>
                      </div>

                  </div>
              
                  <div className='w-full pt-3  text-xs uppercase text-white bg-transparent tracking-wider px-4 font-semibold'>Amount to send</div>
                  <div className='w-full flex justify-center items-center'>
                      <div className='w-11/12 flex flex-row justify-between items-center  border border-slate-300 rounded-md px-2 '>
                          <input className='w-full outline-none capitalize h-10 rounded-md text-white bg-transparent pr-3 ' placeholder='Enter HBAR Amount '
                           onChange={(e) =>
                            setTokenTransfer((pastInput) => ({
                              ...pastInput,
                              amount: e.target.value,
                            }))
                          }
                          />
                          {/* <div className="capitalize font-semibold w-fit rounded-full px-4 py-2 bg-orange-200 text-orange-500 cursor-pointer">paste</div> */}
                      </div>
                      
                  </div>
                  
                  {/* <div className="w-full h-fit py-5 flex justify-start items-center">
                      <div className="w-full flex flex-row justify-start items-center space-x-3 px-2">
                          <div className="cursor-pointer w-fit space-x-3 rounded-full  bg-slate-200 px-2 py-2 flex justify-between items-center">
                              <div className="w-fit h-fit"><MdSupervisedUserCircle size={25} className='text-black/70'/></div>
                              <div className="text-sm font-semibold tracking-wider text-black/70 ">Contacts</div>
                          </div>
                              <div className="cursor-pointer w-fit space-x-3 rounded-full bg-slate-200 px-2 py-2 flex justify-between items-center">
                              <div className="w-fit h-fit"><MdAccountBalanceWallet size={25} className='text-black/70' /></div>
                              <div className="text-sm font-semibold tracking-wider capitalize text-black/70">My Wallet</div>
                          </div>
                      </div>

                  </div> */}
              
              </div>   
                 <div className='pb-4  w-full min-h-[50px] mt-4  flex-col justify-center items-center space-y-1'>
                  <div  onClick={() => setShow(!show)}  className='cursor-pointer w-full pt-1 text-sm uppercase text-black/70 tracking-wider px-2 font-semibold flex flex-row justify-center items-center space-x-2'>
                      <div className="capitalize font-light  text-md text-white">transaction fee:</div>
                      <div className='font-bold text-md  flex flex-row justify-center items-center text-white'>0.000300 HBAR <span className='text-xs px-1 text-white'>{"(~$0.0001)"}</span> <span className=''><MdOutlineArrowDropDown size={20} color='ffffff' /></span></div>
                  </div>

                  <div  className='w-full h-fit flex justify-center items-center py-2'>
                      <div className='rounded-md bg-[#e11584]/90 w-full h-10 flex justify-center items-center text-md font-bold capitalize tracking-wider text-slate-900/60 cursor-pointer text-white'>Review Transfer</div>
                  </div>
              </div>   




        </S.ScrollBar>
          <BottomSheet skipInitialTransition open={show} snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.7]} className='--rsbs-bg-transparent' >
            <GlobalStyling />
              <S.ScrollBar >
              <div className='w-full h-full backdrop-blur-2xl bg-black/80 px-2'>     
                <div  className='h-14 border-b border-b-slate-200 w-full flex items-center '>
                    <div onClick={()=>setShow(false)} className='w-8 p-2 h-8 ml-1 mr-14 flex justify-center items-center border border-slate-300/50 rounded-full '><MdClose size={20} className='text-white cursor-pointer' /></div>
                    <div className='w-8/12 text-lg tracking-wider font-bold text-white'>Transaction Fee</div>
                    
                </div>
                <div className='min-h-[200px] w-full  px-3 '>
                    <div className="w-full h-fit">
                        <div className='w-full h-fit text-white text-lg font-bold tracking-wide py-2 px-1'>About Transaction Fee</div>
                        <div className='h-fit w-full text-left text-md text-white/80 font-base'>
                            Transaction fee is charged by the network. Leap Wallet is free to use. Higher the transaction fee, faster the transaction will go through.
                        </div>   
                        <div className='space-x-1 p-1 my-5 h-16 w-full flex flex-row justify-between items-center'>
                            <div className='flex-col  bg-[#FFE569]/80 w-full h-full justify-center items-center rounded-xl bg-[#e11584]/90  py-1'>
                                <div className='w-full h-fit flex justify-center items-center font-bold text-lg  text-white'>Low</div>
                                <div className='w-full h-fit flex justify-center items-center font-semibold text-xs  text-white/90'>0.0000150 <span className='text-xs px-1 text-white font-bold' >HBAR</span></div>                 
                            </div>
                            <div className='flex-col  w-full h-full justify-center items-center bg-[#e11584]/90 rounded-xl  py-1'>
                                <div className='w-full h-fit flex justify-center items-center font-bold text-lg text-white'>Medium</div>
                                <div className='w-full h-fit flex justify-center items-center font-semibold text-xs  text-white/90'>0.001150 HBAR</div>
                                
                            </div>
                        <div className='flex-col   w-full h-full justify-center items-center rounded-xl bg-[#e11584]/90  py-1'>
                                <div className='w-full h-fit flex justify-center items-center font-bold text-lg text-white'>High</div>
                                <div className='w-full h-fit flex justify-center items-center font-semibold text-xs text-white/90'>0.002150 HBAR</div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-12 flex justify-end items-center">
                            <div className="w-fit h-12 text-sm tracking-wider text-white cursor-pointer font-semibold flex flex-row justify-center items-center space-x-2" onClick={() => setShowMore(!showMore)}><span className='w-fit h-fit text-white'>Show additional settings</span>{showMore? <span className="w-fit h-fit"><MdRemoveCircle size={17} className='text-[#e11584]/90 pt-1' /></span> : <span className="w-fit h-fit"><MdAddCircle   size={17} className='text-[#e11584]/90 pt-1' /></span> }</div>  
                    </div>
                    {
                    showMore &&
                        (<div className='w-full min-h-[100px] backdrop-blur-lg bg-black/60 rounded-lg my-3 px-2 py-4'>
                            <div className='w-full h-fit text-sm font-semibold text-white p-2'>You are paying fees transaction fees in</div>
                            <div className="w-full h-fit flex justify-between items-center text-md">
                                <div className="space-x-2 w-fit h-fit flex justify-center items-center flex-row border border-slate-100 py-2 px-4 rounded-full">
                                    <div className='w-fit h-fit'><img src='../hederaImage.png' className='h-5 w-5'/></div>     
                                    <div className="w-fit h-fit font-bold text-md text-white">HBAR</div>
                                </div>
                                
                                <div className='w-fit h-fit flex justify-center items-center flex-row space-x-2 tracking-wide'>
                                    <div className='text-md font-bold text-white'>Balance:</div>
                                    <div className='text-md font-bold text-white'>0.233 HBAR</div>

        
                            </div>
                            </div>
                            <div className='w-full'>
                                    <div className='w-full my-3 flex justify-start items-center space-x-1 pt-6'><div className="w-fit h-fit text-sm font-semibold text-white py-2">Gas Limit </div><span className='w-fit h-fit' id="my-tooltip" ><MdInfo size={18} className='text-black' /></span></div>
                                    <Tooltip anchorSelect="#my-tooltip"  content="Gas you are willing to spend on this transaction"  className='w-[100px] h-fit text-center'/>
                                <div className='w-full border pr-2 border-white rounded-md h-10 flex justify-center items-center'><input className='rounded-md outline-none w-10/12 h-full bg-transparent text-xl px-3 text-white font-semibold tracking-wider' type='' placeholder={"800000"} />
                                    <div className=' h-full w-2/12 flex justify-center items-center'> <div className="bg-[#e11584]/90 text-white w-full px-2 h-7 flex justify-center items-center rounded-full " >Reset</div></div>
                                </div>
                                
                            </div>
                    </div> )  
                    }
                    <div onClick={makeTransfer} className="container w-full h-fit my-4">
                        <button className="w-full h-10 rounded-md bg-[#e11584]/90 text-md text-white font-semibold outline-none ">Proceed</button>
                    </div>

                    </div>
                    </div>
                    </S.ScrollBar>
            </BottomSheet>
    </MainLayout>
  );
}

export default SendHadera