import userEvent from "@testing-library/user-event";
import { Component } from "react";

interface User {
    name: string;
    age: Number;
}

interface UserSearchState {
    name: string;
    user: User | undefined;
}

interface UserSearchProps {
    users: User[]
}

class UserSearch extends Component<UserSearchProps> {

    state: UserSearchState = {
        name: '',
        user: undefined
    };

    onClick = () => {

        const foundUser = this.props.users.find(d => {
            return d.name === this.state.name;
        });

        this.setState({ user: foundUser });
    }

    render() {

        const { name, user } = this.state;

        return (<div>
            <div>Find</div>
            <input value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />

            <button onClick={this.onClick}>Search</button>
            <div>Search Results</div>
            {user?.name}
            {user?.age}
        </div>
        );
    }

}

export default UserSearch;