const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Resend } = require("resend");

admin.initializeApp();

// Tu clave API de Resend
const resend = new Resend("re_EnEQXJ2Q_CURY1NcjBh3r7qPepsJCv2vS");

exports.sendConfirmationEmail = functions.database
  .ref("/agendarVisitas/{pushId}")
  .onCreate(async (snapshot, context) => {
    const data = snapshot.val();
    const email = data.email;

    if (!email) {
      console.log("No se proporcionó un correo.");
      return null;
    }

    try {
      await resend.emails.send({
        from: "Tu Espacio Ideal <onboarding@resend.dev>",
        to: email,
        subject: "Gracias por tu preferencia",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #2196F3;">¡Gracias por tu preferencia!</h2>
            <p>En breve nos pondremos en contacto contigo para agendar tu visita.</p>
            <p><strong>Tu Espacio Ideal</strong></p>
          </div>
        `,
      });
      console.log("Correo enviado a:", email);
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }

    return null;
  });
