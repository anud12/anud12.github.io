console.log("Google login import");

await new Promise(res => {
    const node = document.createElement('script');
    node.setAttribute('src', 'https://apis.google.com/js/api.js');
    node.addEventListener('load', res);
    document.querySelector('head').appendChild(node);
})
await new Promise(res => {
    const node = document.createElement('script');
    node.setAttribute('src', 'https://accounts.google.com/gsi/client');
    node.addEventListener('load', res);
    document.querySelector('head').appendChild(node);
})
const gapi = window.gapi;

const CLIENT_ID = '985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
await new Promise((res) => {
    gapi.load('client', res);
})

await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });

const tokenClientImpl = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
});

// tokenClient.callback = async (resp) => {
//     if (resp.error !== undefined) {
//         throw (resp);
//     }
//     await listFiles();
// };

if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClientImpl.requestAccessToken({ prompt: 'consent' });
} else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClientImpl.requestAccessToken({ prompt: '' });
}
export const gapiClient = gapi;
export const tokenClient = tokenClientImpl;
