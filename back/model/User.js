const { Schema, model} = require('mongoose');

const UserSchema = new Schema({
  username: {type: String, required: true, unique: true},
  name: {
    first: {type: String, required: true},
    last: {type: String, required: true},
  },
  email: String,
}, {
  timestamps: true
  //createdAt(생성한 시간)을 자동으로 넘겨준다.
});

const User = model('user', UserSchema);
//실제 콜렉션은 users 라는 이름으로 붙어서 생성된다.

module.exports = { User };
