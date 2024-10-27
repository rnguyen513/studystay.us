import Header from "@/components/header"
import ListingsArray from "@/components/ListingsArray"
import LoadingSkeleton from "@/components/ListingsArrayLoadingSkeleton"
import { leagueSpartan } from "@/utils/fonts"
import type { ListingData } from "@/utils/tempData"
import type { User } from "@supabase/supabase-js"
import type { GetServerSidePropsContext } from "next"
import { createClient } from "@/utils/supabase/server-props"

export default function MyListings({ user, listings} : { user: User, listings: ListingData[]}) {
    return (
        <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>

        <Header/>
  
        <main className="container mx-auto px-4 py-8">
            <div className="font-bold text-3xl mb-8">My listings</div>
            <ListingsArray listings={listings}/>
        </main>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const supabase = createClient(context)

  let user: User | null = null;

  try {
    const { data, error } = await supabase.auth.getUser()
    user = data.user

    if (error || !user || user === null) {
      return {
        redirect: {
          destination: '/in',
          permanent: false,
        },
      }
    }
  } catch (error) {
    console.error(error)
  } finally {
    const { data, error } = await supabase.from("listings").select().eq("postedby", user?.id);

    console.log("USERS LISTINGS: " + data)

    return {
        props: {
          user: user,
          listings: data ?? [],
        },
      }
  }
}