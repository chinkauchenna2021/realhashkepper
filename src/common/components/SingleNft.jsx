/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { MdClose } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useLocalStorage from "use-local-storage";
import * as S from '../pages/style/Styles'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";







function SingleNft({setShow, show, showListInput, setShowListInput }) {
    const [value, setValue] = useLocalStorage('singleNft', null);
    const [localdbNft , setLocaldbNft] = useState({})
    const [requestAmount , setRequestAmount]=useState({amount:0})
    console.log(setShowListInput );

    const listingPage = async()=>{

        if(requestAmount?.amount == null || requestAmount?.amount == 0)return toast("Amount for NFT must be specified", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        const data = {
           usersId:localdbNft?.owner,
           senderAccount:localdbNft?.owner,
           nftToken:localdbNft?.token_ids,
           userTokenId:localdbNft?.edition,
           senderAccountKey:localdbNft?.owner,
           requestAmount:requestAmount?.amount,
           receiverAccount:"",
           status:0,
           nftImage:localdbNft?.image    
         }
         try{
           const response = await axios.post(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}listing`,data).then(res=>res.data);
           if(response.status == 200){
             navigate('/listings');
         
           }else{
            toast("Nft already listed", {
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
         }catch(err){
           console.log("this the error",err)
         }
       }
  const navigate = useNavigate();

    return (

    <div className='bg-[#000000] rounded-2xl'>
            <div className='h-14 border-b border-b-slate-200 py-[1px] w-full flex items-center relative'>
                <div onClick={() => setShow(false)} className='absolute left-[15px] translate-y-[-50%] top-[50%] w-[30px] h-[30px] flex justify-center items-center border cursor-pointer border-slate-300/50 rounded-full '>
                    <MdClose size={20} className='text-white' />
                </div>
                <div className='flex-1 flex items-center justify-center text-center text-lg tracking-wider font-bold text-white'>INFO</div>
            </div>
            <S.ScrollBar className='w-full h-[500px] overflow-y-scroll p-1'>

                <div className='w-full flex item-center justify-center py-7'>
                    <div className='flex flex-col items-center px-2'>

                        <div id='NFT IMAGE' className='h-[200px] w-[200px] mx-auto mb-[20px] rounded-[25px] bg-gradient-to-br from-[#000000] to-[#000000]'>
                            <div className='h-full w-full relative flex items-center mx-auto justify-center'>
                                <img src={value.image} className='object-cover h-full w-full rounded-[20px]' alt="" />
                            </div>
                        </div>
                        <div id='MAIN CONTAINER' className='flex flex-col h-fit hover:bg-[#00ff9513] bg-[#161616] w-[95%] rounded-xl pt-3'>

                            <div className='w-full h-fit flex flex-col gap-2 items-center justify-center'>
                                <p className='flex px-3 font-bold text-xs text-[#ffffff] justify-between items-center w-full'>NAME :
                                    <span className='ml-3 text-[#d4d4d4] font-thin'>
                                        {value.name}
                                    </span>
                                </p>
                                <p className='flex px-3 font-bold text-xs text-[#ffffff] justify-between items-center w-full'>TOKEN ID :
                                    <span className='ml-3 text-[#d4d4d4] font-thin'>
                                        {value.token_ids}
                                    </span>
                                </p>
                                <p className='flex px-3 font-bold text-xs text-[#ffffff] justify-between items-center w-full'>CREATOR :
                                    <span className='ml-3 text-[#d4d4d4] font-thin'>
                                        {value.creator}
                                    </span>
                                </p>
                                <p className='w-full bg-[#000000] h-7 rounded-b-[10px] flex items-center'>
                                    <p className='flex px-3 text-xs font-bold text-[#ffffff] justify-between items-center w-full'>OWNER
                                        <span className='ml-3 text-[#9c9c9c] font-thin truncate tracking-[0.5px]'>
                                            {value.owner}
                                        </span>
                                    </p>
                                </p>
                            </div>
                        </div>

                        <div id="DESCRIPTION" className='w-[95%] my-3 h-fit p-2 bg-[#171717] border-[1px] border-[#181717] text-white rounded-lg'>
                            <p className='text-[11px] font-thin'>{value.description}</p>
                        </div>

                        <div id='BUTTONS' className='h-fit w-[95%] flex-col gap-2 text-white'>
                            <div className='w-full flex flex-col gap-[4px] py-1'>
                                {showListInput && <input type="text" placeholder='Enter Amount' className='h-[45px] w-full border-[1px] text-white focus:outline-0 px-3 bg-transparent border-[#131313] rounded-lg'
                                    onChange={(e)=>setRequestAmount((previousData)=>({...previousData , amount:e.target.value}))}
                                />}
                                {showListInput ?
                                    <>
                                        <button onClick={listingPage} className='h-[45px] w-full font-extrabold bg-[#00ff95] text-black rounded-lg text-sm'>
                                            PROCEED TO LIST
                                        </button>
                                        <button onClick={() => setShowListInput(!showListInput)} className='h-[45px] w-full font-extrabold bg-[#ff0000] text-white rounded-lg text-sm'>
                                            CANCEL
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button onClick={() => {setShowListInput(true); console.log("object");}} className='h-[45px] w-full font-extrabold bg-[#00ff95] text-black rounded-lg text-sm'>
                                            LIST
                                        </button>
                                    </>
                                }
                            </div>
                            <div className='w-full flex flex-col gap-[4px]'>
                                {!showListInput &&
                                    <button onClick={() => navigate('/nftswap')} className='h-[45px] w-full font-extrabold bg-[#fcbe04] text-black rounded-lg flex items-center justify-center text-sm'>
                                        TRANSFER
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </S.ScrollBar>
    </div>

  )
}

export default SingleNft