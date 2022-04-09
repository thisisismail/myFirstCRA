let initialState = '';

const tokenReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'TOKEN':
      return action.payload;
    default:
      return state;
  }
}

export default tokenReducers;