import Navbar from "../features/navbar/Navbar";
import UserProfile from "../features/user/component/UserProfile";

const UserProfilePage = () => {
    return (
        <div>
            <Navbar>
                <UserProfile/>
            </Navbar>
        </div>
    );
};

export default UserProfilePage;