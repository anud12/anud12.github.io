import {drive} from './googleLogin';

console.log(drive);

console.log("Module Loaded");
export const save = async (parent, body) => {
    return await gapi.client.drive.files.create({
        'content-type': 'application/json',
        uploadType: 'multipart',
        name: 'name',
        parents: ['1YQPVPHBAX7q3sXevT7In2O-VTy9p8BH6'], 
        mimeType: 'text/plain',
        fields: 'id, name, kind, size'
    })
    .then(apiResponse => {
        fetch(`https://www.googleapis.com/upload/drive/v3/files/${apiResponse.result.id}`, {
        method: 'PATCH',
        headers: new Headers({
            'Authorization': `Bearer ${gapi.client.getToken().access_token}`,
            'Content-Type': 'text/plain'
        }),
        body: body
    }).then(res => console.log(res))});
};