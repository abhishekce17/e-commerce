"use client"
import React, { useState } from 'react';
import styles from '@/Styles/HelpAndFAQ.module.css';

const AboutUs = () => {
  const [companyInfo, setCompanyInfo] = useState('');
  const [submittedInfo, setSubmittedInfo] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handlePreview = () => {
    setSubmittedInfo(companyInfo);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles.about_us}>
      <h2>About Us</h2>
      {isEditing ? (
        <div>
          <textarea
            style={{ fontSize: "1.1rem" }}
            rows={20}
            value={companyInfo}
            onChange={(e) => setCompanyInfo(e.target.value)}
            placeholder="Enter company information"
          ></textarea>
          <center>
            <button onClick={handlePreview}>Save</button>
          </center>
        </div>
      ) : (
        <div>
          {submittedInfo ? (
            <div>
              <p style={{ margin: "25px 00", whiteSpace: "pre-wrap", fontSize: "1.1rem", lineHeight: "1.5" }} >{submittedInfo}</p>
              <center>
                <button onClick={handleEdit}>Edit</button>
              </center>
            </div>
          ) : (
            <div>
              <textarea
                style={{ fontSize: "1.1rem" }}
                rows={20}
                value={companyInfo}
                onChange={(e) => setCompanyInfo(e.target.value)}
                placeholder="Enter company information"
              ></textarea>
              <center>
                <button onClick={handlePreview}>Submit</button>
              </center>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUs;
