import React , {useEffect , useState} from 'react'
import MainLayout from '../layout/MainLayout'
import axios from 'axios';
import useLocalStorage from "use-local-storage";
import {toast } from "react-toastify";

function ListingNft() {
  const [allListing , setAllListing] = useState([]);

  const [saveUsersDetails, setSavedUsersDetails] = useLocalStorage(
    "usersDetails");


  useEffect(()=>{
   (async()=>{     
    const response_id =  await axios.get(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}`)


 const response =  await axios.get(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}getallListings`)
setAllListing(response.data.results);
console.log(response.data.results)
   })()
  },[])
    
const swapping = async ()=>{ //swapp clean function
  // getSalesbyid
  try{
    console.log("clicked")
        const data = {
          usersId:saveUsersDetails?.valueData.id , 
          receiverAccount:saveUsersDetails?.valueData.accountID,
          receiversAddressKey:saveUsersDetails?.valueData.privateKey,
        }
       const swap_response  = await axios.post(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}swapNftWithToken`, data).the(resp=>resp.data);
     if(swap_response.status == 200){
      toast("nft swap successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
     }else{
      toast("nft swap failed with Error", {
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
    

  }catch(error){
    
  }
   



}



  return (
    <MainLayout >
         <div className="w-full flex justify-center flex-col space-y-4 lg:grid lg:grid-cols-2 items-center  my-2">
         <div className="w-full text-center text-xl font-bold h-8 text-black/50">Listed NFT</div>
          {allListing.map((items,index)=>{
             return(
              <div key={Math.random()} className=" w-11/12 h-fit flex justify-center items-center">
                <div className="w-fit h-fit relative flex justify-center items-center">
                  <img src={items?.nftImage}  className="h-[360px] w-11/12"/>
                  <div className="bottom-0 mx-auto   flex flex-col justify-center items-center absolute w-full min-h-[120px]">
                    <div className="flex flex-col justify-center items-center backdrope-white-20 bg-white/60 min-h-[70px] rounded-md w-10/12">
                        <div className="w-fit">Owner : <span className="text-md font-semibold">{items.usersId}</span></div>
                        <div className="w-fit">Asking Price : <span className="text-md font-semibold">{items.requestAmount}HBar</span></div>
                        {(items.status == 1)?
                         <div className="w-fit">Status: <span className="w-24 h-8 bg-red-500 flex justify-center items-center text-sm text-white">Sold</span></div>
                          :
                         <div className="w-fit flex flex-row justify-center items-center">Status: <span className="w-24 h-8 mx-2 bg-orange-500/20 rounded-lg flex justify-center items-center text-sm text-white">Not Sold</span></div>
                          
                        }
                      <button type="button" className="w-11/12 outline-none border
                       border-orange-300 bg-orange-400 text-md text-white font-bold my-1
                       rounded-lg
                      "
                      onClick={()=>swapping()}
                      >swap</button>
                   </div>   
                  </div>
                  </div>

                </div>
             )

          })

          }

         </div>
    </MainLayout>
  )
}

export default ListingNft