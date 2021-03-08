import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '60%',
        margin: 'auto'
    },
    title: {

    }
})

const Header = (props) => {
    const {todoNumber} = props;
    const classes = useStyles()

    return(
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='h4'>
                    ToDo List
                </Typography>
                <Typography variant='body2' component='p'>
                    You have {todoNumber} tasks added.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Header;