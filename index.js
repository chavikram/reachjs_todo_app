import React from 'react';
import ReactDOM from 'react-dom';
import './style.module.css'
class Todo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const styleName = (this.props.item.completed ? "checked" : "");
        console.log('render called');
        return (
            <li checked={this.props.item.completed ? 'checked':''} title="xx" className={styleName} onClick={(e) => this.props.markItem(this.props.item.id,e)}>
                {this.props.item.text}
                <span className="close" onClick={(e)=>this.props.deleteItem(this.props.item.id,e)}>x</span>

                </li>
        )
    }
}

class List extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [
               
            ]
        }

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.markItem = this.markItem.bind(this);
    }
    markItem(id,e){
        e.preventDefault()
        const elementsIndex = this.state.list.findIndex(element => element.id == id)
        let newArray = [...this.state.list]
        newArray[elementsIndex] = {...newArray[elementsIndex], completed: !newArray[elementsIndex].completed}

        this.setState({
            list: newArray,
            });
    }
    deleteItem(id,e) {
        
        console.log('delete item called')
        let newArray = [...this.state.list]
        const elementsIndex = this.state.list.findIndex(element => element.id == id)

        newArray = this.state.list.filter(function (obj) {
            return obj.id !== id;
        });

        this.setState({
            list: newArray
        })
        e.stopPropagation()
    }
    addItem(e) {
        if(e.type=='click' && e.target.title == 'addBtn'){
            let inputElement = document.getElementById('myInput');
            console.log(inputElement.value);
            var val = inputElement.value;
            let newId = 0;
            if (this.state.list.length != 0)

                newId = this.state.list.slice(-1)[0].id + 1;
            else
                newId = 1
            let obj = this.state.list.find((e) => e.text == val)
            console.log(obj);
            console.log(val != '');

            if (val != '' && (obj == null || obj.id === undefined)) {
                this.setState((prevState) => {
                    return {
                        list: prevState.list.concat({ id: newId, text: val, completed: false })
                    }
                });
            } else {
                alert("item already exist or empty");
            }
            // list.push(e.currentTarget.value);
            inputElement.value = ''
            console.log("length-" + this.state.list.length);
        }
        if (e.keyCode == 13) {
            let inputElement = document.getElementById('myInput');
            console.log(inputElement.value);
            var val = inputElement.value;
            let newId = 0;
            if (this.state.list.length != 0)

                newId = this.state.list.slice(-1)[0].id + 1;
            else
                newId = 1
            let obj = this.state.list.find((e) => e.text == val)
            console.log(obj);
            console.log(val != '');

            if (val != '' && (obj == null || obj.id === undefined)) {
                this.setState((prevState) => {
                    return {
                        list: prevState.list.concat({ id: newId, text: val, completed: false })
                    }
                });
            } else {
                alert("item already exist or empty");
            }
            // list.push(e.currentTarget.value);
            inputElement.value = ''
            console.log("length-" + this.state.list.length);

        }

    }
    showItem(e){
        alert('clicked');
    }
    render() {
        return (
            <div>
                <div id="myDIV" className="header">
                    <h2>My To Do List</h2>
                    <input title="todoinput" id="myInput" length="15" placeholder="Title..." onKeyDown={this.addItem} />
                    <span onClick={this.addItem} className="addBtn" title="addBtn">Add</span>
                </div>
                <ul>
                    {this.state.list.map((todo) => <Todo markItem={this.markItem} deleteItem={this.deleteItem} key={todo.id} item={todo}></Todo>)}
                </ul>
                </div>
        )
    }
}

ReactDOM.render(<List />, document.getElementById('outer'));
