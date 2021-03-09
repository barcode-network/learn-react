import React from "react";
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useState } from "react";

export default function TaskListItem({ task, id }) {
    const [editTableRow, setEditTableRow] = useState(-1)
    const [editTableField, setEditTableField] = useState('')
    const [input, setInput] = useState('')
    var db = firebase.firestore();

    const toggleEditMode = (taskID) => {
        setEditTableRow(taskID)
    }

    const handleEditFieldChange = (e) => {
        const { value } = e.target
        setInput(value)
        setEditTableField(value)
    }


    function handleRemove() {
        db.collection("tasks").doc(id).delete();
    }

    function handleEdit() {   
        db.collection("tasks").doc(id).update({task: input}, {merge: true})
        setEditTableRow(-1)
    }

    return (
        <div style={{ display: "flex" }}>

            <>

                <li key={id}
                    className='my-5 flex flex-row justify-evenly'>

                    <input
                        type='text'
                        defaultValue={task}
                        disabled={id !== editTableRow}
                        onChange={handleEditFieldChange}
                    />

                    <div>
                        {id !== editTableRow ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => toggleEditMode(id)}>Edit</button>
                                <button onClick={handleRemove}>Delete</button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={handleEdit}>Save</button>
                        )}

                    </div>
                </li>


            </>
        </div>
    );
}