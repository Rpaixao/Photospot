// Example of provider configs supported by SimpleAuth.

module.exports = {
    google: {
        appId: '1234567890-abc.apps.googleusercontent.com',
        callback: 'com.reactnativesimpleauth:/oauth2redirect',
    },
    facebook: {
        appId: '1319161574842128',
        callback: 'fb1319161574842128://authorize',
    },
    twitter: {
        appId: '1234567890abc',
        appSecret: '1234567890abc',
        callback: 'reactnativesimpleauth://authorize',
    },
    tumblr: {
        appId: '1234567890abc',
        appSecret: '1234567890abc',
        callback: 'reactnativesimpleauth://authorize',
    },
};