import Realm from 'realm';
import {CarModel} from "./Schemas";

const realm = new Realm({schema: [CarModel]});

export const RESULT = {
    OK: 0,
    FAIL: 1
};

export function all() {
    return realm.objects(CarModel.name).sorted('makename', false);
}

export function write(obj_arr) {
    try {
        if (Array.isArray(obj_arr)) {
            realm.write(() => {
                for (let i = 0; i < obj_arr.length; i++)
                    realm.create(obj_arr[i]);
            })
        } else {
            realm.write(() => {
                realm.create(obj_arr);
            })
        }

        return RESULT.OK;

    } catch (error) {
        console.log(error);
        return RESULT.FAIL;
    }
}

export function clear(object) {
    if (!object) {
        realm.deleteAll();
        return RESULT.OK;
    }
    else if (object.hasOwnProperty('id')) {
        let toDelete = realm.objects(CarModel).filtered('make_id = ' + object.id);
        realm.delete(toDelete);
        return RESULT.OK;
    }
    return RESULT.FAIL;
}