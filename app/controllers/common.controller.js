import db from '../models';

const State = db.state_list;
const District = db.district_list;
const SubDistrict = db.subDistrict_list;
const Village = db.village_list;

export function getStateList(req, res) {
  let stateListArr = [];

  State.find({})
    .then((stateData) => {
      stateData.forEach((e) => stateListArr.push(e));

      return res.json(stateListArr);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      return;
    });
}

export function getDistrictList(req, res) {
  let districtListArr = [];

  District.find({state_code: req.params.state_code})
    .then((districtData) => {
      districtData.forEach((e) => districtListArr.push(e));

      return res.json(districtListArr);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      return;
    });
}

export function getSubDistrictList(req, res) {
  let subDistrictListArr = [];

  SubDistrict.find({state_code: req.params.state_code, district_code: req.params.district_code})
    .then((subDistrictData) => {
      subDistrictData.forEach((e) => subDistrictListArr.push(e));

      return res.json(subDistrictListArr);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      return;
    });
}

export function getVillageList(req, res) {
  let villageListArr = [];

  Village.find({state_code: req.params.state_code, district_code: req.params.district_code, SubDistrict_code: req.params.SubDistrict_code})
    .then((villageData) => {
      villageData.forEach((e) => villageListArr.push(e));

      return res.json(villageListArr);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      return;
    });
}
