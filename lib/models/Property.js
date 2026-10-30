import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title:            { type: String, required: true, trim: true },
    propertyType:     { type: String, required: true, enum: ["House", "Apartment", "Land/Plot", "Commercial Property", "Furniture"] },
    listingType:      { type: String, required: true, enum: ["For Sale", "For Rent"] },
    price:            { type: Number, required: true, min: 0 },
    district:         { type: String },
    specificLocation: { type: String },
    plotCategory:     { type: String },
    sqm:              { type: Number, min: 0 },
    description:      { type: String },
    bedrooms:         { type: Number, min: 0 },
    bathrooms:        { type: Number, min: 0 },
    images:           { type: [String], default: [] },
    image:            { type: String, default: "" },
    status:           { type: String, default: "Available", enum: ["Available", "Reserved", "Sold", "Rented"] },
  },
  { timestamps: true }
);

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);
