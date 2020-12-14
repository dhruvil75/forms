import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import FormReducer from "./form/formReducer";

const middleware = applyMiddleware(thunkMiddleware);
const Store = createStore(FormReducer, middleware);

export default Store;
