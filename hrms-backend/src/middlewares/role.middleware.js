module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const userRole = String(req.user.role).toUpperCase();
    const roles = allowedRoles.map((r) => r.toUpperCase());

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: `Role ${req.user.role} is not allowed`,
      });
    }

    next();
  };
};
