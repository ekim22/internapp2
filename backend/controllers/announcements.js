const Announcements = require('../models/announcements');
const Coordinator = require('../models/coordinator');
const User = require('../models/user');

module.exports.updateAnnouncements = async (req, res) => {
  try {
    const coordinator = await Coordinator.findById({_id: req.userData.userId}).lean();
    if (!coordinator) {
      res.status(403).json({
        message: 'Only coordinators may update announcements!',
      });
    }
    const announcement = await Announcements
        .findOneAndUpdate({dept: coordinator.dept}, {announcements: req.body.newAnnouncements})
        .lean()
        .then((announcements) => {
          if (!announcements) {
            const newAnnouncements = new Announcements({
              announcements: req.body.newAnnouncements,
              dept: coordinator.dept,
            });
            newAnnouncements.save();
            return newAnnouncements;
          }
          return announcements;
        });
    res.status(200).json({
      announcements: announcement.announcements,
      dept: announcement.dept,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({
      message: 'There was an error updating announcements.',
    });
  }
};

module.exports.getAnnouncements = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId).lean();
    let announcements;
    if (user.role === 'Coordinator') {
      announcements = await Announcements.findOne({dept: user.dept}).lean();
    } else if (user.role === 'Student') {
      announcements = await Announcements.findOne({dept: user.appType}).lean();
    }
    if (!announcements) {
      res.status(204).json({
        message: 'No announcements exist yet!',
      });
    } else {
      res.status(200).json({
        message: 'Announcements retrieved!',
        announcements: announcements.announcements,
        program: announcements.dept,
      });
    }
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({
      message: 'There was an error getting announcements.',
    });
  }
};
