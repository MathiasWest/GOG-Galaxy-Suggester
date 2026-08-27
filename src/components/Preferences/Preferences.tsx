import React, { useMemo } from 'react';
import { Container, Checkbox, Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { preferencesProps } from './Preferences.types';
import useStyles from './Preferences.styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import InputAdornment from '@material-ui/core/InputAdornment';
import { minYear, maxYear, maxGameMinutes } from '../../types/preferences';
import { minutesToHumanTime } from '../../utils/humanTime';
import { Divider } from '@material-ui/core';
import Bias from './components/Bias';
import TagFilter from '../TagFilter/TagFilter';
import extractTags from '../../utils/extractTags';


const Preferences = ({
    preferences,
    allGames,
    onPreferencesChanged,
}: preferencesProps) => {

    const classes = useStyles();

    const availableTags = useMemo(() => extractTags(allGames || []), [allGames]);

    const handleChange = (event: { target: any; }) => {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        const newPreferences = { ...preferences };
        const newFilters: any = { ...preferences.filters };
        newFilters[name] = value;
        newPreferences.filters = newFilters;
        onPreferencesChanged(newPreferences);
    }

    const handleSliderChange = (event: any, newValue: number | number[], name: string) => {
        const newPreferences = { ...preferences };
        const newFilters: any = { ...preferences.filters };
        newFilters[name] = newValue as number[];
        newPreferences.filters = newFilters;
        onPreferencesChanged(newPreferences);
    };

    const handleTagChange = (name: string, selected: string[]) => {
        const newPreferences = { ...preferences };
        const newFilters: any = { ...preferences.filters };
        newFilters[name] = selected;
        newPreferences.filters = newFilters;
        onPreferencesChanged(newPreferences);
    };

    const releaseYearValueLabelFormat = (value: number) => {
        if (value === minYear) {
            return `≤${value}`;
        }
        if (value === maxYear) {
            return `≥${value}`;
        }
        return value.toString();
    }

    const gameMinutesValueLabelFormat = (value: number) => {
        const humanTime = minutesToHumanTime(value);
        if (value === maxGameMinutes) {
            return `≥${humanTime}`;
        }
        return humanTime;
    }

    return (
        <Container>
            <Typography variant='h4' className={classes.header}>Here you can configure the mighty recommendation engine</Typography>

            <Grid container>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant='h5'>Filters</Typography>
                </Grid>
                <Grid item xs={12}><Typography variant='h6'>Game Time:</Typography></Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='unplayed'
                            checked={preferences.filters.unplayed}
                            onChange={handleChange} />
                    }
                        label='Unplayed games'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='played'
                            checked={preferences.filters.played}
                            onChange={handleChange} />
                    }
                        label='Played games'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography id="gameminutes-slider" gutterBottom>Time played</Typography>
                    <Slider
                        name='gameMinutes'
                        value={preferences.filters.gameMinutes}
                        min={0}
                        max={maxGameMinutes}
                        onChange={(event: any, value: number | number[]) => {
                            handleSliderChange(event, value, 'gameMinutes');
                        }}
                        disabled={!preferences.filters.played}
                        valueLabelDisplay="auto"
                        valueLabelFormat={gameMinutesValueLabelFormat}
                        aria-labelledby="game-minutes-range"
                        data-testid="gameMinutesRange"
                    />
                    <TextField
                        label="Min minutes"
                        type="number"
                        className={classes.minutesInput}
                        value={preferences.filters.gameMinutes[0]}
                        onChange={(event: any) => {
                            const newFilters = { ...preferences.filters };
                            newFilters.gameMinutes[0] = event.target.value;
                            onPreferencesChanged({ ...preferences, filters: newFilters });
                        }}
                        disabled={!preferences.filters.played}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: 0,
                            max: maxGameMinutes,
                        }}
                        data-testid="minMinutes"
                    />
                    <TextField
                        label="Max minutes"
                        type="number"
                        className={classes.minutesInput}
                        value={preferences.filters.gameMinutes[1]}
                        onChange={(event: any) => {
                            let value = event.target.value;
                            if (value > maxGameMinutes) {
                                value = maxGameMinutes;
                            }
                            const newFilters = { ...preferences.filters };
                            newFilters.gameMinutes[1] = value;
                            onPreferencesChanged({ ...preferences, filters: newFilters });
                        }}
                        disabled={!preferences.filters.played}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            min: 0,
                            max: maxGameMinutes,
                        }}
                        InputProps={{
                            startAdornment: preferences.filters.gameMinutes[1] === maxGameMinutes ? <InputAdornment position="start">≥</InputAdornment> : <></>,
                        }}
                        data-testid="maxMinutes"
                    />
                </Grid>
                <Grid item xs={12} >
                    <Divider></Divider>
                </Grid>
                <Grid item xs={12} ><Typography variant='h6'>Critics Score:</Typography></Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withoutCriticsScore'
                            checked={preferences.filters.withoutCriticsScore}
                            onChange={handleChange} />
                    }
                        label='No critics score'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withCriticsScore'
                            checked={preferences.filters.withCriticsScore}
                            onChange={handleChange} />
                    }
                        label='Critics score'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography id="score-slider" gutterBottom>Score range</Typography>
                    <Slider
                        name='criticsScore'
                        value={preferences.filters.criticsScore}
                        onChange={(event: any, value: number | number[]) => handleSliderChange(event, value, 'criticsScore')}
                        disabled={!preferences.filters.withCriticsScore}
                        valueLabelDisplay="auto"
                        aria-labelledby="critics-score-range"
                        data-testid="criticsScoreRange"
                    />
                </Grid>
                <Grid item xs={12} >
                    <Divider></Divider>
                </Grid>
                <Grid item xs={12} ><Typography variant='h6'>Release Date:</Typography></Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withoutReleaseDate'
                            checked={preferences.filters.withoutReleaseDate}
                            onChange={handleChange} />
                    }
                        label='No release date'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <FormControlLabel control={
                        <Checkbox
                            name='withReleaseDate'
                            checked={preferences.filters.withReleaseDate}
                            onChange={handleChange} />
                    }
                        label='Release date'
                    />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography gutterBottom>Release year</Typography>
                    <Slider
                        name='releaseYear'
                        min={minYear}
                        max={maxYear}
                        value={preferences.filters.releaseYear}
                        onChange={(event: any, value: number | number[]) => handleSliderChange(event, value, 'releaseYear')}
                        disabled={!preferences.filters.withReleaseDate}
                        valueLabelDisplay="auto"
                        valueLabelFormat={releaseYearValueLabelFormat}
                        aria-labelledby="release-year-range"
                        data-testid="releaseYearRange"
                        data-name="releaseYear"
                    />
                </Grid>
                <Grid item xs={12} >
                    <Divider></Divider>
                </Grid>
                <Grid item xs={12} className={classes.header}>
                    <Typography variant='h5'>Tags</Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TagFilter
                        label="Genres"
                        availableTags={availableTags.genres}
                        selectedTags={preferences.filters.selectedGenres}
                        onChange={(selected) => handleTagChange('selectedGenres', selected)}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TagFilter
                        label="Themes"
                        availableTags={availableTags.themes}
                        selectedTags={preferences.filters.selectedThemes}
                        onChange={(selected) => handleTagChange('selectedThemes', selected)}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TagFilter
                        label="Developers"
                        availableTags={availableTags.developers}
                        selectedTags={preferences.filters.selectedDevelopers}
                        onChange={(selected) => handleTagChange('selectedDevelopers', selected)}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TagFilter
                        label="Publishers"
                        availableTags={availableTags.publishers}
                        selectedTags={preferences.filters.selectedPublishers}
                        onChange={(selected) => handleTagChange('selectedPublishers', selected)}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Divider></Divider>
                </Grid>
                <Grid item xs={12} ><Typography variant='h5'>Depending on what you play, pick games that are...</Typography></Grid>
                <Bias
                    headerText="Genre"
                    name="genre"
                    biasValue={preferences.biases.genre}
                    preferences={preferences}
                    onPreferencesChanged={onPreferencesChanged}
                ></Bias>
                <Bias
                    headerText="Theme"
                    name="theme"
                    biasValue={preferences.biases.theme}
                    preferences={preferences}
                    onPreferencesChanged={onPreferencesChanged}
                ></Bias>
                <Bias
                    headerText="Developers"
                    name="developer"
                    biasValue={preferences.biases.developer}
                    preferences={preferences}
                    onPreferencesChanged={onPreferencesChanged}
                ></Bias>
                <Bias
                    headerText="Publishers"
                    name="publisher"
                    biasValue={preferences.biases.publisher}
                    preferences={preferences}
                    onPreferencesChanged={onPreferencesChanged}
                ></Bias>
            </Grid>
        </Container>
    );
}

export default Preferences;
