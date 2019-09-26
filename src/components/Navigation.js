import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {
  signOut, getFileUrl, updateRegisteredUser, deleteFile,
} from '../actions';
import {Menu, Icon, Avatar, Tooltip} from 'antd';
import styled from 'styled-components';
import {useStateValue} from '../hooks/useStateValue';
import {StyledUploadImage, StyledButton} from '../styled';

export const Navigation = props => {
  const [state, dispatch] = useStateValue();
  const [current, setCurrent] = useState('Home');
  
  const pathNames = {
    '/': 'Home',
    '/create-org': 'Create Org',
    '/org-dashboard': 'Org Dashboard',
    '/login': state.auth.loggedIn ? 'Logout' : 'Login',
  };
  
  useEffect(() => {
    setCurrent(pathNames[ props.location.pathname ]);
  }, [props.location.pathname]);
  
  const handleClick = e => {
    if (e.key === 'Logout'){
      signOut(dispatch);
      return;
    }
  };
  
  const onFileUploaded = async(path) => {
    const url = await getFileUrl(path);
    const user = state.auth.registeredUser;
    user.imagePath = path;
    user.imageUrl = url;
    updateRegisteredUser(user, dispatch);
    
  };
  
  const deleteAvatar = () => {
    deleteFile(state.auth.registeredUser.imagePath);
    const user = state.auth.registeredUser;
    delete (user.imagePath);
    delete (user.imageUrl);
    updateRegisteredUser(user, dispatch);
  };
  
  return (
    <StyledNavigation>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="inline">
        <Menu.Item
          key={state.auth.loggedIn ? 'Logout' : 'Login'}
          style={{height: '52px'}}
        >
          {state.auth.loggedIn ? (
            <>
              <Link to="/dashboard">
                <Icon type={'logout'}/>
                Logout
              </Link>
            </>
          ) : (
            <Link to={'/login'}>
              <Icon type={'login'}/>
              Login
            </Link>
          )}
        </Menu.Item>
        
        <div className={'avatar'}>
          {state.auth.registeredUser && state.auth.registeredUser.imageUrl ?
            <StyledAvatarImage className={'avatar-img'}>
              <StyledAvatar size={100}
                            src={state.auth.registeredUser.imageUrl}/>
              <Tooltip title={'Delete Avatar'}>
                <StyledDelete
                  onClick={deleteAvatar} type="close"/>
              </Tooltip>
            </StyledAvatarImage> :
            <StyledUploadImage fileUploadComplete={onFileUploaded}/>}
        
        </div>
        
        
        <Menu.Divider/>
        <Menu.Item key="Home">
          <Link to={'/dashboard'}>
            <Icon type="home"/>
            Home
          </Link>
        </Menu.Item>
        {state.auth.loggedIn && (
          <Menu.Item key={'Create Org'}>
            <Link to={'/create-org'}>
              <Icon type="plus-circle"/>
              Create Org
            </Link>
          </Menu.Item>
        )}
        {state.org.createdOrg && (
          <Menu.Item key={'Org Dashboard'}>
            <Link to={'/org-dashboard'}>
              <Icon type="dashboard"/>
              Org Dashboard
            </Link>
          </Menu.Item>
        )}
      </Menu>
    </StyledNavigation>
  );
};

const StyledAvatarImage = styled.div`
position: relative;
:hover > i {
  color: #ff4d4f;
}
`;

const StyledAvatar = styled(Avatar)`

`;

const StyledDelete = styled(Icon)`
position: absolute;
right: 0;
top: 0;
color: transparent;
`;

const StyledNavigation = styled.div`
.avatar {
display: flex;
  justify-content: center;
  margin: 3rem 0;
}
`;

export default withRouter(Navigation);
