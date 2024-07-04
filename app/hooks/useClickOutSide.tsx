import { useEffect, useRef } from 'react';

function useClickOutside(close: () => void) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const element = ref.current;
            if (element && !element.contains(event.target as Node)) {
                close()
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [close]);
    return ref;
}
export default useClickOutside