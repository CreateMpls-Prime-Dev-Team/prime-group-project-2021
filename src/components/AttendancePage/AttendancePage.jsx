import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory, useParams } from 'react-router';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { 
    Typography, 
    Select, 
    Container, 
    Box, 
    InputLabel, 
    MenuItem, 
    FormControl, 
    Checkbox, 
    Button, 
    TextField,
    Paper 
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function AttendancePage() {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type:'FETCH_OCCURRENCE', payload: {id} });
        dispatch({ type: 'FETCH_STUDENT_ATTENDANCE', payload: {id}})
    }, [id]);
    

    //reducer state
    const occurrence = useSelector(store => store.occurrenceToEdit);
    const currentAttendance = useSelector(store => store.occurrenceAttendance);
    const students = useSelector(store => store.occurrenceStudents)

    const handleChange = (event) => {
        dispatch({ 
            type: 'SET_OCCURRENCE_TO_EDIT', 
            payload: { ...occurrence, [event.target.name]:event.target.value}
        });
    };

    const handleDateChange = (date) => {
        dispatch({ 
            type: 'SET_OCCURRENCE_TO_EDIT', 
            payload: { ...occurrence, at_date: date}
        });
    };

    const toggleAttendance = (occurrenceId, studentId) => {
        dispatch({ type: 'ADD_ATTENDANCE', payload: { studentId, occurrenceId }})
        
    }
    
    //local state for dialog box
    const [open, setOpen] = useState(false);


    const submitAttendance = () => {
        dispatch({ 
            type: 'SAVE_OCCURRENCE',
            payload: { 
                ...occurrence,
                history
            }
        });
    };

    const cancelSubmitAttendance = () => {
        history.push('/teacher');
    }
    
    //function for handling opening/closing dialog box
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    

    return (
        <>
        <Container sx={{ width: 370 }}>
            <img src="design_a.png" width="150" height="105"/>
            {/* HEADER - will need to GET this from DB */}
            <Typography variant="h4" align="left" sx={{ marginLeft: 1 }}>{occurrence.name}</Typography>
            <Typography variant="h5" align="left" sx={{ marginLeft: 1, marginBottom: 3 }}>{occurrence.location}</Typography>
        </Container>
        <center><Container>
                <Paper  elevation={24} sx={{ width: 350, marginBottom: 2, paddingTop: 2, paddingBottom: 2 }}>
                    {Object.keys(occurrence).length > 0 && 
                        <>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={occurrence.at_date}
                                    onChange={(newDate) => { handleDateChange(newDate); }} // revisit
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <FormControl sx={{ m: 1, width: 200, marginTop: 1 }}>
                                <InputLabel>Duration (min)</InputLabel>
                                <Select
                                    name="duration"
                                    value={occurrence.duration}
                                    autoWidth
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                    <MenuItem value={45}>45</MenuItem>
                                    <MenuItem value={60}>60</MenuItem>
                                    <MenuItem value={75}>75</MenuItem>
                                    <MenuItem value={90}>90</MenuItem>
                                    <MenuItem value={105}>105</MenuItem>
                                    <MenuItem value={120}>120</MenuItem>
                                    <MenuItem value={180}>180</MenuItem>
                                    <MenuItem value={240}>240</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, width: 200, marginTop: 1 }}>
                                <InputLabel>Volunteers</InputLabel>
                                <Select
                                    name="volunteers"
                                    value={occurrence.volunteers}
                                    autoWidth
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={6}>6</MenuItem>
                                    <MenuItem value={7}>7</MenuItem>
                                    <MenuItem value={8}>8</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    }
                </Paper>
                <Paper elevation={24} sx={{ width: 350, marginBottom: 2 }}>
                    <Typography variant="h6" sx={{ border: 3, borderColor: 'grey.500', backgroundColor: "#9acde3", marginBottom: 1, padding: 1 }}>CLASS LIST</Typography>
                        {Object.keys(students).length > 0 &&
                            students.map((student) => (
                            <div key={student.id}>
                                <Button
                                    variant={currentAttendance.includes(student.id) ? "contained": "text"}
                                    sx={{margin: 1}}
                                    onClick={()=> toggleAttendance(id, student.id)}
                                >
                                    {student.first_name} {student.last_name}
                                </Button>
                            </div>
                        ))}
                        
                    
                    
                </Paper>
            </Container>

            {/* Submit and Cancel buttons */}
            <div>
                <Button variant="outlined" size="large" onClick={cancelSubmitAttendance} sx={{ margin: 2 }}>CANCEL</Button>
                <Button variant="contained" size="large" onClick={handleClickOpen} sx={{ margin: 2 }}>SUBMIT</Button>
                {/* Dialog confirming submission of attendance */}
                <Dialog
                    open={open}
                    onClose={handleClose}>
                    <DialogTitle>{"Ready to submit attendance?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText></DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={submitAttendance} autoFocus>Submit</Button>
                        </DialogActions>
                </Dialog>
            </div>
        </center>
        </>
    )
}

export default AttendancePage;