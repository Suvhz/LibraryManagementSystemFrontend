import auth0 from 'auth0-js';
import history from '../components/history';
export default class Auth {
    userProfile;
    tokenRenewalTimeout;
    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.scheduleRenewal();
    }
    auth0 = new auth0.WebAuth({
        domain: 'suvha.auth0.com',
        clientID: 'O-t9pr-Te-UugJkVXOiUnZ20YztaU7Tv',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile read:messages',
        audience: 'https://suvha.com/api'
    });

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        debugger
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/book');
            } else if (err) {
                history.replace('/');
                console.log(err);
            }
        });
    }

    setSession(authResult) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this.scheduleRenewal();
        history.replace('/book');
    }

    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.userProfile = null;
        clearTimeout(this.tokenRenewalTimeout);
        history.replace('/');
    }
    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        return accessToken;
    }
    isAuthenticated() {
        // Check whether the current time is past the
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
    getProfile(cb) {
        let accessToken = this.getAccessToken();
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
            }
            cb(err, profile);
        });
    }

    renewToken() {
        auth0.checkSession({},
            (err, result) => {
                if (err) {
                    alert(
                        `Could not get a new token (${err.error}: ${err.error_description}).`
                    );
                } else {
                    this.setSession(result);
                    alert(`Successfully renewed auth!`);
                }
            }
        );
    }

    scheduleRenewal() {
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        const delay = expiresAt - Date.now();
        if (delay > 0) {
            this.tokenRenewalTimeout = setTimeout(() => {
                this.renewToken();
            }, delay);
        }
    }
}