import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";


const RepositoriesList: React.FC = () => {

    const [term, setTerm] = useState('');
    const { searchRepositories } = useActions();

    const { loading, error, data } = useTypedSelector((state) => { return state.repositories; });

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        //dispatch(actionCreators.searchRepositories(term));
        searchRepositories(term);
    }

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <input value={term} onChange={e => setTerm(e.target.value)} />
                <button>Search</button>
            </form>
            {error && <h2>{error}</h2>}
            {loading && <h3>Loading....</h3>}
            <ol>
                {!error && !loading &&
                    data.map(d => {
                        return <li>{d}</li>
                    })
                }
            </ol>
        </div>
    );
};

export default RepositoriesList;