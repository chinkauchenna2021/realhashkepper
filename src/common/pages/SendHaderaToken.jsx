/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout'
import NavBar from '../layout/NavBar'
import * as S from './style/Styles'
import { GlobalStyling } from '../globalStyles/Global';
import { BottomSheet } from 'react-spring-bottom-sheet'
import { Tooltip } from 'react-tooltip'
import 'react-spring-bottom-sheet/dist/style.css'
import { MdArrowBack, MdSupervisedUserCircle, MdAccountBalanceWallet, MdOutlineArrowDropDown, MdClose, MdAddCircle, MdRemoveCircle, MdInfo, MdContentPaste } from "react-icons/md";
import 'react-tooltip/dist/react-tooltip.css';
import "./style/scrollbar.css"
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import useLocalStorage from "use-local-storage";



function SendHaderaToken() {
    const [show, setShow] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [tokenTransfer, setTokenTransfer] = useState({
        tokenTo: "",
        tokenFrom: "",
        amount: 0,
      });
    const [value] = useLocalStorage("usersDetails", undefined)
    const {valueData}= value
    
    const makeTransfer = async () => {
        setTokenTransfer((previousData) => ({
          ...previousData,
          tokenFrom: import.meta.env.VITE_MY_ACCOUNT_ID,
        }));
    
        if (
          tokenTransfer?.tokenTo == "" ||
          tokenTransfer?.tokenFrom == "" ||
          tokenTransfer?.amount == ""
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
        } else {
          if (
            valueData.accountID !== undefined &&
            valueData.privateKey !== undefined
          ) {
            const transferData = {
              senderAddress: import.meta.env.VITE_MY_ACCOUNT_ID,
              receiversAddress: tokenTransfer?.tokenTo,
              amount: tokenTransfer?.amount,
              privateKey: import.meta.env.VITE_PRIVATE_KEY,
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
          }
        }
      };

    console.log(show);
    return (
        <MainLayout>
            <NavBar title={"send"} backArrow={<MdArrowBack size={18} className='text-white' />} />
            <GlobalStyling />
            <S.ScrollBar className="w-full h-[450px] overflow-y-scroll">
                <div className=' w-full min-h-[50px] mt-4  flex-col justify-center items-center space-y-3 pb-5'>
                    <div className="w-full h-fit flex justify-start items-center">
                        <div className="w-full flex flex-row justify-center items-center space-x-3 px-2">
                            <button  className="flex gap-2 items-center justify-center text-[12px] font-bold text-[#fff] h-[45px] w-[120px] bg-[#212121] rounded-[10px]">
                                <MdSupervisedUserCircle size={20} className='rotate-180' />
                                CONTRACT
                            </button>
                            <button className="flex gap-2 items-center justify-center text-[12px] font-bold text-[#fff] h-[45px] w-[120px] bg-[#212121] rounded-[10px]">
                                <MdAccountBalanceWallet size={20} className='rotate-180' />
                                MY WALLET
                            </button>
                        </div>
                    </div>

                    <div className='w-full pt-3 text-xs uppercase text-white tracking-wider px-4 font-semibold'>Recipient</div>
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-[90%] flex bg-[#171717] rounded-lg overflow-hidden'>
                            <input type="text" placeholder='Enter Recipient Address' className='h-[45px] w-full text-white focus:outline-0 px-3 bg-transparent border-[#131313] rounded-lg'
                             onChange={(e) => {setTokenTransfer((pastInput) => ({
                                ...pastInput,
                                tokenTo: e.target.value,
                            }));console.log(tokenTransfer)}}
                            />
                            <div className="px-4 flex items-center justify-center bg-[#121312] cursor-pointer text-white">
                                <MdContentPaste />
                            </div>
                        </div>
                    </div>

                    <div className='w-full text-xs uppercase text-white  tracking-wider px-4 font-semibold'>Amount to send</div>
                    <div className='w-full flex justify-center'>
                        <input type="text" placeholder='Enter Amount' className='h-[45px] w-[90%] border-[1px] text-white focus:outline-0 px-3 bg-[#121312] border-[#131313] rounded-lg'
                             onChange={(e) =>
                                setTokenTransfer((pastInput) => ({
                                  ...pastInput,
                                  amount: e.target.value,
                                }))
                              }
                        />
                    </div>

                </div>

                <div className='p-4 w-full min-h-[50px] border-[3px] border-dashed border-[#442f00] flex-col bg-[#121312] rounded-lg justify-center items-center space-y-1'>
                    <div className='w-full pt-1 text-sm px-2 font-semibold flex flex-row justify-center items-center space-x-2'>
                        <div className="capitalize font-light  text-sm text-white">TRS FEES</div>
                        <div className='font-bold text-md  flex flex-row justify-center items-center text-white'>0.000300 HBAR <span className='text-xs px-1 text-white'>{"(~$0.0001)"}</span> <span className=''>
                            {/* <MdOutlineArrowDropDown size={20} color='ffffff' /> */}
                        </span>
                        </div>
                    </div>
                </div>
                <div className='w-full h-fit flex justify-center items-center py-2'>
                    <div onClick={() => setShow(!show)} className='rounded-md bg-[#0ce991] w-full py-3 flex justify-center items-center text-md font-bold cursor-pointer text-white'>
                        REVIEW TRANSFER
                    </div>
                </div>

            </S.ScrollBar>
            <BottomSheet skipInitialTransition open={show} snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.7]} className='--rsbs-bg-transparent' >
                <GlobalStyling />
                <div className='w-full h-full bg-black px-2 rounded-2xl'>
                    <div className='h-14 border-b border-b-slate-200 w-full flex items-center '>
                        <div onClick={() => setShow(false)} className='w-8 p-2 h-8 ml-1 mr-14 flex justify-center items-center border border-slate-300/50 rounded-full '><MdClose size={20} className='text-white cursor-pointer' /></div>
                        <div className='w-8/12 text-lg tracking-wider font-bold text-white'>Transaction Fee</div>
                    </div>
                    <S.ScrollBar className='h-[400px] w-full overflow-y-scroll' >
                        <div className='min-h-[200px] w-full  px-3 '>
                            <div className="w-full h-fit">
                                <div className='w-full h-fit text-white text-lg font-bold tracking-wide py-2 px-1'>About Transaction Fee</div>
                                <div className='h-fit w-full text-left text-md text-white/80 font-base'>
                                    Transaction fee is charged by the network. Leap Wallet is free to use. Higher the transaction fee, faster the transaction will go through.
                                </div>
                                <div className='space-x-1 p-1 my-5 h-16 w-full flex flex-row justify-between items-center'>
                                    <div className='flex-col w-full h-full justify-center items-center rounded-xl bg-[#191919] p-1'>
                                        <p className='w-full h-fit flex justify-center items-center font-bold text-[16px] text-white'>
                                            Low
                                        </p>
                                        <p className='w-full h-fit flex justify-center items-center font-semibold text-[10px] text-[#ccc]'>
                                            0.0000150 HBAR
                                        </p>
                                    </div>
                                    <div className='flex-col w-full h-full justify-center items-center bg-[#191919]/90 rounded-xl p-1'>
                                        <p className='w-full h-fit flex justify-center items-center font-bold text-[16px] text-white'>
                                            Medium
                                        </p>
                                        <p className='w-full h-fit flex justify-center items-center font-semibold text-[10px] text-[#ccc]'>
                                            0.001150 HBAR
                                        </p>
                                    </div>
                                    <div className='flex-col w-full h-full justify-center items-center rounded-xl bg-[#191919] p-1'>
                                        <p className='w-full h-fit flex justify-center items-center font-bold text-[16px] text-white'>High</p>
                                        <p className='w-full h-fit flex justify-center items-center font-semibold text-[10px] text-[#ccc]'>0.002150 HBAR</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-12 flex justify-end items-center">
                                <div className="w-fit h-12 text-sm tracking-wider text-white cursor-pointer font-semibold flex flex-row justify-center items-center space-x-2" onClick={() => setShowMore(!showMore)}>
                                    <span className='w-fit h-fit text-white'>Show additional settings</span>
                                    {showMore ?
                                        <span className="w-fit h-fit">
                                            <MdRemoveCircle size={17} className='text-[#15e18c] pt-1' />
                                        </span>
                                        :
                                        <span className="w-fit h-fit">
                                            <MdAddCircle size={17} className='text-[#15e18c] pt-1' />
                                        </span>
                                    }
                                </div>
                            </div>
                            {
                                showMore &&
                                (
                                    <div className='w-full min-h-[100px] backdrop-blur-lg bg-black/60 rounded-lg my-3 px-2 py-4'>
                                        <div className='w-full h-fit text-sm font-semibold text-white p-2'>You are paying fees transaction fees in</div>
                                        <div className="w-full h-fit flex justify-between items-center text-md">
                                            <div className="space-x-2 w-fit h-fit flex justify-center items-center flex-row border border-slate-100 py-2 px-4 rounded-full">
                                                <div className='w-fit h-fit'><img src='../hederaImage.png' className='h-5 w-5' /></div>
                                                <div className="w-fit h-fit font-bold text-md text-white">HBAR</div>
                                            </div>

                                            <div className='w-fit h-fit flex justify-center items-center flex-row space-x-2 tracking-wide'>
                                                <div className='text-md font-bold text-white'>Balance:</div>
                                                <div className='text-md font-bold text-white'>0.233 HBAR</div>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className='w-full my-3 flex justify-start items-center space-x-1 pt-6'>
                                                <div className="w-fit h-fit text-sm font-semibold text-white py-2">Gas Limit </div>
                                                <span className='w-fit h-fit' id="my-tooltip" >
                                                    <MdInfo size={18} className='text-black' />
                                                </span>
                                            </div>
                                            <Tooltip anchorSelect="#my-tooltip" content="Gas you are willing to spend on this transaction" className='w-[100px] h-fit text-center' />
                                            <div className='h-[40px] w-full border border-[#191919] rounded-md flex items-center justify-between'>
                                                <input className='outline-none w-10/12 h-full bg-transparent px-2 text-white font-semibold tracking-wider' type='' placeholder={"0.234"} />
                                                <div className="bg-[#2a2a2a] text-white w-[40px] h-full flex justify-center items-center">Reset</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div onClick={makeTransfer} className="container w-full h-fit my-4">
                                <button className="w-full h-10 rounded-md bg-[#04e294]/90 text-[16px] text-white font-semibold outline-none ">Proceed</button>
                            </div>
                        </div>
                    </S.ScrollBar>
                </div>
            </BottomSheet>
        </MainLayout>
    );
}

export default SendHaderaToken