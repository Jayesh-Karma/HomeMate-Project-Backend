const express = require("express");
const { get_All_Cities_Of_ServiceProviders, getAllLocation, searchPostByLocation, searchPostsByService, search_serviceProviders_By_service, account_details } = require("../controllers/searchPostControllers");
const { getAllServiceProvider, getServiceProvidersByService } = require("../controllers/serviceProviderControllers/service_provider_Controllers");


const router = express.Router();

// Search routes  //
router.get("/", async (req, res) => {
    res.send("Search for the cities, working locations, and for posts");
})
router.get("/get_all_service_providers", getAllServiceProvider ); // get all service providers

router.get("/get_serviceproviders_by_service/:service", getServiceProvidersByService)

router.get("/all_cities", get_All_Cities_Of_ServiceProviders); // locaions where our service providers exists
router.get("/working_locations", getAllLocation); // locations where our service providers worked previously
router.get("/posts_location/:location", searchPostByLocation) //posts according to location
router.get("/posts_of_services", searchPostsByService); //posts according to services
router.get("/service_providers", search_serviceProviders_By_service); // service providers according to services
router.get("/service_provider_account_details/:id", account_details); // details of that service provider


module.exports = router;