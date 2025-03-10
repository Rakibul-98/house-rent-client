import UserProfile from "@/components/user-profile/UserProfile";
import { getCurrentUser, getSingleUser } from "@/services/AuthService";

const UserProfilePage = async () => {


    const currentUser = await getCurrentUser();

    const user = await getSingleUser(currentUser?.email);
    return (
        <div>
            <UserProfile user={user.data}/>
        </div>
    );
};

export default UserProfilePage;