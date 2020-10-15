import axios from "axios";

const API_URL = "http://localhost:9000/api/auth/";

/**
 * Class containing methods used to make login/register requests
 * auth.service methods use axios to make HTTP requests. It also stores or gets JWT from Browser Local Storage inside these methods.
 */
class AuthService {

    /**
     * Stores the user in browser local storage
     * @param email - the user's email
     * @param password - the user's password
     * @returns {Promise<AxiosResponse<T> | never>}
     */
    login(email, password) {
        return axios
            .post(API_URL + "signin", {
                email: email,
                password: password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    /**
     * Removes user from browser local storage
     */
    logout() {
        localStorage.removeItem("user");
    }

    /**
     * Registers the user
     * @param username - the user's username
     * @param email - the user's email
     * @param password - the user's password
     * @returns {Promise<AxiosResponse<T>>}
     */
    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username: username,
            email: email,
            password: password
        });
    }

    /**
     * Returns the current user from browser local storage
     * @returns {any}
     */
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();