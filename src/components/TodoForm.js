import React, {useState, useEffect} from 'react';
import {
    TextField,
    Button,
    InputAdornment,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


const TodoForm = (props) => {
    const {addTodo} = props;
    const [title, setTitle] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title) return;
        addTodo(title);
        setTitle('');
    }

    const handleChange = (event) => {
        setTitle(event.target.value)
    }



    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', width: '60%', margin: 'auto', marginTop: 15 }}>
            <TextField
                value={title}
                label='Task title'
                onChange={handleChange}
                variant='outlined'
                InputProps={{
                   startAdornment: (
                       <InputAdornment>
                        <AddIcon />
                       </InputAdornment>
                   )
                }}
            />
        </form>
    )
}

export default TodoForm;