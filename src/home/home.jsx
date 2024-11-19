import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUrl, generateShortUrlAsync } from '../redux/reducers/reducers';


const Home = () => {
    const dispatch = useDispatch();
    const { url, shortUrl } = useSelector((state) => state.shortUrl);

    const [isModalOpen, setModalOpen] = useState(false);

    const handleInputChange = (e) => {
        dispatch(setUrl(e.target.value));
    };

    const handleGenerateShortUrl = () => {
        dispatch(generateShortUrlAsync(url));

       
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openUrl = () => {
        // setModalOpen(true); // Open the modal after generating the short URL
        window.open(shortUrl, '_blank');
    }

    return (
        <div>
            <h1>Short URL Generator</h1>
            <input
                type="text"
                value={url}
                onChange={handleInputChange}
                placeholder="Enter your URL"
            />
            <button onClick={handleGenerateShortUrl}>Generate Short URL</button>


            <p onClick={openUrl}>{shortUrl}</p>

            {isModalOpen && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.content}>
                        <h2>Preview Short URL</h2>
                        <div style={modalStyles.iframeContainer}>
                            <iframe
                                src={shortUrl}
                                style={modalStyles.iframe}
                                title="Short URL Preview"
                            ></iframe>
                        </div>
                        <button onClick={closeModal} style={modalStyles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Simple inline styles for the modal
const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        textAlign: 'center',
        minWidth: '300px',
    },
};

export default Home;
