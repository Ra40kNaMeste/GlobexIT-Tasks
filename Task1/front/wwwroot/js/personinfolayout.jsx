const rootNode = document.getElementById("root");
const root = ReactDOM.createRoot(rootNode);

function Card({person}){
    return <div className="card">
        <table>
        <caption>{person.name}</caption>
        <tr>
            <td><img src="image/phone.svg" className="icon"></img></td>
            <td><p className="data">{person.phone}</p></td>
        </tr>
        <tr>
            <td><img src="image/email.svg" className="icon"></img></td>
            <td><p className="data">{person.email}</p></td>
        </tr>
    </table>
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
                {this.state.people.map(p=><Card person={p}></Card>)}
            </div>
        </div>
      }
}

root.render(
    <Search/>
);
