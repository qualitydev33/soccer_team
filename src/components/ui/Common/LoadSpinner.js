const LoadingSpinner = () => {
    /**
     * render
     */
    return (
        <>
            <div className="absolute top-0 left-0 w-screen h-screen flex bg-black bg-opacity-20">
                <div className="lds-ripple m-auto"><div></div><div></div></div>
            </div>
        </>
    )
}

export default LoadingSpinner