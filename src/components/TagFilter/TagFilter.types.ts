export interface tagFilterProps {
    label: string;
    availableTags: string[];
    selectedTags: string[];
    onChange: (selected: string[]) => void;
}
