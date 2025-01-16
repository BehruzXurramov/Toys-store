const config = require("config");
const nodemailer = require("nodemailer");

class SendMail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async sendMailActivateCode(toEmail, link) {
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "Akkauntni faollashtirish.",
      text: "",
      html: `
        <div>
            <h3>Akkauntingizni aktivlashtirish uchun ushbu havolaga bosing.</h3>
            <a href="${link}">Faollashtirish</a>
        </div>
        `,
    });
  }
}

module.exports = new SendMail();
