import * as PropTypes from "react-native";

export default class Params {

    static prepare(params) {
        let formData = new FormData();

        formData.append("password", 'apple');
        formData.append("source", 'ANDROID_APP');
        formData.append("packageName", 'com.gcloud.gaadi.stg');
        formData.append("userType", 3);
        formData.append("apikey", 'U3KqyrewdMuCotTS');
        formData.append("ANDROID_ID", 'ab697e1669f5b118');
        formData.append("normal_password", 'apple');
        formData.append("SERVICE_EXECUTIVE_LOGIN", false);
        formData.append("normal_password", 'apple');
        formData.append("cloud_owner", 'GAADI');
        formData.append("UC_DEALER_USERNAME", 'saroj.sahoo@gaadi.com');
        formData.append("output", 'json');
        formData.append("username", 'android@gaadi.com');
        formData.append("ucdid", 1217);
        formData.append("APP_VERSION", 56);
        formData.append("user_email", 'android@gaadi.com');
        formData.append("user_id", 3);
        formData.append("ipAddress", '192.168.83.85');

        if (!params && !Array.isArray(params)) {
            for (let attribute in params) {
                if (params.hasOwnProperty(attribute))
                    formData.append(attribute, params[attribute]);
            }
        }

        return formData;
    }
}

Params.PropTypes = {
    prepare: PropTypes.func
};