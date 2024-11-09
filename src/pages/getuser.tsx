import { createClient } from "@/utils/supabase/component";
import type { User } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const GetUser = () => {
    const [userData, setUserdata] = useState<{user: User | null} | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await supabase.auth.getUser();
            setUserdata(data);
            setLoading(false);
        }
        fetchUserData();
    }, [supabase]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            Hello, {userData?.user?.email}! {userData?.user?.email_confirmed_at ? "Confirmed" : "Not confirmed"}.
        </div>
    )
}

export default GetUser;