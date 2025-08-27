
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    let allList = await Listing.find();
    res.render("listings/index.ejs", { allList });
};

module.exports.search = async (req, res) => {
    const query = req.query.q; // Get the search term

    // Create case-insensitive regex from query
    const regex = new RegExp("^" + query, "i");

    // Search listings where title matches
    const listings = await Listing.find({ title: regex });

    // Send both listings and query to EJS

    if (listings != '' && query != '') {
        res.render("listings/search", {
            allList: listings,
            // query: query, // so you can reuse it in EJS
        });
    } else {
        req.flash("error", "Destination you searched for does not exist!");
        res.redirect("/listings");
    }

};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    let data = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");
    // console.log(data);
    // res.send(data);
    if (!data) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { data });
};

//create/New route - POST
module.exports.create_POST = async (req, res) => {
    let { title, description, image, price, location, country }
        = req.body.listing;
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing({
        title, description, image, price, location, country });
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    console.log(newListing);

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// Edit Route - GET OR render Edit Form
module.exports.edit_GET = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    // console.log(listing);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update route - PUT
module.exports.update_PUT = async (req, res) => {
    let { id } = req.params;
    let { title, description, image, price, location, country } = req.body;
    const editedList = await Listing.findByIdAndUpdate(id, { title, description, image, price, location, country });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        editedList.image = { url, filename };
        await editedList.save();
    };
    // console.log(editedList);

    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

// Delete Route - DELETE
module.exports.delete = async (req, res) => {
    console.log("Received delete request");
    let { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
    
};