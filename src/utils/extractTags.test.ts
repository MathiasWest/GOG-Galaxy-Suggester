import { game } from "../types/game";
import extractTags from "./extractTags";

describe('extractTags', () => {
    const createGame = (overrides: Partial<game> = {}): game => ({
        title: 'Test Game',
        backgroundImage: '',
        criticsScore: null,
        developers: [],
        gameMinutes: 0,
        genres: [],
        publishers: [],
        releaseDate: null,
        releaseKeys: ['abc_abc'],
        squareIcon: '',
        summary: '',
        themes: [],
        verticalCover: '',
        ...overrides,
    });

    it('should return empty arrays for empty games list', () => {
        const tags = extractTags([]);

        expect(tags.genres).toEqual([]);
        expect(tags.themes).toEqual([]);
        expect(tags.developers).toEqual([]);
        expect(tags.publishers).toEqual([]);
    });

    it('should extract unique sorted genres from games', () => {
        const games: game[] = [
            createGame({ genres: ['RPG', 'Action'] }),
            createGame({ genres: ['Strategy', 'RPG'] }),
            createGame({ genres: ['Puzzle'] }),
        ];

        const tags = extractTags(games);

        expect(tags.genres).toEqual(['Action', 'Puzzle', 'RPG', 'Strategy']);
    });

    it('should extract unique sorted themes from games', () => {
        const games: game[] = [
            createGame({ themes: ['Sci-Fi', 'Action'] }),
            createGame({ themes: ['Fantasy', 'Action'] }),
        ];

        const tags = extractTags(games);

        expect(tags.themes).toEqual(['Action', 'Fantasy', 'Sci-Fi']);
    });

    it('should extract unique sorted developers from games', () => {
        const games: game[] = [
            createGame({ developers: ['CD Projekt Red'] }),
            createGame({ developers: ['BioWare', 'CD Projekt Red'] }),
        ];

        const tags = extractTags(games);

        expect(tags.developers).toEqual(['BioWare', 'CD Projekt Red']);
    });

    it('should extract unique sorted publishers from games', () => {
        const games: game[] = [
            createGame({ publishers: ['EA', 'Valve'] }),
            createGame({ publishers: ['Valve', 'Ubisoft'] }),
        ];

        const tags = extractTags(games);

        expect(tags.publishers).toEqual(['EA', 'Ubisoft', 'Valve']);
    });

    it('should handle games with no tags', () => {
        const games: game[] = [
            createGame(),
            createGame(),
        ];

        const tags = extractTags(games);

        expect(tags.genres).toEqual([]);
        expect(tags.themes).toEqual([]);
        expect(tags.developers).toEqual([]);
        expect(tags.publishers).toEqual([]);
    });
});
