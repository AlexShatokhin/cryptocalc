import { useEffect, useMemo, useState, type ChangeEvent } from "react"
import { Input } from "../../shared/input"
import { getDividers } from "./utils/get-dividers"
import { Textarea } from "@/shared/textarea"
import { Parser } from "expr-eval"


interface OperationWrapperProps {
    firstDigit: number | string
    secondDigit: number | string
    modulo: number | string
    setFirstDigit: (value: number | string) => void
    setSecondDigit: (value: number | string) => void
    setModulo: (value: number | string) => void
    result: number | null | string
    setResult: (value: number | string) => void
    calculate: (firstDigit: number | string, secondDigit: number | string, modulo: number | string) => number | null | string,

    showDividers?: boolean
    showPower?: boolean
    separator?: string
}

const parser = new Parser();


export const OperationWrapper = (props: OperationWrapperProps) => {
    const [dividers, setDividers] = useState<number[] | null>(null);
    const [parsedFirstDigit, setParsedFirstDigit] = useState<number | null>(null);
    const [parsedSecondDigit, setParsedSecondDigit] = useState<number | null>(null);
    const [parsedModulo, setParsedModulo] = useState<number | null>(null);
    const { firstDigit, secondDigit, modulo, setFirstDigit, setSecondDigit, setModulo, result, setResult, calculate, showDividers = true, showPower = true, separator = " % " } = props;
    const textSizes = useMemo(() => ({
        normal: "text-5xl",
        small: "text-4xl px-1",
        smaller: "text-3xl px-1",
        very_small: "text-2xl px-1",
        extra_small: "text-xl px-1"
    }), [])

    useEffect(() => {

        try {
            try{ parser.evaluate(firstDigit.toString()); } catch { setParsedFirstDigit(null); return; }
            try{ parser.evaluate(secondDigit.toString().length > 0 ? secondDigit.toString() : "1"); } catch { setParsedSecondDigit(null); return; }
            try{ parser.evaluate(modulo.toString()); } catch { setParsedModulo(null); return; }

            const parsedFirstDigit = parser.evaluate(firstDigit.toString());
            const parsedSecondDigit = parser.evaluate(secondDigit.toString().length > 0 ? secondDigit.toString() : "1");
            const parsedModulo = parser.evaluate(modulo.toString());

            setParsedFirstDigit(parsedFirstDigit);
            setParsedSecondDigit(parsedSecondDigit);
            setParsedModulo(parsedModulo);

            const calculatedResult = calculate(parsedFirstDigit, parsedSecondDigit, parsedModulo) || "";
            setResult(calculatedResult);
        } catch (error) { }
    }, [firstDigit, secondDigit, modulo])

    useEffect(() => {
        setDividers(result ? getDividers(result) : null);
    }, [result])

    const getTextSize = (value: string) => {
        if(value.length <= 3)
            return textSizes.normal;
        else if(value.length <= 6)
            return textSizes.small;
        else if(value.length <= 7)
            return textSizes.smaller;
        else if(value.length <= 9)
            return textSizes.very_small;
    }

    const getDividersHandler = () => {
        setDividers(getDividers(result));
    }

    const handleChangeValue = (value : ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, callback: (value: number | string) => void) => {
        const intValue = (value.target.value.replace(/[^\d\+\-\*]/g, ''));
        callback(intValue);
    }

    return (
        <section className="p-4 flex flex-col items-center gap-4">
            <div className="flex items-center content-center">
                <div className="flex content-center">
                    <div className="flex flex-col items-center min-h-20 gap-2">
                        <Textarea 
                            value={firstDigit}
                            onFocus={(ev) => ev.target.select()}
                            onChange={(ev) => handleChangeValue(ev, setFirstDigit)}
                            placeholder="17" className={`px-2 w-32 h-18 text-center ${getTextSize(firstDigit.toString())} placeholder:text-gray-300/50`}/>
                        <span className="h-1 text-foreground">{+firstDigit !== parsedFirstDigit ? parsedFirstDigit : null}</span>
                    </div>
                    <div className="flex flex-col items-center min-h-14 gap-0.5 -mt-2">
                        {showPower && <Input 
                            value={secondDigit}
                            onFocus={(ev) => ev.target.select()}
                            onChange={(ev) => handleChangeValue(ev, setSecondDigit)}
                            placeholder="1" className="ml-1 text-xl w-12 h-12 text-center p-0 placeholder:text-gray-300/50" />
                        }
                        <span className="h-1 text-foreground">{+secondDigit !== parsedSecondDigit ? parsedSecondDigit : null}</span>
                    </div>

                </div>
                <span className="text-2xl ml-2 mr-4">{separator}</span>
                <div className="flex flex-col items-center min-h-20 gap-2">
                    <Textarea 
                        value={modulo}
                        onFocus={(ev) => ev.target.select()}
                        onChange={(ev) => handleChangeValue(ev, setModulo)} 
                        placeholder="13" className={`px-2 w-32 h-18 text-center ${getTextSize(modulo.toString())} placeholder:text-gray-300/50`} />
                    <span className="h-1 text-foreground">{+modulo !== parsedModulo ? parsedModulo : null}</span>
                </div>
            </div>
            <div onClick={getDividersHandler} className="font-bold text-6xl" data-testid="result">{result}</div>
            {dividers && showDividers && <div className="text-sm">{dividers.length === 1 ? "Это простое число" : dividers.join(" × ")}</div>}
        </section>
    )
}