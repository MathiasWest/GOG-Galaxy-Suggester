export interface preferences {
    filters: filters;
    biases: biases;
}

export interface filters {
    played: boolean;
    unplayed: boolean;
    gameMinutes: number[];
    withoutCriticsScore: boolean;
    withCriticsScore: boolean;
    criticsScore: number[];
    withoutReleaseDate: boolean;
    withReleaseDate: boolean;
    releaseYear: number[];
    selectedGenres: string[];
    selectedThemes: string[];
    selectedDevelopers: string[];
    selectedPublishers: string[];
}

export interface biases {
    changed: boolean;
    genre: bias;
    theme: bias;
    developer: bias;
    publisher: bias;
}

export enum bias {
    ignore,
    same,
    different,
}

export const minYear = 1980;
export const maxYear = new Date().getFullYear();
export const maxGameMinutes = 1000 * 60;

export const allowAllFilter: filters = {
    played: true,
    unplayed: true,
    gameMinutes: [0, maxGameMinutes],
    withoutCriticsScore: true,
    withCriticsScore: true,
    criticsScore: [0, 100],
    withoutReleaseDate: true,
    withReleaseDate: true,
    releaseYear: [minYear, maxYear],
    selectedGenres: [],
    selectedThemes: [],
    selectedDevelopers: [],
    selectedPublishers: [],
};

export const ignoreAllBias: biases = {
    changed: false,
    genre: bias.ignore,
    theme: bias.ignore,
    developer: bias.ignore,
    publisher: bias.ignore,
};
