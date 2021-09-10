import { categoryConstants } from "../actions/constants";

const initstate = {
    categories: [],
    loading: false,
    error: null
};

export default (state = initstate, action) => {
    switch(action.type){
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state={
                ...state
            }
            break;

         case categoryConstants.GET_ALL_CATEGORIES_SUCCESS: 
           state = {
               ...state,
               categories: action.payload.categories
           }
           break;

           case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
                  state = {
                      ...initstate  
                  }
                  break;

          case categoryConstants.ADD_NEW_CATEGORY_REQUEST: 
          state= {
              ...state,
              loading: true,
          } 
          break;
          case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
              state = {
                  ...state,
                  loading: false
              }
              break;
           case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
               state = {
                   ...state,
                   error: action.payload.error,
                   loading: false
               }   
              
                case categoryConstants.UPDATE_CATEGORIES_REQUEST:
                    state={
                        ...state,
                        loading: true
                    }
                    break;
                case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
                    state={
                        ...state,
                        loading: false
                    }
                    break;
                case categoryConstants.UPDATE_CATEGORIES_FAILURE:
                    state={
                        ...state,
                        error: action.payload.error,
                        loading: false
                    }
                    break;
                    case categoryConstants.DELETE_CATEGORIES_REQUEST:
                        state={
                          ...state,
                          loading: true
                        }
                        break;
                    case categoryConstants.DELETE_CATEGORIES_SUCCESS:
                        state={
                        ...state,
                        loading: false
                        }
                        break;
                    case categoryConstants.DELETE_CATEGORIES_FAILURE:
                        state = {
                         ...state,
                         loading: false,
                         error: action.payload.error
                        }   
                        break;     
    }
    return state;
}