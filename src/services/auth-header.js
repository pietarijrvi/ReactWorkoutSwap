/**
 * Function used for accessing protected resources.
 * @returns HTTP Authorization header if there is a logged in user with accessToken. Otherwise, return an empty object.
 */
export default function authHeader() {
    //Checks Local Storage for user item.
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.accessToken) {
        // for Node.js Express back-end
        return {'x-access-token': user.accessToken};
    } else {
        return {};
    }
}