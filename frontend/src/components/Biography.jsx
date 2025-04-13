// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from 'prop-types';

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Our platform is designed to bridge the gap between patients and healthcare professionals. With a simple and intuitive interface, patients can schedule appointments, view doctor profiles, and access their medical history securely.
          </p>
          <p>
            Doctors can manage their schedules and keep track of patient consultations, while administrators ensure smooth coordination across departments. We believe technology can empower better health outcomes &mdash; and we&#39;re building just that.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
            Coding is not just what we do, it&#39;s what we love. This project reflects our commitment to using code to solve real-world problems and make healthcare more accessible and efficient.
          </p>
          <p>Stay tuned, we&#39;re just getting started!</p>
        </div>
      </div>
    </>
  );
};

// ✅ PropTypes validation
Biography.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};


export default Biography;

