import db from '../models';

const Profile = db.profile;
const ProfileImg = db.profileImg;
const State = db.state_list;
const District = db.district_list;
const SubDistrict = db.subDistrict_list;
const Village = db.village_list;

export function saveProfile(req, res) {
  Profile.find({ aadhaarNumber: req.body.aadhaarNumber }).then((aadhaar) => {
    if (aadhaar.length !== 0) {
      return res.status(500).json({
        success: {
          message: `Aadhaar Already Exist!!!`
        }
      });
    }
  });

  const profileImg = new ProfileImg({
    profileImg: req.body.img
  });

  profileImg
    .save()
    .then((img) => {
      const profile = new Profile({
        name: req.body.name,
        designation: req.body.designation,
        regNo: req.body.regNo,
        codeNo: req.body.codeNo,
        bloodGroup: req.body.bloodGroup,
        address1: req.body.address1,
        address2: req.body.address2,
        address3: req.body.address3,
        roleType: req.body.roleType,
        aadhaarNumber: req.body.aadhaarNumber,
        dob: req.body.dob,
        mobileNumber: req.body.mobileNumber,
        village: req.body.village,
        subDistrict: req.body.subDistrict,
        district: req.body.district,
        state: req.body.state,
        profile_images: img._id
      });

      profile
        .save()
        .then(() => {
          res.status(201).json({
            success: {
              message: 'Data saved successfully'
            }
          });
          return;
        })
        .catch((err) => {
          res.status(500).json({
            success: {
              message: `Error while saving data: ${err}`
            }
          });
          return;
        });
    })
    .catch(() => {
      res.status(500).json({
        success: {
          message: 'Error while saving Image'
        }
      });
      return;
    });
}

export async function getAllProfiles(req, res) {
  const pageNumber = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const offset = (pageNumber - 1) * pageSize;

  await Profile.find({})
    .populate('profile_images', '-__v')
    .skip(offset)
    .limit(pageSize)
    .then((profileData) => {
      let profileArr = [];

      let promise = new Promise((resolve) => {
        profileData.forEach(
          async (
            {
              _id,
              regNo,
              name,
              address1,
              address2,
              address3,
              mobileNumber,
              bloodGroup,
              state,
              district,
              subDistrict,
              roleType,
              village
            },
            index,
            array
          ) => {
            const stateObj = await State.find({ state_code: state }).exec();
            const districtObj = await District.find({ district_code: district }).exec();
            const subDistrictObj = await SubDistrict.find({ SubDistrict_code: subDistrict }).exec();
            const villageObj = await Village.find({ village_code: village }).exec();

            profileArr.push({
              _id,
              regNo,
              name,
              address1,
              address2,
              address3,
              mobileNumber,
              roleType,
              bloodGroup,
              stateObj: stateObj[0].state_name,
              districtObj: districtObj[0].district_name,
              subDistrictObj: subDistrictObj[0].SubDistrict_name,
              villageObj: villageObj[0].village_name
            });

            if (profileArr.length === array.length) {
              resolve();
            }
          }
        );
      });

      promise.then(() => {
        res.status(200).json({ data: profileArr });
        return;
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      return;
    });
}
