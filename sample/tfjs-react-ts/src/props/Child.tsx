interface ChildProps {
    color: string;
    onClick: () => void
}

export const Child = ({ color, onClick }: ChildProps) => {

    return (
        <div>
            Hi from child : {color}
            <button onClick={onClick}>Click on Child</button>
        </div>

    );
};

export const ChildFC: React.FC<ChildProps> = ({ color, onClick }) => {

    return (
        <div>Hi from child : {color}
            <button onClick={onClick}>Click on Child</button>
        </div>

    );
}
