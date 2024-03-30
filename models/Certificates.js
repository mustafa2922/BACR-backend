const mongoose = require("mongoose");

const CertificatesSchema = new mongoose.Schema(
  {
    name:{type:String},
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    path: { type: String },
    size: { type: Number },
    filename: { type: String },
  },
  { timestamps: true }
);

const Certificates = mongoose.model("Certificate", CertificatesSchema);

module.exports = Certificates;
