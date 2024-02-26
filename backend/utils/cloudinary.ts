import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const upload_file = (file:string, folder:string): Promise<{public_id:string, url:string}> => {
    console.log("uploading file")
    return new Promise((resolve, reject)=>{
        cloudinary.v2.uploader.upload(file, {
            resource_type: "auto",
            folder: folder,
            timeout: 60000
        },
        (error, result:any)=>{
            if(error) return reject(error);
            resolve({public_id: result.public_id, url: result.url});
        });
    });
    
};

const delete_file = async (file:string): Promise<{result:string}> => {
    const res = await cloudinary.v2.uploader.destroy(file);

    if(res?.result === 'ok'){
        return {result: 'ok'};
    }else{
        return {result: 'error'};
    }
};

export { upload_file, delete_file, cloudinary };