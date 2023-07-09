import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, text, token) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "guestifytn@gmail.com",
      to: email,
      subject: subject,
      text: text,
      html: `<html>
        <head>
        </head>
        <body>
            <div class="topper" style="
                        background-color: #cf022b;
                        width: 100%;
                        height: 100%;
                        color: white;
                        font-family: sans-serif;
                        padding: 5px;
                        border-radius: 12px;
                        text-align: center;">
                <h1 style="padding: 5px 0px 0px 0px ; color:#fff">${subject}</h1>
                <p style="padding: 0px 0px 10px 0px;">
                ${text}</p>
                <a href=${process.env.FRONT_URL}/verify-email/${token} style="color: white; padding: 10px 10px 10px 10px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;">

Vérifier le compte</a>
                <p style="padding: 10px 0px 0px 0px;">Si vous ne vous êtes pas inscrit, veuillez ignorer cet e-mail.</p>
            <hr style="border-top: 1px solid #fff; border-left: 0px, marginTop:5px">
            <div class="footer content" style="margin: 0 auto;width: fit-content;">
                <p
                    style="margin-left: auto;margin-right: auto;color: white;font-size: small;">
                    cteur global des solutions Ressources Humaines, RobotRace, filiale du groupe RobotRace, répond aux enjeux de transformation digitale</p>
                    <p><a href=${process.env.FRONT_URL} style="color: white; padding: 10px 10px 10px 10px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;"> RobotRace</a></p>
            </div>
            <p style="padding: 10px 0px 10px 0px"> &copy; 2022 RobotRace. Tous les droits sont réservés.</p>
        </div>
        </body>
        </html>`,
    });
    console.log("Message sent: %s", info);
    return { status: 200 };
  } catch (error) {
    return error;
  }
};
export const sendMailRecu = async (email, subject,client,montant, text, token) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: "guestifytn@gmail.com",
      to: email,
      subject: subject,
      text: text,
      html: `
      <html>
  <head>
    <style>
      /* Styles CSS pour l'email */
      .container {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        padding: 10px;
        background-color: #ffffff;
        font-family: sans-serif;
        border-radius: 12px;
        text-align: center;
      }
      .topper {
        padding: 20px 0;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
      }
      h1 {
        color: rgb(245, 19, 19);
        margin-top: 0;
      }
      p {
        margin-top: 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="topper">
        <h1>Reçu de paiement</h1>
        <h2> ${client}</h2>
        <h3> ${montant}</h3>
      </div>
      <p>${text}</p>
      <p style="padding-top: 20px;">&copy; 2023 RobotRace. Tous les droits sont réservés.</p>
    </div>
  </body>
</html>
`,
    });
    console.log("Message sent: %s", info);
    return { status: 200 };
  } catch (error) {
    return error;
  }
};



export const resetPasswordMail = async (email, subject, text, token) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: `<html>
          <head>
          </head>
          <body>
              <div class="topper" style="
                          background-color: #cf022b;
                          width: 100%;
                          height: 100%;
                          color: white;
                          font-family: sans-serif;
                          padding: 5px;
                          border-radius: 12px;
                          text-align: center;">
                  <h1 style="padding: 5px 0px 0px 0px ; color:#fff">${subject}</h1>
                  <p style="padding: 0px 0px 10px 0px;">
                  réinitialisez votre mot de passe</p>
                  <a href=${process.env.FRONT_URL}/resetpassword/${token} style="color: white; padding: 10px 10px 10px 10px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;">
                  Réinitialisez
                  </a>
                  <p style="padding: 0px 0px 10px 0px;">
                  ${text}</p>
              <hr style="border-top: 1px solid #fff; border-left: 0px, marginTop:5px">
              <div class="footer content" style="margin: 0 auto;width: fit-content;">
                  <p
                      style="margin-left: auto;margin-right: auto;color: white;font-size: small;">
                      cteur global des solutions Ressources Humaines, RobotRace, filiale du groupe RobotRace, répond aux enjeux de transformation digitale</p>
                      <p><a href=${process.env.FRONT_URL} style="color: white; padding: 10px 10px 10px 10px; border:1px solid white; border-radius:16px; cursor: pointer; text-decoration: none;"> RobotRace</a></p>
              </div>
              <p style="padding: 10px 0px 10px 0px"> &copy; 2022 RobotRace. Tous les droits sont réservés.</p>
          </div>
          </body>
          </html>`,
    });

    return { status: 200 };
  } catch (error) {
    return error;
  }
};



