import { Schema, models, model } from "mongoose";

const bannerAndSideSec = new Schema({
  sideHeading: { type: String, }, 
  bannerList: { type: [String], default: [] },
  sideSecList: { type: [String], default: [] },
  sideSecTitles: { type: [String], default: [] },
  bannerTitles: { type: [String], default: [] },
});

var banNsideModel = models.banner_sidesections || model('banner_sidesections', bannerAndSideSec);

export default banNsideModel;


