 exports.verificationTempalte = (name) => {
    return `
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #1e293b; padding: 20px; text-align: center;">
      <h1 style="color: #fbbf24; font-size: 24px; margin: 10px 0;">Welcome to Homemate!</h1>
    </div>
    
    <div style="padding: 20px; color: #333333;">
      <h2 style="color: #1e293b; font-size: 22px; margin-bottom: 20px;">Account Successfully Verified</h2>
      <p style="line-height: 1.6; color: #4b5563;">Dear ${name},</p>
      <p style="line-height: 1.6; color: #4b5563;">Congratulations! Your account has been successfully verified on <strong>Homemate</strong>. You are now all set to offer your services and connect with homebuyers and property owners in need of your expertise.</p>
      <p style="line-height: 1.6; color: #4b5563;">You will also receive an email notification each time someone hires you, so you can respond promptly and manage your jobs efficiently.</p>

      <h3 style="color: #1e293b; font-size: 18px;">Next Steps:</h3>
      <ul style="line-height: 1.6; color: #4b5563;">
        <li>Log in to your account to start receiving work requests.</li>
        <li>We will share the details of the job with you once someone hires you.</li>
        <li>When hired, you are required to call the client directly to discuss and gather all the necessary information about the job.</li>
        <li>To increase your chances of getting more work, upload images of your previous projects on your profile.</li>
        <li>Ensure your profile is complete with all details, including your expertise, work history, and availability.</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="#" style="background-color: #fbbf24; color: #1e293b; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block;">Log in to your account</a>
      </div>
    </div>

    <div style="background-color: #1e293b; color: #ffffff; text-align: center; padding: 15px; font-size: 14px;">
      <p>&copy; 2024 Homemate | All rights reserved</p>
    </div>
  </div>
    `
}
