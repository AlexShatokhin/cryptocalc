import { Chip } from "./ui/Chip"

interface DiffieHellmanChipsProps {
    onChangeP: (p: number | null) => void;
    onChangeG: (g: number | null) => void;
    chip: string;
    setActiveChip: (value: string) => void;
    title?: string;
}


const PGOptions = [
    { p: 2, g: 5 },
    { p: 3, g: 7 },
    { p: 7, g: 11 },
]


export const DiffieHellmanChips = ({ onChangeP, onChangeG, chip, setActiveChip, title }: DiffieHellmanChipsProps) => {
    const handleChipChange = (value: string) => {
        setActiveChip(value);
        switch (value) {
            case "0":
                onChangeP(null);
                onChangeG(null);
                break;
            case "1":
                onChangeP(PGOptions[0].p);
                onChangeG(PGOptions[0].g);
                break;
            case "2":
                onChangeP(PGOptions[1].p);
                onChangeG(PGOptions[1].g);
                break;
            case "3":
                onChangeP(PGOptions[2].p);
                onChangeG(PGOptions[2].g);
                break;
        }
    };

    return (
        <div>
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            <div className="flex gap-2 overflow-x-scroll scrollbar-hide snap-x touch-pan-x flex-nowrap">
                <Chip value="0" active={chip === "0"} onChange={handleChipChange}>Своё значение</Chip>            
                <Chip value="1" active={chip === "1"} onChange={handleChipChange}>p = {PGOptions[0].p}; g = {PGOptions[0].g};</Chip>
                <Chip value="2" active={chip === "2"} onChange={handleChipChange}>p = {PGOptions[1].p}; g = {PGOptions[1].g};</Chip>
                <Chip value="3" active={chip === "3"} onChange={handleChipChange}>p = {PGOptions[2].p}; g = {PGOptions[2].g};</Chip>
            </div>
        </div>

    )
}