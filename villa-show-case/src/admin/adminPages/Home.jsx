import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import AxiosToastError from "../../utils/AxiosToastError";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";

const Home = () => {
  const [dashboardData, setDashboardData] = useState({
    totalVillas: 0,
    totalUsers: 0,
    growthRate: "0%",
    totalRevenue: "$0",
    monthlyData: [],
    villaTypeDistribution: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAdminDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.adminSummary,
      });

      const { data: responseData } = response;
      console.log("API Response:", responseData);

      if (responseData.success) {
        setDashboardData(responseData.data);
      } else {
        console.error("API call unsuccessful:", responseData);
      }
    } catch (error) {
      console.error("API Error:", error);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  // Prepare data for overview chart
  const overviewData = [
    {
      name: "Villas",
      count: dashboardData.totalVillas,
      color: "#3B82F6",
    },
    {
      name: "Users",
      count: dashboardData.totalUsers,
      color: "#10B981",
    },
  ];

  // Prepare data for pie chart
  const pieData =
    dashboardData.villaTypeDistribution?.map((item, index) => ({
      name: item._id || "Unknown",
      value: item.count,
      color: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5],
    })) || [];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  if (loading) {
    return (
      <section className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white shadow-lg p-6 rounded-lg animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white shadow-lg p-6 rounded-lg animate-pulse"
            >
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="p-6 bg-gray-50 min-h-screen flex flex-col gap-8">
      <h1 className="text-3xl font-bold  text-gray-800">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg py-2 px-6 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Villas
              </h2>
              <p className="text-3xl font-bold text-blue-600">
                {dashboardData.totalVillas || 0}
              </p>
            </div>
            <div className="text-blue-500">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V15a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 001 1h3a1 1 0 001-1v-2.586l.293.293a1 1 0 001.414-1.414l-9-9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg py-2 px-6 rounded-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Total Users
              </h2>
              <p className="text-3xl font-bold text-green-600">
                {dashboardData.totalUsers || 0}
              </p>
            </div>
            <div className="text-green-500">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg py-2 px-6 rounded-lg border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Growth Rate
              </h2>
              <p className="text-3xl font-bold text-yellow-600">
                {dashboardData.growthRate || "0%"}
              </p>
            </div>
            <div className="text-yellow-500">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg py-2 px-6 rounded-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                Revenue
              </h2>
              <p className="text-3xl font-bold text-purple-600">
                {dashboardData.totalRevenue || "$0"}
              </p>
            </div>
            <div className="text-purple-500">
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview Bar Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={overviewData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3B82F6" radius={[1, 1, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Villa Type Distribution Pie Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800">
            Villa Type Distribution
          </h3>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <p>No villa type data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Bookings Line Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Bookings Trend
          </h3>
          {dashboardData.monthlyData && dashboardData.monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <p>No monthly data available</p>
            </div>
          )}
        </div>

        {/* Monthly Revenue Area Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Monthly Revenue
          </h3>
          {dashboardData.monthlyData && dashboardData.monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dashboardData.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `$${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <p>No monthly revenue data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Bookings
          </h3>
          {dashboardData.recentBookings &&
          dashboardData.recentBookings.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.recentBookings
                .slice(0, 5)
                .map((booking, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-800">
                        {booking.villaName || "Villa"}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.userName || "Guest"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">
                        ${booking.amount || 0}
                      </p>
                      <p className="text-xs text-gray-500">
                        {booking.date
                          ? new Date(booking.date).toLocaleDateString()
                          : "Today"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No recent bookings</p>
            </div>
          )}
        </div>

        {/* Top Performing Villas */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Top Performing Villas
          </h3>
          {dashboardData.topVillas && dashboardData.topVillas.length > 0 ? (
            <div className="space-y-3">
              {dashboardData.topVillas.slice(0, 5).map((villa, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">
                        {villa.name || `Villa ${index + 1}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {villa.bookings || 0} bookings
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-blue-600">
                      ${villa.revenue || 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No villa data available</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Active Users</p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </div>
              <p className="text-lg font-bold text-blue-600">
                {dashboardData.activeUsers ||
                  Math.floor(dashboardData.totalUsers * 0.7)}
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Avg. Booking</p>
                  <p className="text-sm text-gray-600">Per villa</p>
                </div>
              </div>
              <p className="text-lg font-bold text-green-600">
                ${dashboardData.avgBookingValue || 1250}
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-yellow-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Occupancy Rate</p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </div>
              <p className="text-lg font-bold text-yellow-600">
                {dashboardData.occupancyRate || "78%"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
