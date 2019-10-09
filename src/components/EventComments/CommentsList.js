import {List} from 'antd';
import CommentItem from './CommentItem';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CommentList = ({comments, addCommentToComment, isLoading, event}) => {
  
  return (<SyledCommentList>
      <h1>Event Comments</h1>
      {comments && comments.length > 0 ?
        <List
          dataSource={comments}
          header={`${comments.length} ${comments.length > 1 ? 'comments' :
            'comment'}`}
          itemLayout="horizontal"
          renderItem={props => <CommentItem {...props}
                                            event={event}
                                            allowReply={true}
                                            addCommentToComment={addCommentToComment}
                                            isLoading={isLoading}/>}
        /> : <h4>There are no comments at this time.</h4>}
    </SyledCommentList>
  );
};

const SyledCommentList = styled.div`
max-width: 800px;
margin-left: 15%;
`;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCommentToComment: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export default CommentList;