import { io } from 'socket.io-client';
import Constants from 'expo-constants';

const debuggerHost = Constants.expoConfig?.hostUri?.split(':')[0];
const socketURL = process.env.EXPO_PUBLIC_SOCKET_URL || (debuggerHost 
  ? `http://${debuggerHost}:5000` 
  : 'http://10.0.2.2:5000');


const socket = io(socketURL, {
  transports: ['websocket'],
});

export default socket;
