import { ArrowLeft } from "lucide-react"
import { DiffieHellmanChips } from "./components/diffie-hellman-chips/DiffieHellmanChips"
import { useEffect, useState } from "react";
import { Input } from "./shared/input";
import { SecretKeyChips } from "./components/diffie-hellman-chips/SecretKeyChips";
import { Button } from "./shared/button";
import { diffieHellman } from "./components/operation/utils/diffie-hellman";
import { isSimple } from "./components/operation/utils/is-simple";
import { isWithinRange } from "./components/operation/utils/is-within-range";
import { toast } from "sonner";

export const DiffieHellman = () => {
    const [openKeyP, setOpenKeyP] = useState<number | null>(null);
    const [openKeyG, setOpenKeyG] = useState<number | null>(null);
    const [secretKeyA, setSecretKeyA] = useState<number | null>(null);
    const [secretKeyB, setSecretKeyB] = useState<number | null>(null);
    const [openKeyActiveChip, setOpenKeyActiveChip] = useState("0");
    const [secretKeyActiveChip, setSecretKeyActiveChip] = useState("0");
    const [errorMessage, setErrorMessage] = useState<string | null>(null)  

    const [result, setResult] = useState<{A: number, B: number, s: number} | null>(null);
    const [animatedResult, setAnimatedResult] = useState<{A: number, B: number, s: number} | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if(typeof errorMessage === "string")
            setTimeout(() => setErrorMessage(null), 5000)
    }, [errorMessage])

    const handleOpenKeyPChange = (value: number | null) => setOpenKeyP(value)
    const handleOpenKeyGChange = (value: number | null) => setOpenKeyG(value)

    const handleSecretKeyAChange = (value: number | null) => setSecretKeyA(value)
    const handleSecretKeyBChange = (value: number | null) => setSecretKeyB(value)

    const handleCalculate = () => {
        if(!(openKeyP && openKeyG && secretKeyA && secretKeyB)){
            toast.error("Не все значения введены!");
            return;
        }

        if(!isSimple(openKeyP)){
            toast.error("Открытый ключ p должен быть простым");
            return;
        }

        if(!isWithinRange(openKeyG, 1, openKeyP, true)){
            toast.error("Открытый ключ g должен быть меньше p (1 < g < p)")
            return;
        }

        if(!isWithinRange(secretKeyA, 1, openKeyP - 2, false)){
            toast.error("Секретный ключ a должен быть меньше p (0 < a < p-1)")
            return;
        } 
        
        if(!isWithinRange(secretKeyB, 1, openKeyP - 2, false)){
            toast.error("Секретный ключ b должен быть меньше p (0 < b < p-1)")
            return;
        }         

        const res = diffieHellman(openKeyP, openKeyG, secretKeyA, secretKeyB);
        if (res) {
            setResult(res); 
            animateResult(res);
        }
    }

    const animateResult = (finalResult: {A: number, B: number, s: number}) => {
        setIsAnimating(true);

        let iterations = 0;
        const maxIterations = 20;

        const interval = setInterval(() => {
            setAnimatedResult({
                A: Math.floor(Math.random() * finalResult.A + 1),
                B: Math.floor(Math.random() * finalResult.B + 1),
                s: Math.floor(Math.random() * finalResult.s + 1),
            });

            iterations++;

            if (iterations >= maxIterations) {
                clearInterval(interval);
                setAnimatedResult(finalResult);
                setIsAnimating(false);
            }
        }, 100);
    };

    const display = isAnimating ? animatedResult : result;

    return (
        <section className="px-2 pb-4">
            <div className="py-4 flex justify-between items-center">
                <div>
                    <ArrowLeft className="cursor-pointer" onClick={() => window.history.back()} />
                </div>
                <h1 className="text-xl font-bold">Алгоритм Диффи-Хеллмана</h1>
                <div></div>
            </div>
            <div>
                <DiffieHellmanChips
                    title="Параметры сервера"
                    chip={openKeyActiveChip}
                    setActiveChip={setOpenKeyActiveChip} 
                    onChangeP={handleOpenKeyPChange} 
                    onChangeG={handleOpenKeyGChange} />
                <div className="text-xl flex gap-2 flex-col mt-2">
                    <p className="h-8">p = {openKeyActiveChip === "0" ? 
                        <Input 
                            className="w-20 text-center"
                            type="text" 
                            placeholder="11" 
                            onChange={(e) => handleOpenKeyPChange(e.target.value ? parseInt(e.target.value) : null)} />
                        : openKeyP}
                    </p>
                    
                    <p className="h-8">g = {openKeyActiveChip === "0" ? 
                        <Input 
                            className="w-20 text-center"
                            type="text" 
                            placeholder="17" 
                            onChange={(e) => handleOpenKeyGChange(e.target.value ? parseInt(e.target.value) : null)} /> : openKeyG}
                    </p>
                </div>
            </div>    
            <div className="mt-6">
                <SecretKeyChips
                    title="Параметры закрытых ключей"
                    chip={secretKeyActiveChip}
                    setActiveChip={setSecretKeyActiveChip} 
                    onChangeA={handleSecretKeyAChange} 
                    onChangeB={handleSecretKeyBChange} />
                <div className="text-xl flex gap-2 flex-col mt-2">
                    <p className="h-8 text-red-400">a = {secretKeyActiveChip === "0" ? 
                        <Input 
                            className="w-20 text-center"
                            type="text" 
                            placeholder="13" 
                            onChange={(e) => handleSecretKeyAChange(e.target.value ? parseInt(e.target.value) : null)} />
                        : secretKeyA}
                    </p>
                    
                    <p className="h-8 text-blue-400">b = {secretKeyActiveChip === "0" ? 
                        <Input 
                            className="w-20 text-center"
                            type="text" 
                            placeholder="19" 
                            onChange={(e) => handleSecretKeyBChange(e.target.value ? parseInt(e.target.value) : null)} /> : secretKeyB}
                    </p>
                </div>  
                <Button disabled={isAnimating} className="mt-6" onClick={handleCalculate}>Вычислить</Button>
                {display && (
                    <div className="mt-6 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-sm">
                        <h2 className="text-lg font-semibold mb-3">
                            Результат
                        </h2>

                        <div className="flex flex-col gap-2 text-base">
                            <div className="flex justify-between">
                                <span className="text-zinc-400">A</span>
                                <span className="font-mono text-green-400">
                                    {display.A}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-zinc-400">B</span>
                                <span className="font-mono text-blue-400">
                                    {display.B}
                                </span>
                            </div>

                            <div className="h-px bg-zinc-800 my-2" />

                            <div className="flex justify-between">
                                <span className="text-zinc-400">Секрет</span>
                                <span className="font-mono text-yellow-400 text-lg">
                                    {display.s}
                                </span>
                            </div>
                        </div>
                    </div>
                )}                
            </div>
        </section>
    )
}