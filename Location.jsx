import React from 'react';
import './Location.css'; // Import the CSS file for styling

const Location = () => {
    return (
        <div className="location-page">
            <h1 className="location-title">Our Location</h1>
            <p className="location-description">
                Visit us at our cozy cafe where freshly roasted coffee meets delicious pastries.
            </p>
            <div className="location-map">
                <iframe
                    title="ROST Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.1566317544834!2d121.18189987669919!3d16.518188286621257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33904138dfbeec03%3A0x46e0eb8b4bc7f389!2s60%20Binacao%20St%2C%20Solano%2C%20Nueva%20Vizcaya!5e0!3m2!1sen!2sph!4v1748448717520!5m2!1sen!2sph" 
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Location;