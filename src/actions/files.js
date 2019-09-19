import firebase from '../firebase/FirebaseConfig';

export async function uploadImage( file ){
  const storage = firebase.storage();
  const metadata = {
    contentType: 'image/jpeg',
  };
  const storageRef = await storage.ref();
  const imageName = generateHashName(); //a unique name for the image
  const imgFile = storageRef.child( `Vince Wear/${ imageName }.png` );
  return imgFile.put( file, metadata );
}

const generateHashName = () => {
  const availableCharacters = ["1","2","3"]
}