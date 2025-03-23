exports.customerWelcomeMail = (name) => {
    return  `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Homemate</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #10b981;
      padding: 20px;
      text-align: center;
    }
    .header img {
      width: 120px;
      height: auto;
    }
    .header h1 {
      color: #ffffff;
      font-size: 24px;
      margin: 10px 0;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content h2 {
      color: #10b981;
      font-size: 22px;
      margin-bottom: 20px;
    }
    .content p {
      line-height: 1.6;
      color: #4b5563;
    }
    .button-container {
      text-align: center;
      margin-top: 30px;
    }
    .button-container a {
      background-color: #10b981;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 5px;
      font-size: 16px;
      display: inline-block;
    }
    .footer {
      background-color: #1e293b;
      color: #ffffff;
      text-align: center;
      padding: 15px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="cid:logo" alt="Homemate Logo">
      <h1>Welcome to Homemate!</h1>
    </div>
    
    <div class="content">
      <h2>Hello, ${name}!</h2>
      <p>Welcome to <strong>Homemate</strong> – your one-stop solution for all home services! We're excited to have you on board.</p>
      <p>Whether you're looking for construction workers, carpenters, electricians, or any home service, you're just a click away from trusted professionals.</p>

      <h3>Here's What You Can Do Now:</h3>
      <ul>
        <li>Explore services across different categories</li>
        <li>Browse and hire skilled service providers</li>
        <li>View ratings and previous work of service providers</li>
        <li>Manage all your service requests from your account</li>
      </ul>

      <div class="button-container">
        <a href="https://homemate.com/dashboard">Explore Now</a>
      </div>

      <p>If you have any questions or need assistance, feel free to reach out to us at support@homemate.com.</p>
    </div>

    <div class="footer">
      <p>&copy; 2024 Homemate | All rights reserved</p>
    </div>
  </div>
</body>
</html>

    `
}