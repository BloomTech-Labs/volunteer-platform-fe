import React from 'react';
import { Upload, Icon, Modal, Alert } from 'antd';
import { uploadImage } from '../actions/files';
import firebase from '../firebase/FirebaseConfig';
import uuid4 from 'uuid4';

function getBase64( file ){
  debugger;
  return new Promise( ( resolve, reject ) => {
    const reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onload = () => resolve( reader.result );
    reader.onerror = error => reject( error );
  } );
}

class PicturesWall extends React.Component{
  state = { loading: false, imageUrl: '' };
  
  handleChange = ( info ) => {
    debugger;
    if( info.file.status === 'uploading' ){
      this.setState( { loading: true } );
      return;
    }
    if( info.file.status === 'done' ){
      getBase64( info.file.originFileObj, imageUrl => this.setState( {
        imageUrl, loading: false,
      } ) );
    }
  };
  
  beforeUpload = ( file ) => {
    debugger;
    const isImage = file.type.indexOf( 'image/' ) === 0;
    if( !isImage ){
      Alert.error( 'You can only upload image file!' );
    }
    
    // You can remove this validation if you want
    const isLt5M = file.size / 1024 / 1024 < 5;
    if( !isLt5M ){
      Alert.error( 'Image must smaller than 5MB!' );
    }
    return isImage && isLt5M;
  };
  
  customUpload = async( { onError, onSuccess, file } ) => {
    debugger;
    const storage = firebase.storage();
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = await storage.ref();
    const imageName = uuid4(); //a unique name for the image
    const imgFile = storageRef.child( `Vince Wear/${ imageName }.png` );
    try{
      const image = await imgFile.put( file, metadata );
      onSuccess( null, image );
    }catch( e ){
      onError( e );
    }
  };
  
  render(){
    debugger;
    const { loading, imageUrl } = this.state;
    const uploadButton = ( <div>
      <Icon type={ loading ? 'loading' : 'plus' }/>
      <div className="ant-upload-text">Upload</div>
    </div> );
    return ( <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={ this.beforeUpload }
        onChange={ this.handleChange }
        customRequest={ this.customUpload }
      >
        { imageUrl ? <img src={ imageUrl } alt="avatar"/> : uploadButton }
      </Upload>
    </div> );
  }
}

export default PicturesWall;