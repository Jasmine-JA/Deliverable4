import React, { useState } from 'react';

const FeedbackPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedbackType, setFeedbackType] = useState('suggestion');
    const [message, setMessage] = useState('');

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (!message) {
            alert('Please provide feedback message.');
            return;
        }
        alert(`Thank you for your ${feedbackType} feedback, ${name || 'Anonymous'}! Message: ${message}`);
        setName('');
        setEmail('');
        setFeedbackType('suggestion');
        setMessage('');
    };

    return (
        <section id="feedback-page">
            <div className="form-container">
                <h2>Feedback</h2>
                <form id="feedback-form" onSubmit={handleFeedbackSubmit}>
                    <div className="form-group">
                        <label htmlFor="feedback-name">Name (optional):</label>
                        <input type="text" id="feedback-name" name="feedback-name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback-email">Email (optional):</label>
                        <input type="email" id="feedback-email" name="feedback-email" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback-type">What type of feedback are you providing?</label>
                        <select id="feedback-type" name="feedback-type" value={feedbackType} onChange={e => setFeedbackType(e.target.value)}>
                            <option value="suggestion">Suggestion</option>
                            <option value="issue">Issue Report</option>
                            <option value="compliment">Compliment</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback-message">Please describe your feedback in detail:</label>
                        <textarea id="feedback-message" name="feedback-message" rows={5} required value={message} onChange={e => setMessage(e.target.value)}></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">SUBMIT</button>
                </form>
            </div>
        </section>
    );
};
export default FeedbackPage;