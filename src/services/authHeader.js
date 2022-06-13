export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('data'));
    if (user && user.results.token) {
        return { Authorization: 'Bearer ' + user.results.token };
    } else {
        return {};
    }
}