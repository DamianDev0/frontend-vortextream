import {
  StreamVideoClient,
  StreamVideo,
  StreamCall,
  User
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import { MylivestreamUi } from './Mylivestreaming.component';

const apiKey = import.meta.env.VITE_STREAM_API_KEY;
const token = import.meta.env.VITE_STREAM_USER_TOKEN;
const userId = "Savage_Opress";
const callId = "4UQsholJCIMK";

const user: User = {
  id: userId,
  name: 'Streamer'
};

// Crear el cliente con el token de autenticación
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call('livestream', callId);  // Asegúrate de que todos los usuarios se unan al mismo callId

// Unirse a la llamada y crearla si no existe
call.join({ create: true });  

function StreamerUserPage() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MylivestreamUi />
      </StreamCall>
    </StreamVideo>
  );
}

export default StreamerUserPage;
