const forgotPasswordTemplate = ({ name, otp }) => {
  return `
      <div>
        <p>Dear, ${name}</p>
        <p>You're requested a password reset. Please use the following OTP code to reset your password.</p>
        <div>
          <p style="background: yellow; font-size: 20px;">OTP: ${otp}</p>
        </div>
        <p>This OTP is valid for 1 hour only. Enter this OTP in the Blinkit website to proceed with resetting your password.</p>
        <br/>
        <br/>
        <p>Thanks</p>
        <p>lonavala stay villa</p>
      </div>
    `;
};

export default forgotPasswordTemplate;
