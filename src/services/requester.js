
export const request = async (method, url, data) => {

    try {
        let buildRequest;

        if (method === 'GET') {
            buildRequest = fetch(url)
        } else {
            buildRequest = fetch(url, {
                method,
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            })

        }
        const responce = await buildRequest;
        console.log(responce)
        const result = await responce.json();
        return result;
    } catch (error) {
        console.log(error);
    }

}
export const get= request.bind({}, 'GET');
export const post= request.bind({}, 'POST');
export const put= request.bind({}, 'PUT');
export const del= request.bind({}, 'DELETE')
