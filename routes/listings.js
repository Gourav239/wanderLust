const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Listing route
router.get("/", wrapAsync(listingController.index));

//Create & add Route 
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});

router.get("/search", wrapAsync(listingController.search));

//Show Detailed Listing Route
router.get("/:id", wrapAsync(listingController.show));

//create route
router.post("/new",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.create_POST));


// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.edit_GET));


// Update route
router.put("/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    wrapAsync(listingController.update_PUT));

// delete route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.delete));

module.exports = router;