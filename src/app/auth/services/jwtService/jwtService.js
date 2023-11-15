import FuseUtils from '../../../../@fuse/utils/FuseUtils';
import { axiosInstance } from '../../../../@mock-api/mock';
import jwtDecode from 'jwt-decode';
import jwtServiceConfig from './jwtServiceConfig';

class JwtService extends FuseUtils.EventEmitter {
    init() {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors = () => {
        axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                console.log('err', err)
                return new Promise((resolve, reject) => {
                    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                        // if you ever get an unauthorized response, logout the user
                        this.emit('onAutoLogout', 'Invalid access_token');
                        this.setSession(null);
                    }
                    throw err;
                });
            }
        );
    };

    handleAuthentication = () => {
        const access_token = this.getAccessToken();
        console.log('handleAuthentication access_token: ', access_token)

        if (!access_token) {
            this.emit('onNoAccessToken');

            return;
        }

        const b = this.isAuthTokenValid(access_token);
        console.log('handleAuthentication isAuthTokenValid: ', b)
        if (b) {
            this.setSession(access_token);
            this.emit('onAutoLogin', true);
        } else {
            this.setSession(null);
            this.emit('onAutoLogout', 'access_token expired');
        }
    };

    createUser = (data) => {
        console.log('createUser', data);
        return new Promise((resolve, reject) => {
            axiosInstance
                .post(jwtServiceConfig.signUp, data)
                .then((response) => {
                    console.log('createUser', response);
                    this.signInWithPhoneAndPassword(data.phone, data.password)
                        .then(() => {/* Don't need to do anything */});
                })
                .catch((error) => {
                    console.log('createUserError', error);
                    reject('Что-то пошло не так, повторите попытку позже');
                });
        });
    };

    signInWithPhoneAndPassword = (cleanPhoneNum, password) => {
        return new Promise((resolve, reject) => {
            axiosInstance
                .post(jwtServiceConfig.signIn, {
                    username: cleanPhoneNum, password: password,
                })
                .then((response) => {
                    console.log('signInWithPhoneAndPassword', response);

                    if (response.data.accessToken) {
                        this.setSession(response.data.accessToken);
                        this.handleAuthentication();
                        resolve(null);
                    } else {
                        reject(response.data.error);
                    }
                })
								.catch(error => {
									console.log('signInWithPhoneAndPassword',error);
									reject('Такого пользователя нет')
								}) 
        });
    };

    signInWithToken = () => {
        return new Promise((resolve, reject) => {
            axiosInstance
                .get(jwtServiceConfig.accessToken)
                .then((response) => {
                    console.log('signInWithToken', response);
                    if (response.data.refreshedToken) {
                        this.setSession(response.data.refreshedToken);
                        resolve(response.data.user);
                    } else {
                        this.logout();
                        reject(new Error('Failed to login with token.'));
                    }
                })
                .catch((error) => {
                    this.logout();
                    reject(new Error('Failed to login with token.'));
                });
        });
    };

    updateUserData = (user) => {
        return axiosInstance.post(jwtServiceConfig.updateUser, {
            user,
        });
    };

    setSession = (access_token) => {
        if (access_token) {
            localStorage.setItem('jwt_access_token', access_token);
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${access_token}`;
        } else {
            // Clean up the localStorage
            localStorage.removeItem('jwt_access_token');
            localStorage.removeItem('cartState');
            delete axiosInstance.defaults.headers.common.Authorization;
        }
    };

    logout = () => {
        this.setSession(null);
        this.emit('onLogout', 'Logged out');
    };

    isAuthTokenValid = (access_token) => {
        if (!access_token) {
            return false;
        }
        const decoded = jwtDecode(access_token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        }

        return true;
    };

    getAccessToken = () => {
        return window.localStorage.getItem('jwt_access_token');
    };
}

const instance = new JwtService();

export default instance;
