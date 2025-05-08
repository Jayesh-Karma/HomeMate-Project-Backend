const Customer = require("../../models/customer");
const user = require("../../models/user"); 
const Service = require("../../models/Service");
const emailSender = require("../../utils/emailSender");
const { notify_serviceProvider } = require("../../utils/Email Templates/ServiceProviderHiredEmail");
const { notifyCustomer } = require("../../utils/Email Templates/CustomerHiredEmail");
const { newHireNotification} = require("../../utils/Email Templates/newHireNotification");
const generateToken = require("../../utils/generateToken");
const { token } = require("morgan");

 const customerLogin = async(req, res) => {
    try{
        const {email, password} = req.body;
        const customer = await Customer.findOne({email});

        if(customer && await customer.matchPassword(password)){
            return res.status(200).json({
                success:true,
                message:"Login successfull",
                userData:customer,
                token:generateToken(customer)
            })
        }else{
            return res.status(400).json({ 
                success:false,
                message:"Invalid credentials"
            })
        }
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Invalid credentials --> server error",
            error:error.message
        })
    }
}

 const customerSignup = async(req, res) => {
    try {
        const {name, phone, email, password, location, current_service} = req.body;
       
        if(!name || !phone || !email || !location || !password){
            return res.status(400).json({
                success:false,
                message:"Required all fields"
            })
        }

        const newCustomer = await Customer.create({
            name, phone, email, password, location, current_service
        })
        return res.status(200).json({
            success:true,
            message:"Signup successfull",
            userData: newCustomer,
            token:generateToken(newCustomer)
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Failed to signup try again ---> server error"
        })
    }
}

const hireServiceProvider = async(req, res) =>{
    try {
        const { serviceProviderId, typeOfService, location, date, time, workDescription} = req.body;
        const id = req.user.id;

        console.log(id, serviceProviderId, typeOfService, location, date, time, workDescription)
        if(!id || !serviceProviderId || !typeOfService || !location){
            return res.status(400).json({
                success:false,
                message:"Required all fields"
            })
        }

        const customer = await Customer.findById(id);
        const serviceProvider = await user.findById(serviceProviderId);

        console.log(customer)
        
        if(!customer || !serviceProvider){
            return res.status(400).json({
                success:false,
                message:"Invalid customer or service provider"
            })
        }

        const email = await emailSender(serviceProvider.email, "New Service Alert !!", "Checkout details and contact customer on time", notify_serviceProvider(typeOfService, customer.name, customer.id, customer.email, customer.phone, customer.location, customer.workDescription, date, time));

        const email2 = await emailSender(customer.email, "Thankyou for using our services", notifyCustomer(serviceProvider.name, customer.name, serviceProvider.email, serviceProvider.phone, serviceProvider.serviceDetails, date, time));
        
       
        const email3 = await emailSender('jayeshexternal@gmail.com', "New Service Alert !!", "", newHireNotification(serviceProvider.name, serviceProvider.email, serviceProvider.phone, serviceProvider.serviceDetails, typeOfService, customer.name, customer.id, customer.email, customer.phone, date, time));
   
        
        const newService = await Service.create({
            customerId: id,
            serviceProviderId: serviceProviderId,
            typeOfService:typeOfService.toLowerCase(),
            workDescription:workDescription,
            location:location,
            date:date,
            time:time
        })

        // push id of new Service in customer's hired service provider

        customer.hired_service_providers.push(newService._id);
        customer.current_service = typeOfService;
        customer.currently_hired = serviceProvider._id;
        

        await customer.save();

        serviceProvider.homemateProjects.push(newService._id);
        await serviceProvider.save();


        return res.status(200).json({
            success:true,
            message:"Hired Service Provider successfully"
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Hiring Failed ---> internal server error",
            error:error.message
        })
    }
}

const getAllDetails = async(req, res) => {
    try {
        const id = req.user.id;
        const customer = await Customer.findById(id).select("-password").populate({
            path:"currently_hired",
        })
        return res.status(200).json({
            success:true,
            message:"Details fetched successfully",
            userData:customer
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Failed to fetch details",
            error:error.message
        })
    }
}

module.exports = { customerLogin, customerSignup, hireServiceProvider, getAllDetails }