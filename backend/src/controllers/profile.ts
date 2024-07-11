import { RequestHandler } from "express";

const Profile: RequestHandler = async function(req, res: any, next) {
  try {
    const { id, name, email } = res.user;
    console.log(id);

    res.status(200).json({ name, email });
  } catch (error) {
    next(error);
  }
};

export default Profile;