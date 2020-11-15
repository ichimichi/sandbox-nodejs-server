import { User } from './user.model';

export const profile = (req, res) => {
  res.status(200).json(req.user);
};

export const update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
