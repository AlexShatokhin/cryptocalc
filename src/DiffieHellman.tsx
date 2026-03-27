import { ArrowLeft } from "lucide-react"
import { DiffieHellmanChips } from "./components/diffie-hellman-chips/DiffieHellmanChips"
import { useState } from "react";


export const DiffieHellman = () => {
    const [openKeyP, setOpenKeyP] = useState<number | null>(null);
    const [openKeyG, setOpenKeyG] = useState<number | null>(null);

    const handleOpenKeyPChange = (value: number | null) => setOpenKeyP(value)
    const handleOpenKeyGChange = (value: number | null) => setOpenKeyG(value)

    return (
        <section className="px-2">
            <div className="py-4 flex justify-between items-center">
                <div>
                    <ArrowLeft className="cursor-pointer" onClick={() => window.history.back()} />
                </div>
                <h1 className="text-xl font-bold">Алгоритм Диффи-Хеллмана</h1>
                <div></div>
            </div>
            <div>
                <DiffieHellmanChips onChangeP={handleOpenKeyPChange} onChangeG={handleOpenKeyGChange} />
                <div>
                    <p>p = {openKeyP}</p>
                    <p>g = {openKeyG}</p>
                </div>
            </div>
        </section>
    )
}