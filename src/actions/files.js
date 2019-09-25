import firebase from '../firebase/FirebaseConfig';
import uuid4 from 'uuid4';

export async function uploadImage(file, onError, onSuccess) {
  const storage = firebase.storage();
  
  const storageRef = await storage.ref();
  const imageName = uuid4(); //a unique name for the image
  const imgFile = storageRef.child( `images/${ imageName }.png` );
  try{
    const image = await imgFile.put( file );
    onSuccess( null, image );
    return image;
  } catch (e) {
    onError(e);
    return e;
  }
}

export const getFileUrl = async( path ) => {
  
  const storageRef = firebase.storage().ref();
  return await storageRef.child( path ).getDownloadURL().then( res => {
    
    return res;
  } ).catch( err => {
    console.log( err );
    return err;
  } );
};

export const deleteFile = ( path ) => {
  firebase.storage().ref().child( path ).delete().then( res => {
  
  } ).catch( err => {
    console.log( err );
  } );
};
