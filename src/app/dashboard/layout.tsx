import BottomBar from "@/components/bottom-bar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return <div>
        <BottomBar />
        <div className="pb-20">
            {children}
        </div>
    </div>
}

export default DashboardLayout;
