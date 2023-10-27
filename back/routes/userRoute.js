const {Router} = require("express");
const userRouter = Router();
const {User} = require("../model/User");
const mongoose = require("mongoose");

userRouter.get('/', async (req, res) => {
  try {
      const users = await User.find({});
      return res.send({users});
  } catch (err) {
      console.log(err);
      return res.status(500).send({err: err.message});
  }
})


userRouter.get('/:userId', async (req, res) => {
  try {
      const {userId} = req.params;
      if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userID" });
      const user = await User.findOne({_id: userId});
      return res.send({user});
  } catch (err) {
      console.log(err);
      return res.status(500).send({err: err.message});
  }
})

userRouter.post('/', async (req, res) => {
  // try catch 처리를 꼭 해주자.
  try {
      let {username, name} = req.body;
      if (!username) return res.status(400).send({ err: "username is required" });
      if (!name || !name.first || !name.last) return res.status(400).send({err: "Both first and last names are required"});

      const user = new User(req.body); // 원래는 { username: req.body.username, name: { first: ... } 이런식으로 넣으면되는데,
      // req.body가 user의 형태와 똑같다고 가정을하고 req.body 객체를 이렇게 통채로 넣어준다.
      // 위 const user = new User(req.body) 코드의 역할은 document(=row) 생성이다. 즉, 이 코드를 통해 document 인스턴스가 생성된다.
      // 그리고나서 document(=row)를 DB에 저장해야되니까
      // 아래와 같이 몽구스에서 추가된 save라는 메소드를 user.save() 이런식으로 호출하는데,
      // 이 save() 메소드는 Promise 인스턴스를 return하고 document를 돌려준다.
      // 그래서 user.save() 앞엔 await 키워드를 붙여야된다.
      await user.save(); // 그리고 이렇게 user를 저장해준다.
      return res.send({user})
  } catch (err) {
      // catch에서 잡히는 에러는 서버에서 난 에러이다.
      // user가 값을 잘못 입력해서나는 에러는 이미 try 구문에서 다 잡힌다.
      // 그래서 500번대 status를 return한다.
      console.log(err);
      return res.status(500).send({err: err.message});
  }
})

userRouter.delete('/:userId', async (req, res) => {
  try {
      const {userId} = req.params;
      if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" });
      const user = await User.findOneAndDelete({_id: userId}); // user 객체가 리턴되면 그 객체가 잘 삭제된거고 null을 리턴하면 애초에 그 객체는 존재하지 않았다는 것

      // const user = await User.deleteOne({_id: userId}); // 그냥 deleteOne 메소드를 사용해도 상관이 없다.
      // findOneAndDelete과 deleteOne의 차이는 user를 반환받을 수 있냐 없냐 차이이다.
      // 만약 받을 필요 없으면 deleteOne이 조금 더 효율적일 것이다.

      return res.send({user});
  } catch (err) {
      console.log(err);
      return res.status(500).send({err: err.message});
  }
})

userRouter.put('/:userId', async (req, res) => {
  try {
      const { userId } = req.params;
      if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" });
      const { email } = req.body;
      if (!email) return res.status(400).send({ err: "email is required" }); 

      if (email && typeof email !== 'string') return res.status(400).send({ err: "email must be a number" }); // age 값 타입 체크하는 코드
     

      let updateBody = {};
      if (email) updateBody.email = email;
      
      const user = await User.findByIdAndUpdate(userId, updateBody, { new: true }); 

      return res.send({ user });
   
  } catch (err) {
      console.log(err);
      return res.status(500).send({ err: err.message });
  }
})

module.exports = {
  userRouter
}
