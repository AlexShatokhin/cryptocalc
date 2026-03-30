import { Chip } from "./ui/Chip"

interface DiffieHellmanChipsProps {
    onChangeA: (a: number | null) => void;
    onChangeB: (b: number | null) => void;
    chip: string;
    setActiveChip: (value: string) => void;
    title?: string;
}


const ABOptions = [
    { a: 6, b: 15 },
    { a: 36, b: 58 },
    { a: 321, b: 654 },    
]


export const SecretKeyChips = ({ onChangeA, onChangeB, chip, setActiveChip, title }: DiffieHellmanChipsProps) => {
    const handleChipChange = (value: string) => {
        setActiveChip(value);
        switch (value) {
            case "0":
                onChangeA(null);
                onChangeB(null);
                break;
            case "1":
                onChangeA(ABOptions[0].a);
                onChangeB(ABOptions[0].b);
                break;
            case "2":
                onChangeA(ABOptions[1].a);
                onChangeB(ABOptions[1].b);
                break;
            case "3":
                onChangeA(ABOptions[2].a);
                onChangeB(ABOptions[2].b);
                break;
        }
    };

    return (
        <div>
            {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
            <div className="flex gap-2 overflow-x-scroll scrollbar-hide snap-x touch-pan-x flex-nowrap">
                <Chip value="0" active={chip === "0"} onChange={handleChipChange}>Своё значение</Chip>            
                <Chip value="1" active={chip === "1"} onChange={handleChipChange}>a = {ABOptions[0].a}; b = {ABOptions[0].b};</Chip>
                <Chip value="2" active={chip === "2"} onChange={handleChipChange}>a = {ABOptions[1].a}; b = {ABOptions[1].b};</Chip>
                <Chip value="3" active={chip === "3"} onChange={handleChipChange}>a = {ABOptions[2].a}; b = {ABOptions[2].b};</Chip>
            </div>
        </div>

    )
}