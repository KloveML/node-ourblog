import path from 'path';
import formidable from 'formidable';
import config from 'config-lite';
import qiniu from 'qiniu';

// 配置qiniu的公钥和私钥
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY;

export default class BaseComponent {
  constructor() {
    this.qiniu = this.qiniu.bind(this);
  }
  async qiniu(req, type = 'default'){
    return new Promise((res,rej)=>{
      const form = fomidable.IncomingForm();
      // UPLOADDIR是相对于启动命令
      form.uploadDir = `./public/img/${type}`;
      form.parse(req,async function(err, fields, files){
        // qiniu的配置项
        const bucket = config.qiniu.bucket;
        const imgBaseUrl = config.qiniu.imgBaseUrl;

        const file = files.file;
        const imgName = (new Date().getTime() + Math.ceil(Math.random()*10000)).toString(16);
        const ext = path.extname(file.name);
        const repath = `./public/img/${imgName + ext}`;
        // 修改本地服务器上传文件的文件名
        await fs.rename(file.path, repath);
        // 将本地文件上传到七牛上
        try{
          const key = imgName + ext;
          const PutPolicy = new qiniu.rs.PutPolicy(bucket);
          const token = PutPolicy.token().toString();
          const extra = new qiniu.io.PutExtra();
          const ret = await qiniu.io.putFile(token, key, repath, extra);
          fs.unlink(repath);
          res(imgBaseUrl + ret.key);
        }catch(err){
          console.log('上传至七牛失败',err);
          fs.unlink(repath);
          reject('上传至七牛是被');
        }
      });
    })
  }
}