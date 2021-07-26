import ReactDOM from "react-dom";
import GuestList from "./state/GuestList";
import UserSearch from "./refs/UserSearch";
import UserSearchClasses from "./classes/UserSearch";
import EventComponent from "./events/EventComponent";

const App = () =>{

    const users = [
        { name: 'Bikrant', age: 20 },
        { name: 'Prashant', age: 20 },
        { name: 'Archana', age: 201 }
    ];    

    return (
    <div>        
        <UserSearch />  
        <UserSearchClasses users={users} />        
    </div>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));