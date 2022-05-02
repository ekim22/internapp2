const Comment = require('../models/comment');
const User = require('../models/user');
const Profile = require('../models/profile');

module.exports.createCommentThread = async (req, res) => {
  const author = await User.findOne({_id: req.userData.userId})
      .then((user) => {
        return user.name;
      });

  const profile = await Profile.findOne({userId: req.userData.userId}).lean();

  const commentThread = new Comment({
    appId: req.body.appId,
    threadAuthor: author,
    threadSubject: req.body.subject,
    comments: [{
      profile: profile._id,
      commentAuthor: author,
      comment: req.body.body,
    }],
  });

  commentThread.save().then((document) => {
    res.status(200).json({
      message: 'New comment thread created!',
      commentThread: document,
    });
  }).catch((err) => {
    res.status(500).json({
      message: 'Failed to create comment thread.',
    });
    console.log(err);
  });
};

module.exports.getCommentThreads = (req, res) => {
  let appId;
  if (req.params.appid === 'student') {
    appId = req.userData.userId;
  } else {
    appId = req.params.appid;
  }
  Comment.find({appId: appId})
      .populate({
        path: 'comments.profile',
        select: 'name email userId -_id',
      })
      .exec()
      .then((commentThreads) => {
        if (commentThreads) {
          res.status(200).json({
            commentThreads: commentThreads,
          });
        } else {
          res.status(200).json({
            commentThreads: [],
          });
        }
      });
};

module.exports.deleteCommentThread = (req, res) => {
  Comment.findOneAndDelete({_id: req.params.id}).then(
      (document) => {
        res.status(200).json({
          message: 'Comment thread has been deleted!',
        });
      },
  ).catch(() => {
    res.status(400).json({
      message: 'Failed to delete comment thread',
    });
  });
};

module.exports.addComment = async (req, res) => {
  const author = await User.findOne({_id: req.userData.userId})
      .then((user) => {
        return user.name;
      });

  const profile = await Profile.findOne({userId: req.userData.userId}).lean();

  const comment = {
    profile: profile._id,
    commentAuthor: author,
    comment: req.body.body,
  };
  Comment.findOneAndUpdate({_id: req.body.threadId}, {$push: {comments: comment}})
      .then((document) => {
        res.status(200).json({
          message: 'Comment added to thread!',
          comment: comment,
        });
      })
      .catch(() => {
        res.status(400).json({
          message: 'Failed to add comment.',
        });
      });
};

