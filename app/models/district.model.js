import { model, Schema } from 'mongoose';

const District = model(
  'District_list',
  new Schema({
    id: Number,
    state_code: Number,
    district_code: Number,
    district_name: String
  })
);

export default District;
