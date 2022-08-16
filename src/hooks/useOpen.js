import { useState } from 'react'

export default function useOpen()
{
    const [ isOpen, setIsOpen ] = useState(false);

    const handleOpen = () => setIsOpen(!isOpen);

    return [
        isOpen, 
        handleOpen
    ]
}