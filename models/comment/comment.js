import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 建立评论数据模型
/* eslint-disable */
const commentSchema = new Schema({
  username: String,
  commentContent: String,
  createdTime: Date,
  subCommentList: [{
    type: ObjectId,
    ref: 'Comments'
  }],
  email: String
});
/* eslint-enable */

export default mongoose.model('Comment', commentSchema);