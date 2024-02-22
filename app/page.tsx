import HomeComponent from '../components/Home'
import Error from './error';

//you can also specify revalidate time in seconds as an export const
// export const revalidate = 60; //this also works and you dont have to include it on the fetch request

export const metadata = {
  title: 'Home - Book It App'
}
const getRooms = async (searchParams:string) =>{

  const urlParams = new URLSearchParams(searchParams);
  const queryString = urlParams.toString();
  const res = await fetch(`${process.env.APP_URL}/api/rooms?${queryString}`,
  {
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // next: { revalidate: 3600} // refresh after 1 hour (3600 seconds)
  }
  )
  return res.json()
}

export default async function HomePage({searchParams}:{searchParams:string}) {

  const data = await getRooms(searchParams);

  if(data?.errMessage){
    // reset={() => window.location.reload()} 
    return <Error error={data} />
  }
  
  // data={data}
  return <HomeComponent data={data} />
}
