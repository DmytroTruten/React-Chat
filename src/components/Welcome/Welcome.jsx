import logo from "../../logo.svg";
import signInImg from "../../assets/google-sign-in.png"
import "./Welcome.css";

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p className="Welcome-text">Welcome to React-Chat!</p>
      <p className="Sign-text">
        Sign in with Google to chat with your friends.
      </p>
      <button className="Sign-button">
        <img src={signInImg} alt="" />
      </button>
    </div>
  );
}

export default App;
