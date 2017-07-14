import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// 建立文章数据模型
const articleSchema = new Schema({
  title: String,
  articleContent: String,
  updateTime: Date,
  commentList: [{
    type: ObjectId,
    ref: 'Comments'
  }],
  status: String,
  typeName: String,
  author: String
});
// 根据date建立索引
articleSchema.index({updateTime: -1});

// 建立静态方法
articleSchema.statics = {
  async insertArticle(doc) {
    try{
      const ret = await this.create(doc);
      console.log('文章插入成功');
      return ret;
    }catch(err) {
      console.log('文章插入失败');
      throw new Error(err);
    }
  },
  async findArticleById(objectId) {
    try{
      const ret = await this.find({_id: objectId}).exec();
      console.log('根据文章id查找文章成功');
      return ret;
    }catch(err) {
      console.log('根据文章id查找文章失败');
      throw new Error(err);
    }
  },
  async findArticlesByStatusInDesc(status) {
    try{
      const ret = await this.find({status:status}).sort({updateTime:-1}).exec();
      console.log('根据文章状态查找文章成功');
      return ret;
    }catch(err) {
      console.log('根据文章状态查找文章失败');
      throw new Error(err);
    }
  },
  async groupArticlesByTypename() {
    const o = {};
    o.map = function () {
      /* eslint-disable*/
      emit(this.typeName, {
        _id: this._id,
        title: this.title,
        updateTime: this.updateTime,
        status: this.status
      });
      /* eslint-enable*/
    };
    o.reduce = function (key, values) {
      return {
        articleList: values
      };
    };
    o.out = {
      replace: 'typename'
    };
    try{
      const model = await this.mapReduce(o);
      const ret = model.find().exec();
      console.log('根据文章类型查找文章成功');
      return ret;
    }catch(err) {
      console.log('根据文章类型查找文章失败');
      throw new Error(err);
    }
  },
  async updateArticleById(objectId, updateDoc) {
    try{
      const ret = await this.update({_id:objectId},{$set:updateDoc}).exec();
      console.log(`文章更新成功`);
      return ret;
    }catch(err) {
      console.log('文章更新失败');
      throw new Error(err);
    }
    
  },
  async removeArticleById(objectId) {
    try{
      const ret = await this.remove({_id:objectId}).exec();
      console.log('文章删除成功');
      return ret;
    }catch(err) {
      console.log('文章删除失败');
      throw new Error(err);
    }
  }
};

export default mongoose.model('Article', articleSchema);
