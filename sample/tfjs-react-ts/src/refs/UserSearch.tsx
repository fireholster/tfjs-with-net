import { useState, useRef, useEffect } from "react";

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

    //Why null = so Typescript is satisfied that if we dont use the ref we will have it as null
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [name, setName] = useState('');
    const [user, setUser] = useState<User | undefined>();

    //Pass an empty arrar if you want the inner function be executed once
    useEffect(() => {       

        if(!inputRef.current){            
            return;            
        }

      //  inputRef.current.focus();

    }, []);

    const onClick = () => {

        const foundUser = users.find(d => {
            return d.name === name;
        });

        setUser(foundUser);
    }



    return (
        <div>
            <div>Find</div>

            <input ref={inputRef}
                value={name} onChange={(e) => setName(e.target.value)} />

            <button onClick={onClick}>Search</button>
            <div>Search Results</div>
            {user?.name}
            {user?.age}
        </div>
    );

};

export default UserSearch;