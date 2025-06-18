export const isAuthenticated = (): boolean => {
  const token = sessionStorage.getItem('token');
  return !!token;
};

export const handleProtectedNavigation = (navigate: (path: string) => void, path: string) => {
  if (isAuthenticated()) {
    navigate(path);
  } else {
    navigate('/sign-in');
  }
}; 