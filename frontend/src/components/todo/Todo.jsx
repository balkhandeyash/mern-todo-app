import React, { useState } from 'react';
import "./todo.css";
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from "axios";
import { useEffect } from 'react';
let id = sessionStorage.getItem("id");
let toUpdateArray = [];
const Todo = () => {
    
    const [inputs, setInputs] = useState({ title: "", body: "" });
    const [todoArray, setTodoArray] = useState([]);
    

    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const submit = async () => {
        if (inputs.title === "" || inputs.body === "") {
            toast.error("Title or Body should not be empty")
        } else {
            if(id){
                await axios.post(`${window.location.origin}/api/v2/addTask`, {
                    title: inputs.title,
                    body: inputs.body,
                    id: id,
                })
                .then((response) => {
                    console.log(response);
                })
                setInputs({ title: "", body: "" });
                toast.success("Your Task is added");
            }
            else {
                setTodoArray([...todoArray, inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Your Task is added");
                toast.error("Your Task is Not saved ! Please SignUp");
            }

            
        }
        
    };

    const del = async (Cardid) => {
        if (id) {
            await axios.delete(`${window.location.origin}/api/v2/deleteTask/${Cardid}`, {
            data: {id: id},
            })
            .then(() => {
                toast.success("Your Task is Deleted");
            })
        } else {
            toast.error("Please SignUp First");
        }
    };

    const dis = (value) => {
        console.log(value);
        document.getElementById("todo-update").style.display=value;
    };

    const update = (value) => {
       toUpdateArray = todoArray[value];
    }

    useEffect(() => {
        if (id) {
            const fetch = async () => {
                await axios.get(`${window.location.origin}/api/v2/getTask/${id}`,)
                .then((response) => {
                    setTodoArray(response.data.list);
                });
              }
              fetch();
        }
      }, [submit]);

    return (<>
        <div className="todo">
            <ToastContainer />
            <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
                <div className="d-flex flex-column todo-inputs-div w-50 p-1">
                    <input 
                        type="text" 
                        placeholder="TITLE" 
                        name='title'
                        value={inputs.title}
                        className="my-2 p-2 todo-inputs"
                        onClick={show}
                        onChange={change}
                    />
                    <textarea 
                        id="textarea" 
                        placeholder="BODY" 
                        name='body' 
                        value={inputs.body}
                        className="p-2 todo-inputs"
                        onChange={change}
                    />
                </div>
                <div className="w-50 d-flex justify-content-end my-3">
                    <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
                </div>
            </div>
            <div className="todo-body">
                <div className="container-fluid">
                    <div className="row">
                        {todoArray && todoArray.map((item, index) => (
                            <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                                <TodoCards 
                                title={item.title} 
                                body={item.body} 
                                id={item._id} 
                                delid={del}
                                display={dis}
                                updateId = {index}
                                toBeUpdated= {update} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="todo-update " id='todo-update'>
            <div className="container">
            <Update display = {dis} update={toUpdateArray}/>
            </div>
            </div>
        </>
    );
};

export default Todo;
