
const HOC = (Component: React.ComponentType<any>) => {
    const personInfo = {
        name: 'Mahmoud',
        age: '22'
    }
    return () => <Component value={personInfo} /> as any
}

export default HOC