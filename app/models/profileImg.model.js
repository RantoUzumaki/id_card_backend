import { model, Schema } from 'mongoose';

const Profile_Image = model(
  'Profile_image',
  new Schema({
    profileImg: {
      type: String
    }
  })
);

export default Profile_Image;
