import { Provider } from "react-redux";
import "./App.css";
import store from "./store";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Provider store={store}>
        <Layout />
      </Provider>
    </>
  );
}

export default App;
