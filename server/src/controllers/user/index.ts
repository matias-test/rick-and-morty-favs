import { Response, Request } from 'express'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

export async function authenticate(req: Request, res: Response) {
  const secret = process.env.SECRET;
  if (!secret) {
    return res.status(500);
  }

  const { username, password } = req.body as { username: string, password: string };

  if (!username || !password) {
    return res.status(400).send("Username and Password are mandatory");
  }


  const user = await User.findOne({ username: req.body.username });
  console.log('user', user);
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
    return res.status(200).json({
      ...user.toJSON(),
      token,
    });
  }

  return res.status(400).json({ message: 'Username or password is incorrect' })
}

export async function register(req: Request, res: Response) {
  const secret = process.env.SECRET;
  if (!secret) {
    return res.status(500);
  }

  const { username, password } = req.body as { username: string, password: string };

  if (!username || !password) {
    return res.status(400).send("Uername and password are mandatory");
  }

  if (await User.findOne({ username })) {
    return res.status(400).send(`Username ${username} is already taken`);
  }

  const user = new User({
    username,
    hash: bcrypt.hashSync(password, 10),
  });

  const newUser = await user.save();

  const token = jwt.sign({ sub: newUser.id }, secret, { expiresIn: '7d' });
    return res.status(200).json({
      ...user.toJSON(),
      token,
    });
}
