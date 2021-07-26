const EventComponent :React.FC = () =>{

    const onChange = (e:React.ChangeEventHandler<HTMLInputElement>) =>{
        console.log(e);
    }

    return (
        <div>
            <input onChange={(e) => onChange}/>
        </div>


    );

}

export default EventComponent;