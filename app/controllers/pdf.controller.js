import middlewares from '../middlewares';
import hb from 'handlebars';
import puppeteer from 'puppeteer';
import db from '../models';
import QRCode from 'qrcode';
import dotenv from 'dotenv';
import getFile from '../middlewares/getFile';

dotenv.config();

const Profile = db.profile;
const State = db.state_list;
const District = db.district_list;
const SubDistrict = db.subDistrict_list;
const Village = db.village_list;

const USER_ROLE_TYPE = {
  NATIONAL: '#FC4100',
  STATE: '#00215E',
  DISTRICT: '#FF6500',
  COMMON: '#F3CA52'
};

export function generatePdf(req, res) {
  middlewares.getFile
    .getTemplateHtml('app/template/id.html')
    .then((getRes) => {
      Profile.findOne({ _id: req.params.profileId })
        .populate('profile_images', '-__v')
        .then(async (ProfileDetails) => {
          const template = hb.compile(getRes, { strict: true });

          const stateObj = await State.find({ state_code: ProfileDetails.state }).exec();
          const districtObj = await District.find({ district_code: ProfileDetails.district }).exec();
          const subDistrictObj = await SubDistrict.find({ SubDistrict_code: ProfileDetails.subDistrict }).exec();
          const villageObj = await Village.find({ village_code: ProfileDetails.village }).exec();

          const qrGenerated = QRCode.toString(
            JSON.stringify({ name: ProfileDetails.name }),
            {
              errorCorrectionLevel: 'H',
              type: 'svg'
            },
            function (err, code) {
              if (err) return console.log('qr error occurred');

              return code.toString();
            }
          );

          const base64String = Buffer.from(qrGenerated).toString('base64');

          const result = template({
            regNo: ProfileDetails.regNo,
            name: ProfileDetails.name,
            img: ProfileDetails.profile_images[0].profileImg,
            designation: ProfileDetails.designation,
            codeNo: ProfileDetails.codeNo,
            bloodGroup: ProfileDetails.bloodGroup,
            address: `${ProfileDetails.address1}, ${ProfileDetails.address2}, ${ProfileDetails.address3}, ${villageObj[0].village_name}, ${subDistrictObj[0].SubDistrict_name}, ${districtObj[0].district_name}, ${stateObj[0].state_name}`,
            DOB: ProfileDetails.dob,
            mobile: ProfileDetails.mobileNumber,
            secondaryColor: USER_ROLE_TYPE[ProfileDetails.roleType],
            qr: `data:image/svg+xml;base64,${base64String}`,
            logoImg: getFile.convertImageToBase64URL('app/template/logo.png'),
            barScan: getFile.convertImageToBase64URL('app/template/barcode.svg', 'svg+xml')
          });

          const html = result;

          const browser = await puppeteer.launch({ headless: false });
          const page = await browser.newPage();
          await page.setContent(html);
          const buffer = await page.pdf({ format: 'A6' });
          await browser.close();

          res.status(200).json({ data: buffer.toString('base64') });
          return;
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
