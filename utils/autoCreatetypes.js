
import {BedTypes} from './bedtypes.js';
import BedtypeModel from '../models/bedTypesModel.js';

export const autoCreateBed = async ()=>{
  try{
    const bedCount = await BedtypeModel.countDocuments(); 
    if(bedCount === 0){
      const bedType = BedTypes();
       bedType.forEach(async(ele)=>{
        const body = {};
        body.type = ele.type;
        body.description  = ele.description;
        const createBedType = await BedtypeModel.create(body);
      })
      console.log("Bed types created");
    }else{
      console.log("Bed types are already present");
    }
  }catch(err){
    console.log(err);
  }
}