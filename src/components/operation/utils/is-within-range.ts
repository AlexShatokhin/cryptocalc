export const isWithinRange = (num: number, leftBorder: number, rightBorder: number, strict: boolean = false) => {
        if(strict)
            return num > leftBorder && num < rightBorder
        else 
            return num >= leftBorder && num <= rightBorder
    }
