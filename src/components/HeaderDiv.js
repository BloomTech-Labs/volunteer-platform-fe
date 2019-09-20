import React from 'react'
import {Layout} from 'antd'
import {Link} from 'react-router-dom'
const {Header} = Layout

export const HeaderDiv = () => {
    return (
        <Header style={{background: '#fff', padding: 0}}>
            VolunTier
            <Link to='/login'>Login</Link>
            <Link>Sign Up</Link>
        </Header>
    )
}

export default HeaderDiv
