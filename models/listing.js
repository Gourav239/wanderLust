const mongoose = require("mongoose");
const Review = require("./review.js");
//const defaultImageURL = "https://wallpaperaccess.com/full/442405.jpg"; // default fallback image

const defaultImageURL = "/image.jpeg"; // default fallback image

// Listing schema
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews || [] } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


// let sampleListing=new Listing({
//     title:"My new Villa",
//     description:"By the beach",
//     price:1200,
//     location:"Calangute, Goa",
//     country:"India",
// });


