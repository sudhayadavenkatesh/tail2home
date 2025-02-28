const mongoose = require("mongoose");

const adoptFormSchema = new mongoose.Schema({
    email: { type: String, required: true },
    livingSituation: { type: String, required: true },
    phoneNo: { type: String, required: true },
    previousExperience: { type: String, required: true },
    familyComposition: { type: String, required: true },
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true }
}, { timestamps: true });

module.exports = mongoose.model("AdoptForm", adoptFormSchema);
