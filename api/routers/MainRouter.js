// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
const express = require("express");
const router = express.Router();
const { registration,
  usersLogin,
  createAccount,
  getUsersBalance,
  transferHbar,
  getAccountDetails,
  getUsersAvailableNFTs,
  atomicBuyNFTWithToken,
  createSellOrder,
  usersNftInfo,
  getUsersNft,
  saveUsersNft,
  getIdByPassword,
  transferNFT,
  listNft,
  allListing,
  getSalesById,
  atomicBuyNFTWithNFT} = require("../controller/MainController.js");
router.route("/swapNftWithToken").post(atomicBuyNFTWithToken)
router.route("/register").post(registration);
router.route('/createWallet').get(createAccount);
router.route('/login').post(usersLogin);
router.route('/userDetails').post(getAccountDetails)
router.route("/createNftTokenSale").post(createSellOrder);
router.route('/getNft').post(getUsersNft);
router.route('/getId').post(getIdByPassword);
router.route('/saveNft').post(saveUsersNft);
router.route('/transfer').post(transferHbar);
router.route('/nftinfo').post( usersNftInfo);
router.route('/transferNft').post(transferNFT);
router.route('/listing').post(listNft);
router.route('/getallListings').get(allListing)
router.route('/getsalesbyid').post(getSalesById)
module.exports = router;