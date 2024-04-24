import './styles/loading.css'
const Loading = () => {
    return (
        <div className='w-screen h-screen bg-white top-0 left-0 fixed z-50'>
            <div className="page-wrapper">
                <div className="preloader">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading