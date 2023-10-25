const nodemailer = require("nodemailer");


module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        this.url = url;
        this.from = `Server <${process.env.EMAIL}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === "production") {
            // Sendgrid on production mode
            return nodemailer.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // Send the actual email
    async send(template, subject, text) {
        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: subject,
            html: template,
            text: text,
        };

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }
};