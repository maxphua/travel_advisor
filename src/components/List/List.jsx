import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';


const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);  // element references // see video on 1:34:50

    //console.log({ childClicked });  // console log object give more info

    // to parse the places into list.js when clicked on map icon
    useEffect( () => {
        const refs = Array(places?.length).fill().map( (_, i) => elRefs[i] || createRef());  // show the place else create new
        setElRefs(refs);
    }, [places]);
    

    return (
        <div className={classes.container}>
            <Typography variant='h4'>Restaurants, Hotels and attraction around you</Typography>
            {isLoading?(
                <div className={classes.loading}>
                    <CircularProgress size='5rem' />
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={ type } onChange={ (e) => setType(e.target.value)}>
                    <MenuItem value='restaurants'>Restaurants</MenuItem>
                    <MenuItem value='hotels'>Hotels</MenuItem>
                    <MenuItem value='attractions'>Attractions</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select value={ rating } onChange={ (e) => setRating(e.target.value)}>
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={3}>Above 3.0</MenuItem>
                    <MenuItem value={4}>Above 4.0</MenuItem>
                    <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails 
                            place={place} 
                            selected={Number(childClicked)=== i}   // if the click is equal to the index, scroll to the selected place
                            refProp={elRefs[i]}
                        />
                    </Grid>
                ))}
            </Grid>
            </>
            )}
        </div>
    )
}

export default List;