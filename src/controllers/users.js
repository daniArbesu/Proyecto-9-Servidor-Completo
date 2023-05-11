import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validateEmail, validatePassword } from '../utils/validators.js';
import { User } from '../models/mongo.js';
import { deleteImg } from '../middlewares/files.js';

const TOKEN_EXPIRATION = '1h';

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check that the email adress is correct
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      res.status(400).json({ data: 'Invalid email address format' });
      return;
    }

    // Check if the password is valid according to the conditions
    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      res.status(400).json({ data: 'Invalid password' });
      return;
    }

    // Check if user already exists
    const previousUser = await User.findOne({ email }, { _id: 1 }).lean();
    if (previousUser) {
      res.status(400).json({ data: 'Email already exists' });
      return;
    }

    // Storing hash password
    const passwordHash = await bcrypt.hash(password, Number(process.env.PASSWORD_SALTS));

    // Creating new User
    const newUser = new User({
      email: email.toLowerCase(),
      password: passwordHash
    });

    await newUser.save();
    res.status(201).json({ data: 'New User Created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: 'Internal server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user) {
      res.status(401).json({ data: 'Wrong email or password' });
      return;
    }

    // Check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ data: 'Wrong email or password' });
      return;
    }

    // Create token for the logged user
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: TOKEN_EXPIRATION
    });

    res.status(200).json({
      data: {
        token,
        user: {
          email: user.email
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: 'Internal server error' });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.user;
    const isFile = req.file;

    const originalUser = await User.findById(id);
    const hasAvatar = originalUser.avatar;

    // Check if there's a file
    if (!isFile) {
      res.status(401).json({
        data: 'New image for your avatar not found'
      });
      return;
    }

    // Check if there's already an avatar and delete the old one from our cdn
    if (hasAvatar) {
      deleteImg(originalUser.avatar);
    }

    const updateAvatar = await User.findByIdAndUpdate(
      id,
      {
        avatar: req.file.path
      },
      {
        new: true
      }
    );
    res.status(200).json({ data: 'Avatar succesfully changed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ data: 'Internal server error' });
  }
};
