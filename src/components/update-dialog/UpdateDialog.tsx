import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/alert-dialog"
import { useEffect } from "react"

const VERSION = "1.7.0";

interface UpdateDialogProps {
  show: boolean;
  toggleDialog: (val?: boolean) => void;
}

export const UpdateDialog = ({ show, toggleDialog }: UpdateDialogProps) => {
    useEffect(() => {
        const lastVersion = localStorage.getItem("last-version");
        if(lastVersion !== VERSION){
            setTimeout(() => toggleDialog(true), 1000) 
        }
    }, [])

    const handleClose = () => {
        toggleDialog();
        localStorage.setItem("last-version", VERSION);
    }

    return (
    <AlertDialog open={show} onOpenChange={toggleDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Новая версия калькулятора</AlertDialogTitle>
          <AlertDialogDescription className="text-left" asChild>
            <div>
                <span className="block">В новой версии калькулятора:</span> <br />
                <div>
                    <p>Добавлен экспериментальный функционал вывода вычисленного значения под полем ввода.</p>
                    <br />
                    <p>Добавлен раздел "Алгоритмы".</p>
                    <br />
                    <p>В разделе "Алгоритмы" добавлен алгоритм Диффи-Хеллмана.</p>
                </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Понятно</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}