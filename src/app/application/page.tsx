'use client';

import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    ethnicity: '',
    school: '',
    hackathons: '',
    dietaryRestrictions: '',
    shirtSize: '',
    avatar: Array.from({ length: 8 }, () => Array(8).fill('#ffffff')),
    failureProud: '',
    forgetLearn: '',
    hackObject: '',
    links: '',
    workshops: [] as string[],
  });

  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWorkshopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      workshops: checked
        ? [...prev.workshops, value]
        : prev.workshops.filter(w => w !== value),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '6px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    boxSizing: 'border-box' as const,
    color: '#000',
  };

  const labelStyle = {
    fontSize: '1rem',
    fontWeight: 500,
    display: 'block',
    color: '#000',
  };

  const formWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem',
    backgroundColor: '#f1f3f4',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
    color: '#000',
  };

  const formCardStyle = {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '600px',
    color: '#000',
  };

  const buttonStyle = {
    backgroundColor: '#9e9e9e',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    fontSize: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div style={formWrapperStyle}>
      <form onSubmit={handleSubmit} style={formCardStyle}>
        <h2 style={{ marginBottom: '1rem', color: '#000' }}>Hack404 Hacker Application Form</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="firstName" style={labelStyle}>What is your first name?</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="lastName" style={labelStyle}>What is your last name?</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label htmlFor="birthday" style={labelStyle}>What is your birthday?</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="ethnicity" style={labelStyle}>What is your ethnicity?</label>
          <input
            type="text"
            id="ethnicity"
            name="ethnicity"
            value={formData.ethnicity}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="school" style={labelStyle}>Which school are you currently attending?</label>
          <input
            type="text"
            id="school"
            name="school"
            value={formData.school}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="hackathons" style={labelStyle}>How many hackathons have you attended before?</label>
          <input
            type="text"
            id="hackathons"
            name="hackathons"
            value={formData.hackathons}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="dietaryRestrictions" style={labelStyle}>Do you have any allergies/dietary restrictions?</label>
          <select
            id="dietaryRestrictions"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label htmlFor="shirtSize" style={labelStyle}>What is your T-shirt size?</label>
          <select
            id="shirtSize"
            name="shirtSize"
            value={formData.shirtSize}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select a size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>

        <div>
          <label style={{ ...labelStyle, marginBottom: '8px' }}>
            Create your 8x8 avatar (click squares to fill):
          </label>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
            {['#3e4da3', '#ffffff', '#000000', '#acf652', '#d3d3d3', '#27cecd'].map(color => (
              <div
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: color,
                  border: selectedColor === color ? '3px solid #333' : '1px solid #999',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 20px)',
              gridTemplateRows: 'repeat(8, 20px)',
              gap: '0',
              border: '3px solid #ccc',
              width: 'fit-content',
              marginBottom: '20px',
            }}
          >
            {formData.avatar.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => {
                    const updatedAvatar = formData.avatar.map((r, rIdx) =>
                      rIdx === rowIndex
                        ? r.map((c, cIdx) => (cIdx === colIndex ? selectedColor : c))
                        : r
                    );
                    setFormData(prev => ({ ...prev, avatar: updatedAvatar }));
                  }}
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: cell,
                    border: '1px solid #999',
                    cursor: 'pointer',
                  }}
                />
              ))
            )}
          </div>
        </div>

        <div>
          <label htmlFor="failureProud" style={labelStyle}>
            What’s something you failed at that you’re proud of?
          </label>
          <textarea
            id="failureProud"
            name="failureProud"
            value={formData.failureProud}
            onChange={handleChange}
            style={inputStyle}
          />

          <label htmlFor="forgetLearn" style={labelStyle}>
            You wake up one morning and everything you know how to do has been ‘404’d’ from your memory. What’s the first thing you teach yourself again?
          </label>
          <textarea
            id="forgetLearn"
            name="forgetLearn"
            value={formData.forgetLearn}
            onChange={handleChange}
            style={inputStyle}
          />

          <label htmlFor="hackObject" style={labelStyle}>
            If you could ‘hack’ any everyday object (like a toaster, a chair, or a backpack), what would you hack and what would it do?
          </label>
          <textarea
            id="hackObject"
            name="hackObject"
            value={formData.hackObject}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="links" style={labelStyle}>
            Do you have any links you’d like to share? (LinkedIn, GitHub, personal website, etc. || separated by commas)
          </label>
          <input
            type="text"
            id="links"
            name="links"
            value={formData.links || ''}
            onChange={handleChange}
            style={inputStyle}
            placeholder="https://github.com/yourprofile, https://linkedin.com/in/yourname"
          />
        </div>

        <div>
          <label style={labelStyle}>What workshops would you like to see at Hack 404?</label>
          {[
            "Artificial Intelligence",
            "Web Dev",
            "AI-Assisted Development (e.g. Cursor, vibe coding, prompt engineering)",
            "Entrepreneurship",
            "Hackathon Pitching",
            "UI/UX Design",
            "Project Deployment",
          ].map(workshop => (
            <div key={workshop} style={{ marginBottom: '6px' }}>
              <label style={{ color: '#000' }}>
                <input
                  type="checkbox"
                  value={workshop}
                  checked={formData.workshops.includes(workshop)}
                  onChange={handleWorkshopChange}
                  style={{ marginRight: '8px' }}
                />
                {workshop}
              </label>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" style={buttonStyle}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;