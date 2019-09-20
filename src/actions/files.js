import firebase from '../firebase/FirebaseConfig';
import uuid4 from 'uuid4';

export async function uploadImage( file ){
  debugger;
  const storage = firebase.storage();
  const metadata = {
    contentType: 'image/jpeg',
  };
  const storageRef = await storage.ref();
  const imageName = uuid4(); //a unique name for the image
  const imgFile = storageRef.child( `images/${ imageName }.png` );
  return imgFile.put( file, metadata );
}
