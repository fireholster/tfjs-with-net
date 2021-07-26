import axios from "axios";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { KnownAction } from "../actions";


export const searchRepositories = (searchText: string) => {

    return async (dispatch: Dispatch<KnownAction>) => {
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES
        });

        try {
            const data = await axios.get("https://registry.npmjs.org/-/v1/search", 
            { params: { text: searchText } });

            const names = 
                 data.data.objects.map((d: any) => {
                     return d.package.name;
                 });

            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: names
            });

        } catch (e) {

            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: e.message
            })

        }
    };

};