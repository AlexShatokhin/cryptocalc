import { useState } from 'react'
import { Header } from './Header'
import { Operation } from './types/Operation'
import { ModExponentiation } from './components/operation/ui/ModExponentiation'
import { ModInverse } from './components/operation/ui/ModInverse'
import { GCD } from './components/operation/ui/GCD'
import { UpdateDialog } from './components/update-dialog/UpdateDialog'
import { Link } from 'wouter'

export const CryptoCalc = () => {
      const [operation, setOperation] = useState<Operation>(Operation.ModExponentiation)
      const [isShowUpdateDialog, setIsShowUpdateDialog] = useState(false);
    
      return (
        <section className='relative h-screen px-2'>
            <UpdateDialog show={isShowUpdateDialog} toggleDialog={(val) => setIsShowUpdateDialog(typeof val === 'boolean' ? val : !isShowUpdateDialog)} />
            <Header
              toggleDialog={() => setIsShowUpdateDialog(pr => !pr)}
              setValue={setOperation} 
              value={operation}/>
              
            {operation === Operation.ModExponentiation && <ModExponentiation />}
            {operation === Operation.ModInverse && <ModInverse />}
            {operation === Operation.GCD && <GCD />}

            <div className='absolute bottom-4'>
                <div>Алгоритмы:</div>
                <div className='my-2'>
                    <Link to="/diffie-hellman" className="text-foreground bg-primary/20 p-2 px-4 rounded-full text-sm">
                        Диффи-Хеллман
                    </Link>
                </div>

            </div>
        </section>
      )
}