/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MainLayout from '../layout/MainLayout';
import * as S from './style/Styles'
import NavBar from '../layout/NavBar';
import Nothing from './Nothing';
import { MdArrowBack, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import useLocalStorage from "use-local-storage";
import axios from 'axios'



function NftSwap() {
    const [transferId , setTransferId] = useState({receiversid:"" , enterPrivateKey:""})
    // const [sendersAccount , setSendersAccount] = useState({receiversid:"" , enterPrivateKey:""})
    // const [swapFrom, setSwapFrom] = useState('');
    const [value, setValue] = useLocalStorage('singleNft', null);
    const [saveSingleNft , setSaveSingleNft] = useLocalStorage('singleNft');
    const [saveUsersDetails, setSavedUsersDetails] = useLocalStorage(
        "usersDetails"
      );

    const [swapTo, setSwapTo] = useState('400');
    console.log(value);


    const sendNft = async ()=>{
        const slitevalue = transferId?.receiversid?.split('.')[1]
        if(slitevalue !== '0'){
            alert("wrong inpute");
        }else{
    if(transferId?.enterPrivateKey !== undefined && saveUsersDetails?.valueData.privateKey !== undefined
       &&  saveUsersDetails?.valueData.accountID !== undefined
       ){
    const send_data ={
        senderId:saveUsersDetails?.valueData.accountID,
        senderNFTId:import.meta.env.VITE_MY_NFT_MINTING_ID,
        receiverId:transferId?.receiversid,
        token_serial_number:saveSingleNft.edition,
        sendersPrivateKey:saveUsersDetails?.valueData.privateKey,
        receiverKeys:transferId?.enterPrivateKey
    }
    const sent_response = await axios.post(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}transferNft`, send_data).then(res=>res.data);
      if(sent_response.status == 200){
          console.log(sent_response.data);
      } 
        }
        }
        }

    return (
        <MainLayout>
            <NavBar title="Send NFT" to={"/NFTs"} backArrow={<MdArrowBack size={18} className='text-white' />} />
            <S.ScrollBar className='w-full h-[450px] overflow-y-scroll '>
                <div className='h-fit w-full flex flex-col gap-2 items-center justify-center py-4 '>
                    <div className='w-full h-fit flex items-center justify-center'>
                        <div id='nft-holder' className='relative h-[170px] w-[170px] mb-8'>
                            <div className='flex items-center justify-center absolute left-[50%] translate-x-[-50%] bottom-[-15px] h-[27px] w-[100px] rounded-xl bg-white text-center text-xs font-bold'>
                                {"0.0.234545"}
                            </div>
                            <img src={value?.image} className='h-full w-full object-cover rounded-[28px]' alt="" />
                        </div>
                    </div>

                    <div className='flex w-[90%]  h-fit justify-center text-white'>
                        <div className='flex flex-col w-full p-3 bg-[rgb(18,18,19)] rounded-2xl'>
                            <div className='w-full mx-auto flex '>
                                <div className='w-1/2 h-12'>
                                    <p className='text-xs'>{value?.name}</p>
                                    <h4 className='font-bold'>{value?.creator }</h4>
                                </div>
                                <div className='w-1/2 h-12 flex justify-end'>
                                    <div className='h-10 w-10 rounded-xl overflow-hidden translate-x-3 shadow-[0px_0px_0px_4px_rgb(18,18,19)]'>
                                        <img src="../nfmages/boredApe.png" className='object-cover' alt="" />
                                    </div>
                                    <div className='h-10 w-10 rounded-xl overflow-hidden'>
                                        <img src="../nfmages/boredApe.png" className='object-cover' alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className='w-full mx-auto flex'>
                                <div className='w-1/2 h-9 flex items-center'>Token ID</div>
                                <div className='w-1/2 h-9 flex items-center justify-end font-bold'>{value?.token_ids}</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full justify-center  h-[45px]'>
                        <input type="text"  placeholder='Enter Senders Account' onChange={(e)=>setTransferId((previousData)=>({...previousData ,receiversid:e.target.value }))}  name='privatekeys' className='h-full w-[200px] bg-[#161616] text-white rounded-l-[9px] focus:outline-none px-3 appearance-none' />
                        <div className='h-[70%] my-auto bg-[#00cb6c] w-[1px]'></div>
                        <select name="" id="" className='h-full text-sm w-[80px] rounded-r-[9px] bg-[#161616] text-white text-center appearance-none px-3 focus:outline-none'>
                            <option value="HEDERA">HEDERA</option> 
                        </select>
                    </div>

                    <div className='flex w-full justify-center  h-[45px] '>
                        <input type="text" placeholder='Enter receivers Privatekeys' onChange={(e)=>{console.log(e.target.value) ;setTransferId((previousData)=>({...previousData ,enterPrivateKey:e.target.value }))}} name='amount' className='h-full w-[80%] bg-[#161616] text-white rounded-[9px] focus:outline-none px-3 appearance-none' />
                    </div>

                    <div className="flex flex-col gap-2 text-white relative w-[90%] py-2">
                        <div id='gap' className='absolute w-[40px] h-full top-0 left-[20px]'>
                            <div className='h-full w-[1px] bg-[#00cb6c]'></div>
                        </div>

                        <div className='flex items-center pl-[14px] text-[13px]'>
                            <div id='ball' className='h-[12px] w-[12px] rounded-full bg-[#00cb6c]'></div>
                            <span className='pl-2'>0.0</span>
                            <span className='pl-3 text-[10px]'>GAS FEES</span>
                        </div>

                        <div className='flex items-center pl-[14px] text-[13px]'>
                            <div id='ball' className='h-[12px] w-[12px] rounded-full bg-[#00cb6c]'></div>
                            <span className='pl-2'>1 USDT - 0.00000 BTC</span>
                            <span className='pl-3 text-[10px]'>RATE</span>
                        </div>
                    </div>

                    <div className='flex w-full justify-center h-[45px] '>
                        <button onClick={sendNft} className='h-[40px] w-[90%] font-bold transition-[.2s] hover:scale-[0.95] rounded-lg bg-[#05f479] text-black'>
                            TRANSFER NFT
                        </button>
                    </div>
                </div>

            </S.ScrollBar>
        </MainLayout>
    )
}

export default NftSwap