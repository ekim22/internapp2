const User = require('../models/user');
const Profile = require('../models/profile');


module.exports.getProfile = async (req, res) => {
  const user = await User.findById(req.userData.userId)
      .lean();
  const profile = await Profile.findOne({userId: req.userData.userId})
      .then((profile) => {
        if (!profile) {
          const newProfile = new Profile({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            about: '',
            imgPath: '',
          });
          newProfile.save();
          return newProfile;
        }
        return profile;
      });
  res.status(200).json({
    profile: profile,
  });
};

const makeProfilePicFromName = (name) => {
  const initials = name.toString().toUpperCase().split(' ')
      .map((el) => el.toString().substring(0, 1)).join('');
  console.log(initials);
  return initials;
};
