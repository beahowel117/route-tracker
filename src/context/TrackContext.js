import createDataContext from './CreateDataContext';
import trackerApi from '../api/tracker';


const trackReducer = (state, action) => {
  switch (action.type){
    case 'fetch_tracks':
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = dispatch => async () => {
  const res = await trackerApi.get('/track')
  dispatch({type: 'fetch_tracks', payload: res.data})
};
const createTrack = dispatch => async (name, locations) => {
  await trackerApi.post('/track', { name, locations })
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
)
