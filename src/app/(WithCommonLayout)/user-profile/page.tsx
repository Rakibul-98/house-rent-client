import UserProfile from "@/components/user-profile/UserProfile";
import { getCurrentUser, getSingleUser } from "@/services/AuthService";

const UserProfilePage = async () => {


    const currentUser = await getCurrentUser();

    const user = await getSingleUser(currentUser?.email);
    return (
        <div>
            <title>Profile - Home Finder</title>
            <UserProfile user={user.data}/>
        </div>
    );
};

export default UserProfilePage;