import { model, Schema } from "mongoose";

const Profile = model(
	"Profile",
	new Schema({
		name: String,
		designation: String,
		regNo: String,
		codeNo: Number,
		bloodGroup: String,
		address1: String,
		address2: String,
		address3: String,
		dob: String,
		aadhaarNumber: Number,
		roleType: String,
		mobileNumber: Number,
		village: String,
		subDistrict: String,
		district: String,
		state: String,
		profile_images: [
			{
				type: Schema.Types.ObjectId,
				ref: "Profile_image",
			},
		],

	}),
);

export default Profile;