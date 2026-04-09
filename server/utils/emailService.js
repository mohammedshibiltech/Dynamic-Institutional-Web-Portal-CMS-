const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

/**
 * Sends an email to the students' group mail on behalf of the Principal.
 * @param {string} subject - The subject of the email.
 * @param {string} text - The plain text content.
 * @param {string} html - The HTML content (optional).
 */
exports.sendGroupEmail = async (subject, text, html = null) => {
    try {
        const mailOptions = {
            from: `"${process.env.PRINCIPAL_NAME}" <${process.env.SMTP_USER}>`,
            to: process.env.STUDENT_GROUP_MAIL.split(',').map(email => email.trim()),
            subject: subject,
            text: text,
            html: html || `<p>${text}</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending group email:', error);
        throw error;
    }
};

/**
 * Sends a generic email.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content.
 * @param {string} html - HTML content (optional).
 */
exports.sendEmail = async (to, subject, text, html = null) => {
    try {
        const mailOptions = {
            from: `"${process.env.PRINCIPAL_NAME}" <${process.env.SMTP_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html || `<p>${text}</p>`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent to %s: %s', to, info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

