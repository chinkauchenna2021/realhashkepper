import React ,{useEffect , useState} from 'react'
import MainLayout from '../layout/MainLayout'
import useLocalStorage from "use-local-storage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleNft() {
    const [saveSingleNft , setSaveSingleNft] = useLocalStorage('singleNft')
    const [localdbNft , setLocaldbNft] = useState({})
    const [requestAmount , setRequestAmount]=useState({amount:0})
    const navigate = useNavigate()
useEffect(()=>{
setLocaldbNft(saveSingleNft);
},[])

const transferPage =()=>{
navigate('/transfer')
}

console.log(requestAmount)
const listingPage = async()=>{

 if(requestAmount?.amount == null || requestAmount?.amount == 0)return alert("Amount for NFT must be specified");
 const data = {
    usersId:localdbNft?.owner,
    senderAccount:localdbNft?.owner,
    nftToken:localdbNft?.token_ids,
    userTokenId:localdbNft?.edition,
    senderAccountKey:saveSingleNft?.valueData.privateKey,
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
      alert("Nft already listed");

  }
  }catch(err){
    console.log("this the error",err)
  }
}




  return (
    <MainLayout>
      <div className='container w-full border border-orange-400 min-h-[200px] my-4'>
    {(Object.keys(localdbNft) != null)?
    ( <div className='w-full h-full'> <img src={localdbNft.image} className="w-full h-[300px]" />
    <div className='pb-5 px-2 w-full h-fit flex flex-col justify-center items-center space-y-3'>
      <div className='text-xl'>Owner : <span className='font-semibold text-sm'>{localdbNft.owner}</span></div>
      <div className='text-xl'>Name : <span className='font-semibold text-sm'>{localdbNft.name}</span></div>
      <div className='text-xl'>Creator : <span className='font-semibold text-sm'>{localdbNft.creator}</span></div>
      <div className='text-xl'>Token ID : <span className='font-semibold text-sm'>{localdbNft.token_ids}</span></div>
      <div className='text-xl'>Description : <span className='font-semibold text-sm'>{localdbNft.description}</span></div>
      <div className='text-xl'>Type : <span className='font-semibold text-sm'>{localdbNft.type}</span></div>
       <button onClick={()=>transferPage()} type="button" className="flex rounded-md items-center justify-center w-full outline-none h-8 bg-orange-400 text-white text-sm font-semibold"  >Send</button>
       <div className='w-full h-fit flex flex-col '>
        <label className="w-full">Enter Amount</label>
        <input type="number" value={requestAmount.amount} onChange={(e)=>setRequestAmount((previousData)=>({...previousData , amount:e.target.value}))}  className="w-full h-8 outline-none border border-orange-300 rounded-md"/>
      </div>
       <button onClick={()=>listingPage()} type='button' className=" flex rounded-md items-center justify-center w-full mb-2 outline-none h-8 bg-orange-400 text-white text-sm font-semibold" >List for sale</button>
        </div>
    
     </div>)
    :
    "No Available NFT"
    }

      </div>


    </MainLayout>
  )
}

export default SingleNft