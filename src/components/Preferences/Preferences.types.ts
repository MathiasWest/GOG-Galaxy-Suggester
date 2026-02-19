import { game } from "../../types/game";
import { preferences } from "../../types/preferences";

export interface preferencesProps {
    preferences: preferences;
    allGames: game[];
    onPreferencesChanged: (preferences: preferences) => void;
}
