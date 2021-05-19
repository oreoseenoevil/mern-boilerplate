export const initialState = {
  user: {},
  error: null,
}

export const AuthReducer = (state, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'ERROR_AUTH':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
