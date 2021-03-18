import * as Location from 'expo-location';

//10 meters in both long and lat
const tenMetersWithDegrees = 0.0001;

const getLocation = increment => {
  return {
    timestamp: 1000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 5,
      longitude: -87.45704429487047 + increment * tenMetersWithDegrees,
      latitude: 37.960271026717194 + increment * tenMetersWithDegrees
    }
  }
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  });
  counter++;
}, 1000)


