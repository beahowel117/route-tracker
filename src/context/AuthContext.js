import AsyncStorage from "@react-native-community/async-storage";
import createDataContext from './CreateDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../NavigationRef';
//AsyncStorage.clear()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: ''};
    case 'signout':
      return { token: null, errorMessage:''};
      default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  console.log(token)
  if(token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList');
  }else{
    navigate('loginFlow');
  }
};

const clearErrorMessage = dispatch => () =>  {
  dispatch({type: 'clear_error_message'});
}

const signup = dispatch => async ({ email, password }) => {
    //make api request to sign up with that email and password
    try{
      const response = await trackerApi.post('/signup', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token })
      console.log(response.data.token)
      navigate('TrackList');
    }catch(err){
      console.log(err)
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign up'
      });
    }
  };


const signin = (dispatch) => async ({ email, password }) => {
    //try to signin
    //handle success by updating state
    //handle failure by showing error
    try{
      const response = await trackerApi.post('/signin', { email, password });
      await AsyncStorage.setItem('token', response.data.token)
      dispatch({ type: 'signin', payload: response.data.token });
      navigate('TrackList');
    }catch(err){
      console.log(err)
      dispatch({
        type: 'add_error',
        payload: 'Something went wrong with sign in'

      })
    }
  };


const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'signout' });
  navigate('loginFlow')
};


export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage:'' }
);
