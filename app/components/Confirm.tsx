import React from 'react'

interface EmailTemplateProps {
    message: string;
}

const Confirm: React.FC<Readonly<EmailTemplateProps>> = ({ message }) => {
    return (
        <div className='text-left'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: "100svh", }}>
                <div >
                    <div style={{ color: 'black' }}>
                        <div>
                            Memorizing Quran
                        </div>
                        <div style={{ display: 'block', margin: "30px 0px" }}>
                            Hi there, welcome to the memorization Quran platform.
                        </div>
                        <div style={{ display: 'block', margin: "30px 0px" }}>
                            Here is your code : <strong style={{ fontSize: '20px', fontWeight: '500px' }}> {message}</strong>
                        </div>
                        <div style={{ display: 'block', margin: "30px 0px 0px 0px" }}>
                            <a
                                style={{ display: 'block', padding: '10px 20px', borderRadius: '10px', background: '#72DDDD', color: "white", width: "fit-content" }}
                                href="http://localhost:3000">Click to confirm</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirm