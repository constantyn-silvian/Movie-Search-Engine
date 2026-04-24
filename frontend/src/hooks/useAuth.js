export default function useAuth() {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token") || null;
    const isLoggedIn = !!token;
    return { token, isLoggedIn };
}