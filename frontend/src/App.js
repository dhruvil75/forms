import './App.css';
import Home from './components/Home';
import { Provider } from "react-redux";
import Store from "./redux/Store";

function App() {
  return (
    <Provider store={Store}>
      <Home/>
    </Provider>
  );
}

export default App;
