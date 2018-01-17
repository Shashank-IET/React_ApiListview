import Params from "./Params";

export function getModels(callback) {
    let body = Params.prepare({method: 'all_model'});
    fetch('http://beta.usedcarsin.in/gcloud/service.php', {
        method: 'POST',
        headers: {},
        body: body
    })
        .then((response) => response.json())
        .then((json) => {
            if (callback.hasOwnProperty('success')) {
                callback.success(json);
            }
        }).catch((error) => {
        if (callback.hasOwnProperty('failure')) {
            callback.failure(error);
        }
    })
}