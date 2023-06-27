/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import MainLayout from '../layout/MainLayout'
import * as S from './style/Styles'
// import Footer from './Footer'
import { GlobalStyling } from '../globalStyles/Global'
// import { MdCopyAll , MdRemoveRedEye , MdFileUpload ,MdDownload } from "react-icons/md";
import NavBar from '../layout/NavBar';
import { useNavigate } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet'
import {motion} from "framer-motion"
import useLocalStorage from "use-local-storage";
import { MdArrowBack } from "react-icons/md";
import axios from 'axios';
import SingleNft from '../components/SingleNft';
import Nothing from '../components/Nothing';
import { ToastContainer, toast } from "react-toastify";
import Loading from '../components/Loading';


const yourNfts = [
  {}, {}, {}
]

function Nfts() {
    const[show, setShow]=useState(false)
    const[showInput, setShowInput]=useState(false)
    const[link, setLink]=useState("all")
    const[loading, setLoading]=useState(false)
    const [nftIds, setNftsIds] = useState({ nftid: "" });
    const [items , setItems] = useState();
    const [showListInput, setShowListInput] = useState(false);
    const[data, setData]=useState("all")
    const [get_availableNfts, setGetAvailableNfts] = useState([]);
    const [oneNft, setOneNft] = useLocalStorage("singleNft", null);
    const [saveUsersDetails, setSavedUsersDetails] = useLocalStorage(
      "usersDetails",
      { valueData: {}, isLoggedin: false }
    );


    console.log("saveUsersDetails?.valueData.id");  
    console.log(saveUsersDetails?.valueData.id);  

    // all nfts
    useEffect(() => {
      (async () => {
        const users_id = saveUsersDetails?.valueData.id;
        if (users_id == "") return alert("no id provided");
        try{
          const usersIds = {
            usersid: users_id,
          };
          const get_UsersNft = await axios.post(
            `${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}getNft`,
            usersIds
          );
          console.log("get_UsersNft");
          console.log(get_UsersNft);
          let available_nft = [];
          for (let i = 0; i < get_UsersNft.data.data.length; i++) {
            const users_nft_info = await axios
              .get(
                `${import.meta.env.VITE_HEDERA_BASE_URL_TESTNET}api/v1/tokens/${
                  get_UsersNft.data.data[i].nftid
                }/nfts`
              )
              .then((res) => res.data);
             
              if (users_nft_info?.nfts.length !== 0) {
                
                // for (let j = 0; j < users_nft_info.nfts.length; j++) {
                  users_nft_info.nfts.forEach(async(items,index)=>{
                    if (
                      items.account_id ==
                      saveUsersDetails.valueData.accountID  
                      ) {
                      console.log(items)
                  console.log("available nft values", items)
                  const metadata = Buffer.from(
                    items.metadata,
                    "base64"
                  ).toLocaleString();
                  const fulldata = metadata.split("//")[1];
                  const response = await axios.get(
                    `${import.meta.env.VITE_CLOUD_FLARE}${fulldata}`
                  );
    
                  const fulldata_img = response.data.image.split("//")[1];
    
                  let data = {
                    owner: items.account_id,
                    token_ids:items.token_id,
                    image: import.meta.env.VITE_CLOUD_FLARE + fulldata_img,
                    name: response.data.name,
                    description: response.data.description,
                    creator: response.data.creator,
                    type: response.data.type,
                    edition: response.data.edition,
                  };
    
                  available_nft.push(data);
                    }
                setGetAvailableNfts([...available_nft]);
                setLoading(false)
              })
            }
          }
        }catch(err){
          console.log("error ",err) 
          setLoading(false)           
        }finally{
          setLoading(false)
          console.log("object");
        }

    
  
      })();
    }, []);
    console.log("get_availableNfts");
    console.log(get_availableNfts);

   
    // all usersnfts
    const getAllUsersNFTs = async () => {
      const users_id = saveUsersDetails?.valueData.id;
      const saveNfts = {
        usersId: users_id,
        usersNftId: nftIds.nftid,
      };
      if (nftIds.nftid == "") return toast(
        'Input can not be empty',
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
      const split_NFT_id = nftIds.nftid.split(".");
      if (split_NFT_id[1] !== "0") return toast("wrong input", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const user_saveNft = await axios.post(
        `${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}saveNft`,
        saveNfts
      );
      console.log(user_saveNft.status)
  if(user_saveNft.status == 200){
    toast("checking for availbility", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
     window.location.reload();
  }
    };
    const navigate = useNavigate();
  return (
    <MainLayout>
    <NavBar title="NFTs" backArrow={<MdArrowBack size={18} className='text-white' />} />
    <GlobalStyling />
    {data?.length >= 1 &&
        <div className="w-full h-fit py-2 flex items-center justify-around">
            <div onClick={() => { setLink("all") }} className={`uppercase text-xs font-thin tracking-wider pt-7 cursor-pointer`}> <p className={`${link === "all" ? "font-extrabold text-[#16ffd8]" : "text-white"}`}>NFTs</p> </div>
            <div onClick={() => { setLink("yours") }} className={`uppercase text-xs font-thin tracking-wider pt-7  cursor-pointer`}><p className={`${link === "yours" ? "font-extrabold text-[#16ffd8]" : "text-white"}`}>Yours</p></div>
            <div onClick={() => { setLink("create") }} className={`uppercase text-xs font-thin tracking-wider pt-7  cursor-pointer`}> <p className={`${link === "create" ? "font-extrabold text-[#16ffd8]" : "text-white"}`}>Create</p></div>
        </div>
    }

    {/* distribution panel */}
    <S.ScrollBar className='w-full h-[450px] overflow-y-scroll p-1'>
        {/* THIS IS FOR ALL NFTS */}

        {link === "all" &&
          <div className="">
           {!loading ? <motion.div onClick={() => setShow(true)} className="cursor-pointer" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "100%" }} exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 1 } }}>
                {get_availableNfts.length >= 1 ?
                    <div className='w-full flex flex-col'>
                        <div className='grid grid-cols-2 gap-[10px] self-center'>
                            {get_availableNfts.map((el, key) =>
                                <div key={key} onClick={() => {setShow(true); setOneNft(el)}} className='w-[140px] rounded-[25px] bg-gradient-to-br from-[#15dfee00] to-[#f0028500]'>
                                    <div className='h-fit w-full rounded-[25px] bg-[#121213] overflow-hidden'>
                                        <div className='h-fit w-[90%] mt-[7px] relative flex items-center mx-auto justify-center'>
                                            <img src={el.image} className='object-cover h-full w-full rounded-[20px]' alt="" />
                                        </div>
                                        <div className='h-16 flex flex-col items-center justify-center'>
                                            <p className='text-white font-bold'>{el.name}</p>
                                            <div className='w-[70px] h-[5px] rounded-lg bg-[#2d2e2e]'></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <Nothing msg1={"No Nfts yet"} msg2={"Add NFT"} />}
            </motion.div>:
            <div className="pt-10">
              <Loading />
            </div> }
          </div>
        }

        {/* THIS IS FOR YOUR NFTS */}
        {link === "yours" &&
            <motion.div onClick={() => setShow(true)} className="cursor-pointer" initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "100%" }} exit={{ opacity: 0, x: window.innerWidth, transition: { duration: 1 } }}>
                {yourNfts.length >= 1 ?
                    <div className='w-full flex flex-col'>
                        <div className='grid grid-cols-2 gap-[5px] self-center'>
                            {yourNfts.map((el, key) =>
                                <div key={key} onClick={() => setShow(!show)} className='w-[140px] rounded-[25px] bg-gradient-to-br from-[#15dfee00] to-[#f0028500]'>
                                    <div className='h-fit w-full rounded-[25px] bg-[#121213] overflow-hidden'>
                                        <div className='h-fit w-[90%] mt-[7px] relative flex items-center mx-auto justify-center'>
                                            <img src={el.image} className='object-cover h-full w-full rounded-[20px]' alt="" />
                                            <div className='flex items-center justify-center absolute h-[30px] bottom-[-15px] w-[80px] bg-[#1b1b1b31] backdrop-blur-[10px] rounded-[9px]'>
                                                <p className='flex text-white font-bold'>40.5 <p className='ml-[3px] text-[10px] text-[#25fdef]'> ETH</p></p>
                                            </div>
                                        </div>
                                        <div className='h-16 flex flex-col items-center justify-center'>
                                            <p className='text-white font-bold'>{el.name}</p>
                                            <div className='w-[70px] h-[5px] rounded-lg bg-[#2d2e2e]'></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <Nothing msg1={"No Nfts yet"} msg2={"Add NFT"} />}
            </motion.div>
        }

    </S.ScrollBar>
    <BottomSheet skipInitialTransition open={show} snapPoints={({ minHeight, maxHeight }) => [minHeight, maxHeight / 0.7]} className='--rsbs-bg-transparent' >
    <SingleNft items={items} setShow={setShow} setShowListInput={setShowListInput} showListInput={showListInput}  showInput={showInput} />

    </BottomSheet>            
    </MainLayout>
  )
}

export default Nfts

