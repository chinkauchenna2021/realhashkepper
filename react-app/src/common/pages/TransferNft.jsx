import React , {useState} from 'react'
import MainLayout from '../layout/MainLayout';
import useLocalStorage from "use-local-storage";
import axios from 'axios'

function TransferNft() {
    // {senderId , senderNFTId , receiverId , token_serial_number , sendersPrivateKey}
    const [getReceiversId , setGetRececieversId] = useState({receiversid:"" , enterPrivateKey:""})
    const [saveSingleNft , setSaveSingleNft] = useLocalStorage('singleNft');
    const [saveUsersDetails, setSavedUsersDetails] = useLocalStorage(
        "usersDetails"
      );

    const sendNft = async ()=>{
    const slitevalue = getReceiversId?.receiversid?.split('.')[1]
    if(slitevalue !== '0'){
        alert("wrong inpute");
    }else{
if(getReceiversId?.enterPrivateKey !== undefined && saveUsersDetails?.valueData.privateKey !== undefined
   &&  saveUsersDetails?.valueData.accountID !== undefined
   ){

const send_data ={
    senderId:import.meta.env.VITE_MY_ACCOUNT_ID,
    senderNFTId:import.meta.env.VITE_MY_NFT_MINTING_ID,
    receiverId:getReceiversId?.receiversid,
    token_serial_number:saveSingleNft?.edition,
    sendersPrivateKey:import.meta.env.VITE_PRIVATE_KEY,
    receiverKeys:getReceiversId?.enterPrivateKey
}
console.log(send_data)
const sent_response = await axios.post(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}transferNft`, send_data).then(res=>res.data);
  if(sent_response.status == 200){
      console.log(sent_response.data);
  } 
    }
    }
    }


  return (
    <MainLayout>
        <div className="w-full text-xl font-semibold tracking-wide text-center py-5">Transfer Nft</div>
        <div  className="w-11/12 lg:w-10/12 pr-2 py-5 flex justify-center items-center border border-orange-100 rounded-full h-[100px]" >
            <div className="w-[200px]">
                <img src={saveSingleNft?.image} className="w-24 rounded-full h-[100px]" />
            </div>
            <div className="w-full h-fit flex flex-col justify-center items-center space-y-3">
                 <div className="w-fit text-xs font-semibold flex">
                    Name: <span className="px-2 text-red-300">{saveSingleNft?.name}</span>
                </div>
                <div className="w-fit text-xs font-semibold flex">
                    Creator: <span className="px-2 text-red-300">{saveSingleNft?.creator}</span>
                </div>
                <div className="w-fit text-xs font-semibold flex">
                    Token ID: <span className="px-2 text-red-300">{saveSingleNft?.token_ids}</span>
                </div>

            </div>
            <div className="w-full p-2 flex flex-col justify-center items-center space-y-3">
                <input onChange={(e)=>setGetRececieversId((previousData)=>({...previousData ,receiversid:e.target.value }))} type="text" placeholder="Enter senders Account" className="rounded-sm text-sm px-2 w-[200px] h-8 outline-none border border-orange-200 " />
                <input onChange={(e)=>setGetRececieversId((previousData)=>({...previousData ,enterPrivateKey:e.target.value }))} type="text" placeholder="Receivers Private Key" className="rounded-sm text-sm px-2 w-[200px] h-8 outline-none border border-orange-200 " />
                <button onClick={()=>sendNft()} type="button" className=" outline-none h-6 w-[200px] bg-orange-300 rounded-lg text-sm text-white font-semibold">Transfer Nft</button>
            </div>

        </div>

    </MainLayout>
  )
}

export default TransferNft