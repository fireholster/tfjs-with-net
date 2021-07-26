import { useState } from "react";

export interface User {
    name: string,
    age: Number
};

const users = [
    { name: 'Bikrant', age: 20 },
    { name: 'Prashant', age: 20 },
    { name: 'Archana', age: 20 }
];

const UserSearch: React.FC = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState<User | undefined>();

    const onClick = () => {

        const foundUser = users.find(d => {
            return d.name === name;
        });

        setUser(foundUser);
    }

    return (
        <div>
            <div>Find</div>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={onClick}>Search</button>
            <div>Search Results</div>
            {user?.name}
            {user?.age}
        </div>
    );

};

export default UserSearch;