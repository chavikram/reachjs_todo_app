import React from 'react';
import ReactDOM from 'react-dom';
import './node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from 'jquery';

class Todo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const styleName = (this.props.item.completed ? " list-group-item d-flex justify-content-between align-items-center del-text" : "list-group-item d-flex justify-content-between align-items-center");
        console.log('render called');
        return (
            <a title="xx" className={styleName} onClick={(e) => this.props.markItem(this.props.item.id, e)}>
                <span style={{ cursor: "pointer" }} className={this.props.item.completed ? "del-text" : ""}>
                    {this.props.item.text}
                </span>
                <span style={{ cursor: "pointer" }} className="badge badge-primary badge-pill" >
                    <FontAwesomeIcon icon={faEdit} onClick={(e) => this.props.editItem(this.props.item.id, e)} /> &nbsp;
                    <FontAwesomeIcon icon={faTrash} onClick={(e) => this.props.deleteItem(this.props.item.id, e)} />
                </span>
            </a>
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
        this.editItem = this.editItem.bind(this);

    }

    editItem(id, e) {
        e.preventDefault()
        const elementsIndex = this.state.list.findIndex(element => element.id == id)
        let newArray = [...this.state.list]
        if (newArray[elementsIndex].completed) {
            alert('Activity is completed');
            e.stopPropagation();
            return;
        }
        $('#myInput').val(newArray[elementsIndex].text);
        $('#myInput').attr("data-id", id);
        $('#addBtn').text("Update");
        e.stopPropagation();
    }

    updateItem(id, e) {
        e.preventDefault()
        const elementsIndex = this.state.list.findIndex(element => element.id == id)
        let newArray = [...this.state.list]

        newArray[elementsIndex] = { ...newArray[elementsIndex], text: $("#myInput").val() }

        this.setState({
            list: newArray,
        });
        $("#addBtn").text("Add");
        $("#myInput").val("");
        e.stopPropagation();
    }
    markItem(id, e) {
        e.preventDefault()
        const elementsIndex = this.state.list.findIndex(element => element.id == id)
        let newArray = [...this.state.list]
        newArray[elementsIndex] = { ...newArray[elementsIndex], completed: !newArray[elementsIndex].completed }

        this.setState({
            list: newArray,
        });
    }
    deleteItem(id, e) {

        console.log('delete item called')
        let newArray = [...this.state.list]
        const elementsIndex = this.state.list.findIndex(element => element.id == id)

        newArray = this.state.list.filter(function (obj) {
            return obj.id !== id;
        });

        this.setState({
            list: newArray
        });
        e.stopPropagation();
        alert('item deleted successfully')
    }
    addItem(e) {
        if ((e.type == 'click' && e.target.title == 'addBtn') && $('#addBtn').text() == "Update") {

            this.updateItem($('#myInput').attr("data-id"), e);
            return;
        }
        if ((e.type == 'keydown' && e.keyCode == 13) ||
            (e.type == 'click' && e.target.title == 'addBtn')) {
            var val = $('#myInput').val();
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
            $('#myInput').val('');

        }

    }
    showItem(e) {
        alert('clicked');
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 offset-md-3">
                    <h2>My Todo List</h2>


                    <input type="text" data-id="" title="todoinput" id="myInput" className="form-control" length="15" placeholder="Title..." onKeyDown={this.addItem} />

                    <span id="addBtn" style={{ marginTop: "10px" }} onClick={this.addItem} className="form-control btn btn-primary" title="addBtn">Add</span>


                    <br />
                    <div className="list-group" style={{ marginTop: "10px" }}>
                        {this.state.list.map((todo) => <Todo editItem={this.editItem} markItem={this.markItem} deleteItem={this.deleteItem} key={todo.id} item={todo}></Todo>)}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<List />, document.getElementById('outer'));
