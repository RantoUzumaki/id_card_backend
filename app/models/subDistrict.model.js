import { model, Schema } from 'mongoose';

const SubDistrict = model(
  'Sub_district_list',
  new Schema({
    id: Number,
    state_code: Number,
    district_code: Number,
    SubDistrict_code: Number,
    SubDistrict_name: String
  })
);

export default SubDistrict;
