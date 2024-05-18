import { model, Schema } from 'mongoose';

const Village = model(
  'Village_list',
  new Schema({
    id: Number,
    state_code: Number,
    district_code: Number,
    SubDistrict_code: Number,
    village_code: Number,
    village_name: String
  })
);

export default Village;
