const tokenAction = (text) =>{
  return {
    type: 'TOKEN',
    payload: text,
  }  
}

export default tokenAction;