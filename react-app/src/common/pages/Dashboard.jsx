/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../layout/MainLayout";
import useLocalStorage from "use-local-storage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {toast } from "react-toastify";
import {getHederaPrice } from '../../module/hook/useHooks'
import { Surface, CartesianGrid } from 'recharts';

function Dashboard() {
  const [getHPrice , setGetHPrice] = useState(0.052123);
  const refreashTime = 200000;
  const [saveUsersDetails, setSavedUsersDetails] = useLocalStorage(
    "usersDetails",
    { valueData: {}, isLoggedin: false }
  );
  const navigate = useNavigate();
  const [toggleTransfer, setToggleTransfer] = useState(false);
  const [tokenTransfer, setTokenTransfer] = useState({
    tokenTo: "",
    tokenFrom: "",
    amount: 0,
  });
  const fetchAccount = async () => {
    const data = { usersAccount: saveUsersDetails.valueData.accountID };
    return await axios
      .post(`${import.meta.env.VITE_REACT_APP_MAIN_ENDPOINT}userDetails`, data)
      .then((returnedData) => returnedData.data);
  };



  const {
    isLoading,
    isError,
    data: queryUsersAccount,
    error,
    refetch,
  } = useQuery({ queryKey: ["userAccounts"], queryFn: fetchAccount });

const coinGeckoResponse = useMemo(()=>{

  (async()=>{
  setInterval(async()=>{
    try{
      console.log('okay')
      let data = await getHederaPrice();
      setGetHPrice(data['hedera-hashgraph'].usd)
    console.log(data['hedera-hashgraph'].usd)

    }catch(err){
      console.log(err)
    }
  },refreashTime)
   //  const datas = await returnResponse(data);
  //  console.log(data)


  })()  

},[setGetHPrice])


  useEffect(() => {
    (async () => {
      




      if (
        Object.keys(saveUsersDetails.valueData).length == 0 &&
        saveUsersDetails.isLoggedin == false
      ) {
        navigate("/login");
      }
    })();
  }, [saveUsersDetails ]);
  const usersData = queryUsersAccount?.userAccountInfo;
  const usersID = saveUsersDetails?.valueData.accountID;
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
        saveUsersDetails?.valueData.accountID !== undefined &&
        saveUsersDetails?.valueData.privateKey !== undefined
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



useEffect(()=>{
   (async()=>{

     const res = await axios.get(import.meta.env.VITE_HISTORIC_API,{
       headers: {
         // 'Authorization': `Bearer ${token}` 
         'x-api-key':`${import.meta.env.VITE_ACCESS_KEY}`
       }
   })
  //  console.log(res.data.data)
  //  console.log(import.meta.env.VITE_HISTORIC_API)
   const datas = res.data.data.filter((items,index)=>{amount:items.amount})
    console.log(datas)
   })()



},[])

  return (
    <MainLayout className="">
      {isLoading ? (
        "loading..."
      ) : (
        <div className="flex justify-center flex-col w-full container items-center mt-10">
          <div className="text-xl font-bold">{`Users Account ${usersData.accountId}`}</div>
          <div className="border flex-col min-h-[50px] border-orange-300 justify-center  lg:justify-between space-x-4 items-center w-11/12   rounded-full flex  ">
           <div className="flex">
            <div className="text-xs w-fit text-center">
              {"Account Id:  "}{" "}
              <span className="font-semibold text-sm w-fit">
                {usersData.accountId}
              </span>
            </div>
            <div className="text-xs w-fit text-center pb-4 ">
              {"Balances: "}{" "}
              <span className="font-semibold text-sm w-fit">
                {usersData.balance}
              </span>
            </div>
            <div className="text-xs w-fit text-center capitalize pb-4 ">
              {"ledgerId: "}{" "}
              <span className="font-semibold text-sm w-fit">
                {usersData.ledgerId}
              </span>
            </div>
            </div>
               <div className="w-fit">
            <div className="w-full h-7 flex items-center text-xs">Current Price : <span className="text-red-600 mx-1 font-semibold">${getHPrice}</span></div>

               </div>
          </div>
          <div className="border min-h-[50px] border-orange-300 justify-between flex-col items-center w-11/12 lg:w-9/12  rounded-full my-3 flex px-3">
            <div className="text-sm w-fit capitalize">
              {"maxAutomaticTokenAssociations:  "}{" "}
              <span className="font-semibold text-lg">
                {usersData.maxAutomaticTokenAssociations}
              </span>
            </div>
            <div className="">
              {"ownedNfts: "}{" "}
              <span className="font-semibold text-xl">
                {usersData.ownedNfts}
              </span>
            </div>
          </div>
          {/* proxyAccountId: null */}
          <div className="w-full flex justify-end items-center mt-10">
            <button className="w-[120px] h-8 cursor-pointer outline-none text-sm text-white bg-orange-500">
              Enter Page
            </button>
          </div>
          <div className="mt-5 w-full text-center font-semibold text-xl">
            Account History
          </div>
          <div className="w-9/12 overflow-x-scroll  lg:w-full px-10 ">
            <table>
              <thead>
                <tr className="">
                  <th rowSpan={2} className="capitalize  px-5">
                    proxyAccountId
                  </th>
                  <th className="capitalize  px-5">proxyReceived</th>
                  <th className="capitalize  px-5">receiveRecordThreshold</th>
                  <th className="capitalize  px-5">sendRecordThreshold</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center w-full px-5">
                    {usersData.proxyAccountId == null
                      ? "null"
                      : usersData.proxyAccountId}
                  </td>
                  <td className="text-center w-full px-5">
                    {usersData.proxyReceived}
                  </td>
                  <td className="text-center w-full px-5">
                    {usersData.receiveRecordThreshold}
                  </td>
                  <td className="text-center w-full px-5">
                    {usersData.sendRecordThreshold}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="w-full">
        <button
          type="button"
          onClick={() => setToggleTransfer(!toggleTransfer)}
          className=" outline-none capitalize px-5 py-1 lg:w-3/12 my-5 rounded-full border border-orange-200"
        >
          toggle transfer
        </button>
      </div>
      {toggleTransfer && (
        <div className="w-full min-h-[20px] flex flex-col justify-center items-center">
          <div className="text-center w-full text-lg font-semibold h-8">
            Transfer Token
          </div>
          <input
            onChange={(e) =>
              setTokenTransfer((pastInput) => ({
                ...pastInput,
                tokenTo: e.target.value,
              }))
            }
            placeholder="Transfer to: (Account id)"
            className=" outline-none border border-orange-300 w-11/12 lg:w-7/12 h-8 px-3 rounded-lg my-1"
          />
          <input
            onChange={(e) =>
              setTokenTransfer((pastInput) => ({
                ...pastInput,
                amount: e.target.value,
              }))
            }
            type="number"
            placeholder="Transfer amount:"
            className=" outline-none border border-orange-300 w-11/12 lg:w-7/12 h-8 px-3 rounded-lg"
          />
          <input
            type="submit"
            onClick={() => makeTransfer()}
            className=" outline-none border border-orange-300 w-11/12 lg:w-7/12 h-8 px-3 rounded-lg my-5 capitalize cursor-pointer"
            value="transfer"
          />
        </div>
      )}
    </MainLayout>
  );
}

export default Dashboard;
