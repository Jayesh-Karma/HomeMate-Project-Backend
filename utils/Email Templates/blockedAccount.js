exports.blockedAccountNotification = (name) => {
    return `
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #b91c1c; padding: 20px; text-align: center;">
      <h1 style="color: #ffffff; font-size: 24px; margin: 10px 0;">HomeMate: Account Blocked</h1>
    </div>
    
    <div style="padding: 20px; color: #333333;">
      <h2 style="color: #b91c1c; font-size: 22px; margin-bottom: 20px;">Important: Your Account Has Been Blocked</h2>
      <p style="line-height: 1.6; color: #4b5563;">Dear ${name},</p>
      <p style="line-height: 1.6; color: #4b5563;">We regret to inform you that your account on <strong>Homemate</strong> has been blocked due to policy violations or irregular activity. You will no longer be able to log in or access your account until further notice.</p>
      
      <h3 style="color: #b91c1c; font-size: 18px;">Reason for Account Block:</h3>
      <p style="line-height: 1.6; color: #4b5563;">The account block might be due to one or more of the following reasons:</p>
      <ul style="line-height: 1.6; color: #4b5563;">
        <li>Violation of Homemate's terms and conditions.</li>
        <li>Receiving consistent negative feedback from customers.</li>
        <li>Misrepresentation of your services or identity.</li>
      </ul>

      <p style="line-height: 1.6; color: #4b5563;">If you believe this is a mistake or you would like to appeal this decision, please contact our support team at <a href="mailto:support@homemate.com" style="color: #1d4ed8; text-decoration: none;">support@homemate.com</a>.</p>

      <h3 style="color: #b91c1c; font-size: 18px;">Next Steps:</h3>
      <ul style="line-height: 1.6; color: #4b5563;">
        <li>You will not be able to receive job requests or communicate with customers until your account is reinstated.</li>
        <li>Contact our support team to resolve the issue if applicable.</li>
        <li>If your account is reinstated, you will need to ensure full compliance with Homemate's policies.</li>
      </ul>

      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:support@homemate.com" style="background-color: #b91c1c; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-size: 16px; display: inline-block;">Contact Support</a>
      </div>
    </div>

    <div style="background-color: #1e293b; color: #ffffff; text-align: center; padding: 15px; font-size: 14px;">
      <p>&copy; 2024 Homemate | All rights reserved</p>
    </div>
  </div>
`
}