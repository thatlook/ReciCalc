module.exports.users = {
  getUserProfile: (req, res, next) => {
    const { _raw, _json, ...userProfile } = req.user;
    res.render('user', {
      userProfile: JSON.stringify(userProfile, null, 2),
      title: 'Profile page'
    });
  }
};