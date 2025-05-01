export const decodeToken = <T>(token: string): T | null => {
  try {
    token = token.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error(error);
    return null;
  }
};
