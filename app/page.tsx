import HomeComponent from '../components/Home'
import Error from './error';

//you can also specify revalidate time in seconds as an export const
// export const revalidate = 60; //this also works and you dont have to include it on the fetch request

export const metadata = {
  title: 'Home - Book It App'
}
const getRooms = async () =>{
  const res = await fetch(`${process.env.APP_URL}/api/rooms`,
  {
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // next: { revalidate: 3600} // refresh after 1 hour (3600 seconds)
  }
  )
  return res.json()
}

export default async function HomePage() {

  const data = await getRooms();

  if(data?.message){
    // reset={() => window.location.reload()} 
    return <Error error={data} />
  }
  
  // data={data}
  return <HomeComponent data={data} />
}
