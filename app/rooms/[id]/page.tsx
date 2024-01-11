import Error from "@/app/error";
import Home from "@/components/Home"
import RoomDetails from "@/components/room/roomDetails";


interface Props {
    params: {id:string}
}

const getRoom = async (id:string) =>{
    const res = await fetch(`${process.env.APP_URL}/api/rooms/${id}`);
    return res.json();
};


export default async function RoomDetailsPage({params}: Props){
    const data = await getRoom(params?.id);
    console.log("here");
    console.log(data);
    if(data?.message){
        return <Error error={data} />;
    }

    console.log(data);

    return <RoomDetails data={data} />

    
}

export async function generateMetadata ({params}:Props){
    const data = await getRoom(params?.id);

    return {
        title: "Room: " + data?.room?.name
    }
}