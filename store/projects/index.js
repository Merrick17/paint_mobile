const projectsInitState = {
    loading: false,
    list: [],
  };
  
  const projectsReducer = (state=projectsInitState, action) => {
    let {type, payload} = action;
  
    switch (type) {
      case 'GET_ALL_PROJECTS':
        return {...state, loading: true};
  
      case 'GET_ALL_PROJECTS_SUCCESS':
        return {...state, loading: false, list: payload};
      default:
        return state;
    }
  };
  
  export default projectsReducer;