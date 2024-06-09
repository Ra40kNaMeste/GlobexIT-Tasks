const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);

function Card({person, clickHangler}){
    return <div className="card" onClick={clickHangler}>
        <table>
        <caption>{person.name}</caption>
        <tr>
            <td><img src="image/phone.svg" className="icon"></img></td>
            <td><p className="data">{person.phone}</p></td>
        </tr>
        <tr>
            <td><img src="image/email.svg" className="icon"></img></td>
            <td className="data">{person.email}</td>
        </tr>
    </table>
    </div>
}

function ViewCard({person, closed}){
    console.log(person);
    return <div className="backDiv" onClick={closed}>
        <div className="view" onClick={e=>e.stopPropagation()}>
            <div className="viewHeader">
                <h3>{person.name}</h3>
                <img src="image/exit.svg" className="exitImg" onClick={closed}></img>
            </div>
            <table className="viewProperties">
                <tr>
                    <td>Телефон:</td>
                    <td>{person.phone}</td>
                </tr>
                <tr>
                    <td>Почта:</td>
                    <td>{person.email}</td>
                </tr>
                <tr>
                    <td>Дата приёма:</td>
                    <td>{person.hire_date}</td>
                </tr>
                <tr>
                    <td>Должность:</td>
                    <td>{person.position_name}</td>
                </tr>
                <tr>
                    <td>Подразделение:</td>
                    <td>{person.department}</td>
                </tr>
            </table>
            <div className="additionalInfo">
                <h3>Дополнительная информация:</h3>
                <p>{person.information}</p>
            </div>
        </div>
    </div>
}

class Search extends React.Component{
    constructor(props){
        
        super(props);
        this.searchStr = "";
        this.state = {people: []}
        this.load("");
    }
    
    async load(search){
        let path = 'http://127.0.0.1:3000';
        if(search != "")
            path +=`?term=${search}`;
        try{
            const response = await fetch(path);
            const people = await response.json();
            this.setState({people: people});
        }
        catch{

        }
    }
    
    render() {
        console.log(this.state.people)
        return <div className="searchContainer">
            <div className="search">
                <input type="text" onChange={(e)=>this.load(e.target.value)}/>
                <img src="image/search.svg"/>
            </div>
            <div className="cardContainer">
                {this.state.people.map(p=><Card person={p} clickHangler={()=>this.setState({selectPerson: p})}></Card>)}
            </div>
            {this.state.selectPerson != undefined?<ViewCard person={this.state.selectPerson} closed={()=>this.setState({selectPerson:undefined})}></ViewCard>:undefined}
        </div>
      }
}

root.render(
    <Search/>
);
