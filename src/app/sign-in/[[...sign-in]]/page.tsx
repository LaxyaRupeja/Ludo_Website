import { SignIn } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";

export default function Page() {
    return (
        <div className="flex justify-center py-24 min-h-[98vh]">
            <SignIn signUpUrl="/sign-up" forceRedirectUrl={"/dashboard"}/>
        </div>
    );
}