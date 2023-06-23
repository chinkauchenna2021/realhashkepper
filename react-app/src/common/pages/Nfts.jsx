import React, { useEffect, useState, useMemo } from "react";
import MainLayout from "../layout/MainLayout";
import axios from "axios";
import useLocalStorage from "use-local-storage";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

function Nfts() {
  const navigate = useNavigate();
  const [get_availableNfts, setGetAvailableNfts] = useState([]);
  const [saveSingleNft , setSaveSingleNft] = useLocalStorage('singleNft' , {})
  const [saveUsersDetails, setSavedUsersDetails] = useLocalStorage(
    "usersDetails",
    { valueData: {}, isLoggedin: false }
  );

  const [nftIds, setNftsIds] = useState({ nftid: "" });
  useEffect(() => {
    (async () => {
      const users_id = saveUsersDetails?.valueData.id;
      if (users_id == "") return alert("no id provided");
      const usersIds = {
        usersid: users_id,
      };
      const get_UsersNft = await axios.post(
        `${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}getNft`,
        usersIds
      );
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
          })
        }
      }
      
    })();
  }, []);

  const getAllUsersNFTs = async () => {
    const users_id = saveUsersDetails?.valueData.id;
    const saveNfts = {
      usersId: users_id,
      usersNftId: nftIds.nftid,
    };
    if (nftIds.nftid == "") return alert("input can not be empty");
    const split_NFT_id = nftIds.nftid.split(".");
    if (split_NFT_id[1] !== "0") return alert("wrong input");
    const user_saveNft = await axios.post(
      `${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}saveNft`,
      saveNfts
    );
    console.log(user_saveNft.status);
    if (user_saveNft.status == 200) {
      alert("Checking for availability");
      window.location.reload();
    }
  };

  const viewNftPage = async (nft_items) => {
    await setSaveSingleNft(nft_items);
    navigate("/singlenft");
  };

  return (
    <MainLayout>
      <div className="container w-full space-y-4">
        <div className="flex-col container flex w-full justify-center items-center space-y-3">
          <div className="w-full">
            <input
              placeholder="Enter token id"
              className=" mt-2 outline-none w-full border border-orange-300 px-1 h-8"
              onChange={(e) =>
                setNftsIds((previousData) => ({
                  ...previousData,
                  nftid: e.target.value,
                }))
              }
            />
          </div>
          <button
            onClick={() => getAllUsersNFTs()}
            type="button"
            className="w-full outline-none bg-orange-300 text-white text-lg"
          >
            Submit
          </button>
        </div>
        <div className="w-full text-center text-xl font-bold">Account NFT</div>

        {get_availableNfts?.length !== 0 ? (
          <div className="container flex justify-center items-center flex-col w-full h-fit lg:grid lg:grid-cols-2 lg:space-x-3">
            {get_availableNfts?.map((items, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-center   my-3 items-center w-9/12 border border-orange-500 min-h-[300px]"
                >
                  <div className="container w-full h-full ">
                    <img src={items.image} className="h-[220px] w-full" />
                  </div>
                  <div className="flex h-6/12 w-full items-baseline justify-center flex-col space-y-3 ">
                    <div className="flex w-full justify-between items-center lg:flex-col px-2">
                      <div className="flex w-fit h-fit">Name: {items.name}</div>
                      <div className="flex flex-wrap">
                        Creator: #{items.creator}
                      </div>
                    </div>
                    <div className="flex w-full justify-between items-center px-2">
                      <span className="w-fit h-fit">
                        Description:{" "}
                        <span className="text-sm font-semibold">
                          {items.description}
                        </span>
                      </span>
                    </div>
                    <div className="flex w-full justify-between items-center lg:flex-col px-2">
                      <div className="flex w-fit h-fit">
                        Edition: {items.edition}
                      </div>
                      <div className="flex flex-wrap">Type: {items.type}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => viewNftPage(items)}
                    type="button"
                    className="my-3 w-11/12 h-12 cursor-pointer rounded-md outline-none bg-orange-500 text-white"
                  >
                    View NFT
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-[200px] flex justify-center items-center">
            <div className="w-fit h-fit text-black/80 text-xl tracking-wider">
              No Available NFT
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Nfts;
