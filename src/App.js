/** @format */

import logo from "./logo.svg";
import "./App.css";
import ConnnectWallet from "./Components/ConnectWallet";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; // import bootstrap css
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"; // import bootstrap js bundle
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <button
          className='btn'
          style={{
            borderRadius: "8px",
            backgroundColor: "#e76e31",
            fontWeight: 600,
            boxShadow: "none",
            outline: "none",
            color: "#fff",
            marginTop: 5,
          }}>
          <ConnnectWallet
            address={e => {
              console.log(e[0]);
            }}
            btnName='Connect Wallet'
            balance={e => {
              console.log(e);
              // props.balance(e);
            }}
          />
        </button>
      </header>
    </div>
  );
}

export default App;
