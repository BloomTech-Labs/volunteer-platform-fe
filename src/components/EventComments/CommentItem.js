import React, {useState} from 'react';
import {Comment, Avatar} from 'antd';
import Editor from './Editor';
import PropTypes from 'prop-types';
import moment from 'moment';

const CommentItem = ({name, avatarUrl, comment, addCommentToComment, commentId, isLoading, allowReply, replies, createdAt}) => {
  
  const [reply, setReply] = useState(false);
  
  const handleSubmit = (values) => {
    addCommentToComment(values, {name, avatarUrl, comment, commentId});
  };
  debugger;
  return (
    <div>
      <Comment
        actions={allowReply ? [
          <span onClick={() => setReply(!reply)} key="comment-nested-reply-to">Reply to</span>,
        ] : []}
        author={<a>{name && name} {moment.unix(createdAt).format('LLL')}</a>}
        avatar={
          <Avatar
            src={avatarUrl}
            alt={name}
          />
        }
        content={
          <p>
            {comment}
          </p>
        }
      >
        
        {replies && replies.map(reply => {
          return <CommentItem allowReply={false}
                              isLoading={false} {...reply} />;
        })}
        {reply && <Editor onSubmit={handleSubmit} submitting={isLoading}/>}
      </Comment>
    </div>
  );
};

CommentItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  comment: PropTypes.string.isRequired,
  addCommentToComment: PropTypes.func,
  commentId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  allowReply: PropTypes.bool.isRequired,
  replies: PropTypes.arrayOf(PropTypes.object),
};
export default CommentItem;