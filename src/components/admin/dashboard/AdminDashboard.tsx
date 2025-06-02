import OverviewDashboard from '@/components/admin/dashboard/OverviewDashboard.tsx'
import RecentActivity from '@/components/admin/dashboard/RecentActivity.tsx'

const AdminDashboard = ({}) =>
    (
        <div className="mx-auto max-w-7xl">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                    Store Dashboard
                </h1>
                <p className="mt-1 text-gray-500">
                    Welcome back! Here's what's happening with your store today.
                </p>
            </header>

            <OverviewDashboard/>

            {/*<QuickActions/>*/}

            <RecentActivity/>
        </div>
    )

export default AdminDashboard
