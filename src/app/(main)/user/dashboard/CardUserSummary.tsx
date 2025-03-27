import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAllUser } from "@/lib/queries";
// Remove or mock the actual query call
// import { getAllUser } from "@/lib/queries"; 

const CardUserSummary = () => {
  const [users, setUsers] = useState<[]>([]); // Adjust type if needed
  const [, setIsLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("weekly");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUser(); // assuming getAllUser() is an async function
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date string: ${dateString}`);
      return null;
    }
    return date;
  };

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    const endOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
    return {
      start: startOfWeek.toLocaleDateString(),
      end: endOfWeek.toLocaleDateString(),
    };
  };

  const userData = users
    .map((user) => {
      const date = parseDate(user.createdAt);
      return date
        ? {
            date: date.toISOString(),
            creationDate: user.createdAt,
            userName: user.name,
          }
        : null;
    })
    .filter(Boolean);

  const calculateUsersPerTimeframe = () => {
    const groupedData: Record<string, number> = {};

    userData.forEach((user) => {
      const date = new Date(user.date);
      let key = "";

      if (timeframe === "daily") {
        key = date.toDateString();
      } else if (timeframe === "weekly") {
        const { start, end } = getWeekRange(date);
        key = `${start} - ${end}`;
      } else if (timeframe === "monthly") {
        key = `${date.getMonth() + 1}-${date.getFullYear()}`;
      }

      if (!groupedData[key]) groupedData[key] = 0;
      groupedData[key]++;
    });

    return Object.entries(groupedData).map(([key, count]) => ({
      date: key,
      userCount: count,
    }));
  };

  const chartData = calculateUsersPerTimeframe();
  const totalUsers = users.length;

  return (
    <div className="bg-white shadow-md rounded-lg p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">User Summary</h2>
      </div>

      {/* Body */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-gray-500">Users Created</p>
          <div className="flex items-center">
            <span className="text-2xl font-bold text-primary">{totalUsers}</span>
            <span className="text-green-500 text-sm ml-2">
              <TrendingUp className="inline w-4 h-4 mr-1" />
              {userData.length}
            </span>
          </div>
        </div>

        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="border border-gray-300 rounded p-2 text-sm"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip
            formatter={(value) => `${value}`}
            labelFormatter={(label) => label}
          />
          <Bar
            dataKey="userCount"
            fill="#3182ce"
            barSize={10}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex justify-between items-center text-sm mt-4">
        <p>{totalUsers} users created</p>
      </div>
    </div>
  );
};

export default CardUserSummary;
