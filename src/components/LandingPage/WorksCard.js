import React from 'react'
import styled from 'styled-components'

export const WorksCard = (props) => {
    return (
        <StyledDiv>
            <h3>{props.title}</h3>
            <img src={props.image} />
            <p>{props.info}</p>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
    height: 350px;
    width: 300px;
    background: ${({theme}) => theme.gray};
    text-align: center;

    img{
        width: 50%;
    }

    h3{
        font-size: 18px;
    }

    p{
        font-family: ${({theme}) => theme.bodyText};
        font-size: 14px;
    }
`

export default WorksCard
