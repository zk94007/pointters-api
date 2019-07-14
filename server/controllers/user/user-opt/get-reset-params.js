module.exports = (longOfPasswordTemp, optExpiresIn) => ({
    tempPassword: Math.random().toString(36).slice(-longOfPasswordTemp),
    resetPasswordExpires: new Date(Date.now() + optExpiresIn)
});
