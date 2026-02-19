import { game } from "../types/game";

export interface availableTags {
    genres: string[];
    themes: string[];
    developers: string[];
    publishers: string[];
}

const extractTags = (games: game[]): availableTags => {
    const genresSet = new Set<string>();
    const themesSet = new Set<string>();
    const developersSet = new Set<string>();
    const publishersSet = new Set<string>();

    games.forEach(game => {
        game.genres.forEach(g => genresSet.add(g));
        game.themes.forEach(t => themesSet.add(t));
        game.developers.forEach(d => developersSet.add(d));
        game.publishers.forEach(p => publishersSet.add(p));
    });

    return {
        genres: Array.from(genresSet).sort(),
        themes: Array.from(themesSet).sort(),
        developers: Array.from(developersSet).sort(),
        publishers: Array.from(publishersSet).sort(),
    };
};

export default extractTags;
