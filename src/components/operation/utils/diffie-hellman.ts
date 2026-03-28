import { isValuesValid } from "./is-values-valid"
import { calculate as modExp } from "./mod-exponentiation";


export const diffieHellman = (p : number | any, g: number | any, a: number | any, b: number | any) => {
    if(!isValuesValid(p, g, a, b)) return null;

    p = +p;
    g = +g;
    a = +a;
    b = +b;

    let A = modExp(g, a, p);
    if(A === null)
        return null;

    let B = modExp(g, b, p);
    if(B === null)
        return null;
    let s = modExp(A, b, p);
    if(s === null)
        return null


    if(s === modExp(B, a, p))
        return {A, B, s}
    else 
        return null;

}