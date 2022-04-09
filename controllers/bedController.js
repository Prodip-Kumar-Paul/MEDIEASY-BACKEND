import BedTypes  from '../models/bedTypesModel.js'; 

export const getBedTypes = async (req,res,next) =>{
  try{
    const allTypes = await BedTypes.find();
    if(allTypes){
      res.status(200).json({
        status:true,
        message:"all types",
        data:allTypes
      })
    }else{
      res.status(200).json({
        status:false,
        message:"No types",
        data:''
      })
    }
  }catch(err){
    next(err)
  }
}

