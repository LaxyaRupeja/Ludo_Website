import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
    return (
        <div className="flex justify-center items-center p-6">
            <UserProfile />
        </div>
    )
}

export default ProfilePage;