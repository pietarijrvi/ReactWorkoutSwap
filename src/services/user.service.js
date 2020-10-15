import axios from 'axios';

const API_URL = 'http://localhost:9000/api/test/';

/**
 * Used to to access protected resources from API
 */
class UserService {

    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

}

export default new UserService();