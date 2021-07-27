import { Child, ChildFC } from "./Child";

const Parent = () => {

    return (
        <div>
            <Child color="red" onClick={() => console.log('Clicked')} />
            <ChildFC color="green" onClick={() => console.log('Clicked')}>
                Automatic  properties
            </ChildFC>
        </div>
    );
};

export default Parent;