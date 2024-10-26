import Header from "@/components/header"
import ListingsArray from "@/components/ListingsArray"
import LoadingSkeleton from "@/components/ListingsArrayLoadingSkeleton"
import type { ListingData } from "@/utils/tempData"
import type { User } from "@supabase/supabase-js"
import type { GetServerSidePropsContext } from "next"
import { createClient } from "@/utils/supabase/server-props"

export default function MyListings({ user, listings} : { user: User, listings: ListingData[]}) {
    return (
        <>
            <Header/>
            <ListingsArray listings={listings}/>
        </>
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