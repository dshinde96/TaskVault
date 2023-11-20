import React, { useEffect, useState } from "react";
import '../CSS/Todo.css';
let call=true;
const Todo=()=>{
    const [text,settext]=useState('');
    const [arr,setarr]=useState([]);
    let temp1=[];
    const [toggle_btn,set_togle_btn]=useState(true);
    const [edit_index,set_edit_index]=useState(0);
    const handle_add=()=>{

        if(text!='')
        {
            temp1=arr;
            temp1.push(text);
            // console.log(temp);
            setarr(temp1);
        }
        settext('');
        // console.log(arr);
        localStorage.setItem('items',JSON.stringify(temp1));  //will conver setarr to JSON string to store on local storage and store the data as key value pair to arr and data
        // console.log(arr);
    }
    const handle_del=(ele)=>{
        // console.log(ele);
        temp1=arr.filter((item,ind)=>{
            return ind!=ele;
        });
        setarr(temp1);
        console.log(temp1);
        localStorage.setItem('items',JSON.stringify(temp1));
    }
    
    const handle_edit=(index)=>{
        // console.log(arr[index]);
        set_edit_index(index);
        set_togle_btn(false);
        settext(arr[index]);
    }
    const submit_edit=()=>{
        if(text=='')
        {
            handle_del(edit_index);
        }
        else{
            arr[edit_index]=text;
            localStorage.setItem('items',JSON.stringify(arr));
            settext('');
            set_togle_btn(true);
        }
        // console.log(arr);
    }
    useEffect(()=>{
        if(call)
        {
            setarr(JSON.parse(localStorage.getItem('items')));
            call=false;
        }
    })
    return(
        <>
            <div className="main_div">
                <div className="child_div">
                    <figure>
                        <img src="https://th.bing.com/th/id/OIP.Wd2RYDR9xN1IwRXQW4ULTQHaHa?pid=ImgDet&rs=1"/>
                        <figcaption>Add Your List Here</figcaption>
                    </figure>

                    <div className="AddItems">
                        <input type="text" placeholder="✍ Add Items..." value={text} onChange={(e)=>{settext(e.target.value)}} id='input_text'/>
                        {toggle_btn? <i className="fa fa-plus add_btn" title="Add Item" onClick={handle_add}></i>:<i class="fa fa-check add_btn" onClick={submit_edit}></i>}
                    </div>

                    <div className="ShowItems">
                        {
                            arr.map((ele,index)=>{
                                if(ele!=''){
                                    return (
                                    <div className="Item">
                                    <h3>
                                        {ele}
                                        <div className="btns">
                                        <i className="fa fa-trash delete_btn" title="Delete Item"  onClick={()=>{handle_del(index)}}></i>
                                        <i class="fa fa-edit edit_btn" title="edit Item" onClick={()=>handle_edit(index)}></i>
                                        </div>
                                    </h3>
                                    </div>
                                )
                                }
                            })
                        }
                    </div>
                </div>

                <div className="remove_all">
                    {
                        arr.length>1?<button onClick={()=>{
                            temp1=[''];
                            setarr(temp1);
                            localStorage.setItem('items',JSON.stringify(temp1));
                        }}>Delete All
                    <i class="fa fa-trash fa-fade"></i>
                    </button>:<></>
                    }
                </div>
            </div>
        </>
    )
}
export default Todo;