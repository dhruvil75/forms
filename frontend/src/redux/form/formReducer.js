import { GET_FORMS, ADD_FORM } from "./formActions";

const initialState = {
 forms:[]
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORMS: {
      return {
        ...state,
        forms: action.data
      };
    }
    case ADD_FORM: {
      return {
        ...state,
        forms: [...state.forms, action.data]
      }
    }
    default: {
      return { ...state };
    }
  }
};

export default formReducer;