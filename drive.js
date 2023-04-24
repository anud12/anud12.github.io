import * as tokenApi from './token.js';

/**@returns Array<string> */
export const findAllByName = async (
    /**@type string */ name,
) => {
    const token = await tokenApi.get();
    const query = `name = '${name}'`;
    return fetch(`https://www.googleapis.com/drive/v3/files?q=${query}`, {
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
        }),
    })
        .then(async e => (await e.json())?.files?.map(e => e.id) ?? [])
}

export const findByName = async (
    /**@type string */ name,
) => {
    return (await findAllByName(name))[0]
}

/**@returns string */
export const create = async (/**@type string*/ name, /**@type string */ parent) => {
    const token = await tokenApi.get();
    return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", {
        method: "POST",
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json; charset=UTF-8'
        }),
        body: JSON.stringify({
            name,
            parents: [parent]
        })
    }).then(async apiResponse => {
        return (await apiResponse.headers.get('Location'))
    })
}
export const upload = async (/**@type string*/ id, /**@type string */ body) => {
    const token = await tokenApi.get();
    return fetch(id, {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }),
        body: body
    }).then(res => console.log(res))
};
