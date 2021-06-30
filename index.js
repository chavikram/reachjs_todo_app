import React from 'react';
import ReactDOM from 'react-dom';
import './style.module.css'
class Todo extends React.Component  {
    constructor(props){
        super(props)
    }
    
    render(){
        const styleName = (this.props.item.completed ? "completedItem" :"item");
        console.log('render called');
        return (
        <li title="xx" className={styleName} onClick={()=> this.props.deleteItem(this.props.item.id) }>
             {this.props.item.text}</li>
        )
    }
}
class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [
                // {
                //     id: 1,
                //     text: 'Learn Javascript',
                //     completed: false
                // },
                // {
                //     id: 2,
                //     text: 'Learn React',
                //     completed: false
                // },
                // {
                //     id: 3,
                //     text: 'Build a React App',
                //     completed: false
                // }
            ]
        }
       
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);


    }
    deleteItem(id){
        console.log('delete item called')
        let newArray = [...this.state.list]
        const elementsIndex = this.state.list.findIndex(element => element.id == id )
        
        newArray  = this.state.list.filter(function( obj ) {
            return obj.id !== id;
          });

        this.setState({
            list: newArray
        })
    }
    addItem(e) {
        if (e.keyCode == 13) {
            console.log(e.currentTarget.value);
            var val = e.currentTarget.value;
            let newId =0;
            if(this.state.list.length != 0)
            
             newId = this.state.list.slice(-1)[0].id +1;
            else
            newId = 1
            let obj = this.state.list.find((e)=> e.text == val)
            console.log(obj);
            console.log(val!= '');
            
            if (val != '' && ( obj== null || obj.id === undefined ) ){
                this.setState((prevState) => {
                    return {
                        list: prevState.list.concat({id: newId, text:val,completed:false })
                    }
                });
            } else {
                alert("item already exist or empty");
            }
            // list.push(e.currentTarget.value);
            e.currentTarget.value = ''
            console.log("length-" + this.state.list.length);

        }

    }
    render() {
        return (
            <div style={{padding:"14px 14px 14px 14px"}}>
                <span> Todo App</span><br/>
                <input title="todoinput" length="15" onKeyDown={this.addItem} />
                <ul>
                    {this.state.list.map((todo) => <Todo deleteItem={this.deleteItem} key={todo.id} item={todo}></Todo>)}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<List />, document.getElementById('outer'));
