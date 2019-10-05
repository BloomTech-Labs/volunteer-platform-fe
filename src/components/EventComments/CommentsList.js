import {List} from 'antd';
import CommentItem from './CommentItem';
import React from 'react';
import styled from 'styled-components';

const CommentList = ({comments}) => {
  return (<SyledCommentList>
      <h1>Event Comments</h1>
      {comments && comments.length > 0 ? <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' :
          'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <CommentItem {...props} />}
      /> : <h4>There are no comments at this time.</h4>}
    </SyledCommentList>
  );
};

const SyledCommentList = styled.div`
margin-left: 15rem;
padding: 1rem 3rem;
`;

export default CommentList;