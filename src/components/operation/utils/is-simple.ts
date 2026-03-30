import { getDividers } from "./get-dividers";

export const isSimple = (num: number) => getDividers(num)?.length === 1;