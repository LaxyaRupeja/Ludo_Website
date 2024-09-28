import BottomBar from "@/components/bottom-bar";

const DashboardLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return <div>
        <BottomBar />
        {children}
    </div>
}

export default DashboardLayout;
