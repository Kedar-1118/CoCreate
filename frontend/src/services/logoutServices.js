// logout
export const logout = async () => {
    localStorage.clear('user');
    localStorage.clear('token');
    // navigate("/login"); // Redirect to login
};