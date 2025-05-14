import { UsersStat } from "@/components/metrics/UsersStat";
// import MonthlyTarget from "@/components/metrics/MonthlyTarget";
import ActiveUsersChart from "@/components/metrics/ActiveUsersChart";
import StatisticsChart from "@/components/metrics/StatisticsChart";
// import RecentOrders from "@/components/metrics/RecentOrders";
// import DemographicCard from "@/components/metrics/DemographicCard";



export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 ">
        <UsersStat />

        <ActiveUsersChart />
      </div>

      {/* <div className="col-span-12 xl:col-span-5"> */}
        {/* <MonthlyTarget /> */}
      {/* </div> */}

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        {/* <DemographicCard /> */}
      </div>

      <div className="col-span-12 xl:col-span-7">
        {/* <RecentOrders /> */}
      </div>
    </div>
  );
}
