import Service from "../models/service-model.js";

const services = async(req, res)=>{
    try {
        const response = await Service.find()

        if(!response){
            return res.status(400).json({message: "Service not found"})
        }

        res.status(200).json({message : response})

    } catch (error) {
        console.error("Service Error" , error)
    }
}

export default services;