import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./store/slices/store";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" theme="colored" />
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  );
}

export default App;
