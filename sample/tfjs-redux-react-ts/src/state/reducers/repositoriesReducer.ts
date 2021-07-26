import { ActionType } from "../action-types";
import { KnownAction } from "../actions";

interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: string[];
}

const intitalState = {
    loading: false,
    error: null,
    data: []
}

const repositoriesReducer = (
    state: RepositoriesState = intitalState,  
    action: KnownAction):

    RepositoriesState => {

    switch (action.type) {
        case ActionType.SEARCH_REPOSITORIES:
            {
                return { loading: true, error: null, data: [] };
            }
        case ActionType.SEARCH_REPOSITORIES_SUCCESS: {

            return { loading: false, error: null, data: action.payload }
        }
        case ActionType.SEARCH_REPOSITORIES_ERROR: {

            return { loading: false, error: action.payload, data: [] }
        }
        default: {
            return state;
        }
    }

}

export default repositoriesReducer;