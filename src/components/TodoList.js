import React, {useState} from 'react';
import {makeStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    TablePagination
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from './Header';
import TodoForm from './TodoForm'; 
import DoneIcon from '@material-ui/icons/Done';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles({
    table: {
        width: '60%',
        margin: 'auto',
        marginTop: 20,
    }
})

const theme = createMuiTheme({
    palette: {
        primary: green,
    }
})


const TodoList = () => {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [todoList, setTodoList] = useState([]);

    const renderNoTasksBox = () => {
        return (
            <div style={{marginTop: 15}}>
                <Alert style={{  width: '60%', margin: 'auto' }} severity='info'>
                    You have not added tasks yet!
                </Alert>
            </div>        
            )
    }

    const markTodo = index => {
        const newTodos = [...todoList];
        newTodos[index].isDone = !newTodos[index].isDone;
        setTodoList(newTodos);
    }

    const addTodo = (title) => {
        const newTodos = [...todoList, {title}]
        setTodoList(newTodos);
    }

    const removeTodo = index => {
        const newTodos = [...todoList];

        newTodos.splice(index, 1);
        setTodoList(newTodos);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const renderTodos = () => {
        return(
            <Paper>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todoList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((todo, index) => (
                                <TableRow key={index} index={index}>
                                    <TableCell component='th' scope='row'>
                                        <span style={{ textDecoration: todo.isDone ? 'line-through' : '' }}>
                                            {todo.title}
                                        </span>
                                    </TableCell>
                                    <TableCell align='right' style={{ paddingLeft: 195 }}>
                                        <ThemeProvider theme={theme}>
                                            <Button onClick={() => markTodo(index)} color='primary' variant='outlined' startIcon={<DoneIcon />}>
                                                {
                                                    todo.isDone ? 
                                                    <span>Unmark</span> :
                                                    <span>Mark</span>
                                                }
                                            </Button>
                                        </ThemeProvider>
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Button onClick={() => removeTodo(index)} variant='outlined' startIcon={<DeleteIcon />} color='secondary'>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination 
                    rowsPerPageOptions={[5, 10, 20]}
                    component='div'
                    count={todoList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            
        )
    }

    return (
        <div>
            <Header todoNumber={todoList.length} />
            <TodoForm addTodo={addTodo} />
            {
                todoList.length > 0 ?
                renderTodos() :
                renderNoTasksBox()
            }
        </div>
    )
}

export default TodoList;