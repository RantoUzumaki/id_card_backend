import mongoose from 'mongoose';
import Role from './role.model'
import State from './state.model'
import District from './district.model'
import SubDistrict from './subDistrict.model'
import Village from './village.model'
import Profile from './profiles.model'
import Profile_Image from './profileImg.model';
import User from './user.model';

const db = {};

db.mongoose = mongoose;
db.role = Role
db.state_list = State
db.district_list = District
db.subDistrict_list = SubDistrict
db.village_list = Village
db.profile = Profile
db.user = User
db.profileImg = Profile_Image

export default db;
