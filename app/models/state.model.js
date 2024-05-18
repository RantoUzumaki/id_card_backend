import { model, Schema } from 'mongoose';

const State = model(
  'State_list',
  new Schema({
    id: Number,
    state_code: Number,
    state_name: String
  })
);

export default State;
