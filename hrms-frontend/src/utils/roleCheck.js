export const hasAccess = (userRole, allowedRoles = []) => {
  if (!userRole) return false;

  return allowedRoles.includes(userRole.toUpperCase());
};
