const CLIENT_ID = '985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/drive';


const onLoadPromise = new Promise((res) => {
    window.addEventListener("load", async () => {
        const url = new URL(window.location);
        if (window.location.toString().includes("#")) {
            const hashParams = new URL(url.origin + url.hash.replace("#", "?"));
            const token = hashParams.searchParams.get('access_token');
            const expiresInSeconds = hashParams.searchParams.get('expires_in');
            localStorage.setItem("anud12_token", token);
            localStorage.setItem("anud12_token_expireDateSeconds", new Date().getTime() + (Number(expiresInSeconds) * 1000));
        }
        console.log("Loaded")
        res()
    })
});


export const isValid = async () => {
    return new Promise(async (res) => {
        await onLoadPromise;
        const token = localStorage.getItem("anud12_token");
        if (!token) {
            console.log("isValid false")
            return res(false);
        }
        const expireDate = localStorage.getItem("anud12_token_expireDateSeconds");
        if (!token) {
            console.log("isValid false")
            return res(false);
        }
        if (new Date().getTime() > Number(expireDate)) {
            console.log("isValid false")
            return res(false);
        }
        console.log("isValid true")
        return res(true);
    })

}
/** @returns string */
export const get = async () => {
    if (await isValid()) {
        console.log("get true");
        return localStorage.getItem("anud12_token");
    }
    console.log("get false");
    create();
}

export const create = async () => {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': CLIENT_ID,
        'redirect_uri': window.location.origin,
        'response_type': 'token',
        'scope': SCOPES,
        'include_granted_scopes': 'true',
        'state': 'pass-through value',
        'prompt': "select_account",
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}