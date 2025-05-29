import React from 'react';
import Slider from 'react-slick'; // Import React Slick
import './About.css'; // Import the CSS file for styling
import 'slick-carousel/slick/slick.css'; // Import Slick CSS
import 'slick-carousel/slick/slick-theme.css'; // Import Slick Theme CSS
import aboutImage1 from '../img/about1.jpg'; // Replace with the correct path to your first image
import aboutImage2 from '../img/about2.jpg'; // Replace with the correct path to your second image
import about from '../img/about.jpg'; // Replace with the correct path to your main image
// Custom Arrow Components
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: '#4a2c2a', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: 'block', background: '#4a2c2a', borderRadius: '50%' }}
            onClick={onClick}
        />
    );
};

const About = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />, // Add custom next arrow
        prevArrow: <PrevArrow />, // Add custom previous arrow
    };

    return (
        <div className="about-page">
            <div className="about-container">
                {/* Left Side: Carousel */}
                <div className="about-carousel">
                    <Slider {...settings}>
                    <div>
                            <img src={about} alt="About ROST" className="carousel-image" />
                        </div>
                        <div>
                            <img src={aboutImage1} alt="About ROST 1" className="carousel-image" />
                        </div>
                        <div>
                            <img src={aboutImage2} alt="About ROST 2" className="carousel-image" />
                        </div>
                    </Slider>
                </div>
                {/* Right Side: Text */}
                <div className="about-text">
                    <h1>About ROST</h1>
                    <p>
                        Welcome to ROST, where passion for freshly roasted coffee meets the art of baking. 
                        At ROST, we believe in creating a warm and inviting space where our customers can 
                        enjoy the finest coffee beans, freshly brewed to perfection, alongside a selection 
                        of artisanal bread and pastries. Our mission is to bring people together over 
                        exceptional flavors and unforgettable experiences.
                    </p>
                    <p>
                        Whether you're here for a quick coffee break, a leisurely breakfast, or to pick up 
                        your favorite baked goods, ROST is dedicated to providing you with the highest 
                        quality products and service. Thank you for making us a part of your day!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;