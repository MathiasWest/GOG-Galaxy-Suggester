import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { tagFilterProps } from './TagFilter.types';
import useStyles from './TagFilter.styles';

const TagFilter = ({
    label,
    availableTags,
    selectedTags,
    onChange,
}: tagFilterProps) => {
    const classes = useStyles();

    return (
        <Autocomplete<string, true, false, false>
            multiple
            className={classes.root}
            options={availableTags}
            value={selectedTags}
            onChange={(_event: any, newValue: string[]) => {
                onChange(newValue);
            }}
            ChipProps={{ className: classes.chip }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label={label}
                    placeholder={selectedTags.length === 0 ? `Search ${label.toLowerCase()}...` : ''}
                />
            )}
            data-testid={`tagFilter-${label}`}
        />
    );
};

export default TagFilter;
