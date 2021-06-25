/** @format */

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { metamask, binance, trust } from "../Images/Images";
import Web3 from "web3";
import numbro from "numbro";
import { utils } from "ethers";
var web3 = new Web3(Web3.givenProvider || "http://localhost:3000/");

const ConnnectWallet = props => {
  const [addres, setAddres] = useState(null);

  // ======================°°°°°°°°°°°°°°°°°°°°°°°=========================
  //                            connect Metamask
  // ======================°°°°°°°°°°°°°°°°°°°°°°°=========================

  const connectMetaMask = async () => {
    if (window.ethereum) {
      //check if Metamask is installed
      try {
        const address = await window.ethereum.enable().then(e => {
          setAddres(e[0]);
          props.address(e);
        });

        const obj = {
          connectedStatus: true,
          status: "",
          address: address,
        };

        return obj;
      } catch (error) {
        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right.",
        };
      }
    } else {
      return {
        connectedStatus: false,
        status:
          "🦊 You must install Metamask into your browser: https://metamask.io/download.html",
      };
    }
  };

  const getFullDisplayBalance = (balance, format = {}) => {
    return numbro(utils.formatEther(balance)).format(Object.assign({}, format));
  };

  // ======================°°°°°°°°°°°°°°°°°°°°°°°=========================
  //                            connect BinanceChain
  // ======================°°°°°°°°°°°°°°°°°°°°°°°=========================

  const connectBinanceChain = () => {
    if (window.BinanceChain) {
      //check if Binance Chain is installed
      try {
        const address = window.BinanceChain.enable().then(e => {
          setAddres(e[0]);
          props.address(e);
        });
        console.log(address);
      } catch (error) {
        return {
          connectedStatus: false,
          status:
            " Connect to Binance Chain using the button on the top right.",
        };
      }
    }
  };
  const bal = () => {
    if (addres) {
      web3.eth.getBalance(addres).then(balance => {
        props.balance(getFullDisplayBalance(balance));
        handleClose();
      });
    }
  };
  bal();

  //   modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 

  const mymodal = {
    margin: "0 auto",
    borderRadius: 10,
    border: "none",
  };
  const mymodal_title = {
    fontSize: "24px",
    fontFamily: "Roboto , Helvetica , Arial ,sans-serif",
    fontWeight: 500,
    color: "#212121",
    lineHeight: "28px",
    letterSpacing: "3px",
  };

  const wallet_btn = {
    backgroundColor: "#282c34",
    width: "90%",
    borderRadius: 10,
    margin: "0 auto",
    padding: 7,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 24,
    letterSpacing: "0.88px",
    cursor: "pointer",
    userSelect: "none",
  };
  const btnSpan = {
    position: "relative",
    left: "23%",
    textAlign: "center",
  };
  // ======================°°°°°°°°°°°°°°°°°°°°°°°=========================
  //                       Connect wallet Modal
  // ======================°°°°°°°°°°°°°°°°°°°°°°°=========================
  return (
    <>
      <div style={{width: "100%"}} onClick={handleShow}>
        {props.btnName}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        style={mymodal}
        aria-labelledby='contained-modal-title-vcenter'
        centered>
        <Modal.Header>
          <Modal.Title style={mymodal_title}>Connect Wallet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={wallet_btn} onClick={connectMetaMask}>
            <img src={metamask} alt='' width='40' />
            <span style={btnSpan}>Metamask</span>
          </div>
          <div style={wallet_btn} onClick={connectBinanceChain}>
            <img src={binance} alt='' width='40' />
            <span style={btnSpan}>Binance Wallet</span>
          </div>
          <div style={wallet_btn}>
            <img src={trust} alt='' width='40' />
            <span style={btnSpan}>Trust Wallet</span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConnnectWallet;
