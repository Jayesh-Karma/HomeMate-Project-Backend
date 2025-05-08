exports.notifyCustomer = (name, customerName, email, phone, service, date, time) =>{
  console.log(name)
  return `
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #1d4ed8; padding: 20px; text-align: center;">
      <!-- <img src="cid:logo" alt="Homemate Logo" style="width: 120px; height: auto;"> -->
      <h1 style="color: #ffffff; font-size: 24px; margin: 10px 0;">New Service Provider Hired</h1>
    </div>
    
    <div style="padding: 20px; color: #333333;">
      <h2 style="color: #1d4ed8; font-size: 22px; margin-bottom: 20px;">New Hire Details</h2>
      <p style="line-height: 1.6; color: #4b5563;">Dear, ${customerName}</p>
      <p style="line-height: 1.6; color: #4b5563;">We are excited to inform you that you have successfully hired a service provider on <strong>Homemate</strong>.</p>
      
      <h3 style="color: #1d4ed8; font-size: 18px;">Hire Details:</h3>
      <ul style="line-height: 1.6; color: #4b5563;">
      <li><strong>Service Provider:</strong> ${name}</li>
      <li><strong>Service:</strong> ${service} </li>
      <li><strong>Contact: </strong> Email: ${email}, Phone: ${phone}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
      </ul>
      


      <h3 style="color: #1d4ed8; font-size: 18px;">Next Steps:</h3>
      <p style="line-height: 1.6; color: #4b5563;">You will be contacted by our service provider soon.</p>
      <p style="line-height: 1.6; color: #4b5563;">If you have any questions or need further assistance, please don't hesitate to contact us.</p>
      <p style="line-height: 1.6; color: #4b5563;">Best regards,<br>Homemate Team</p>
   
    </div>

    <div style="background-color: #1e293b; color: #ffffff; text-align: center; padding: 15px; font-size: 14px;">
      <p>&copy; 2024 Homemate | All rights reserved</p>
    </div>
  </div>
    `
  }