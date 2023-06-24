import CryptoJS from 'crypto-js';
export const useHashData = async (secretesData) => {
    var ciphertext =  CryptoJS.AES.encrypt(secretesData, import.meta.env.VITE_HASHKEY).toString();
    return ciphertext;
}

export const toastDispay = (info)=>{
    toast(`🤝 ${info}`, {
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

export const returnResponse = (enterValue)=>{
    let returnValue =   new Promise((resolve)=>setInterval(resolve(enterValue), 100));
    console.log('okay')
    return returnValue;
}


export const getHederaPrice = async ()=>{
    const resp = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?" +
                  new URLSearchParams({
                    ids: "hedera-hashgraph",
                    vs_currencies: "usd",
                  })
      );
  
      const text = await resp.text();
      // eslint-disable-next-line import/no-named-as-default-member
      const data= JSON.parse(text);
  
      return   new Promise((resolve)=>setInterval(resolve(data), 100))  ;
}



export const backToPages = () => {
    window.history.back();
}