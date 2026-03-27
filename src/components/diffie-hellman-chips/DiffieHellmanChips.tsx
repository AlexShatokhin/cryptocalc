import { useState } from "react"
import { Chip } from "./ui/Chip"


interface DiffieHellmanChipsProps {
    onChangeP: (p: number | null) => void;
    onChangeG: (g: number | null) => void;
}

export const DiffieHellmanChips = ({ onChangeP, onChangeG }: DiffieHellmanChipsProps) => {
    const [activeChip, setActiveChip] = useState("0");
    const handleChipChange = (value: string) => {
        setActiveChip(value);
        switch (value) {
            case "0":
                onChangeP(null);
                onChangeG(null);
                break;
            case "1":
                onChangeP(2);
                onChangeG(5);
                break;
            case "2":
                onChangeP(3);
                onChangeG(7);
                break;
            case "3":
                onChangeP(7);
                onChangeG(11);
                break;
        }
    };

    return (
        <div className="flex gap-2 overflow-x-scroll scrollbar-hide snap-x touch-pan-x flex-nowrap">
            <Chip value="0" active={activeChip === "0"} onChange={handleChipChange}>Своё значение</Chip>            
            <Chip value="1" active={activeChip === "1"} onChange={handleChipChange}>p = 2; g = 5;</Chip>
            <Chip value="2" active={activeChip === "2"} onChange={handleChipChange}>p = 3; g = 7;</Chip>
            <Chip value="3" active={activeChip === "3"} onChange={handleChipChange}>p = 7; g = 11;</Chip>
        </div>
    )
}