import { Metadata } from "next";
import React from "react";
import { Users, Star, Building, Activity } from "lucide-react";
import AnalyticsCharts from "./AnalyticsCharts";

export const metadata: Metadata = {
  title: "Analytics | Flam HR Dashboard",
  description:
    "View comprehensive analytics and insights about your team performance, department statistics, and employee data.",
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating?: number;
  department?: string;
};

const DEPARTMENTS = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
];

type DepartmentData = {
  total: number;
  count: number;
  ratings: number[];
};

type DepartmentStats = Record<string, number>;

// Server-side function to generate user extras (deterministic based on user ID)
const generateUserExtras = (userId: number) => {
  const seed = userId;

  const deterministicRandom = (seed: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };

  return {
    rating: deterministicRandom(seed, 5) + 1,
    department: DEPARTMENTS[deterministicRandom(seed * 2, DEPARTMENTS.length)],
  };
};

// Server-side data fetching function
async function getAnalyticsData() {
  try {
    // Fetch user data
    const res = await fetch("https://dummyjson.com/users?limit=20", {});
    const data = await res.json();
    const users = data.users;

    // Generate consistent ratings and departments server-side
    const enhancedUsers = users.map((user: User) => {
      const extras = generateUserExtras(user.id);
      return {
        ...user,
        rating: extras.rating,
        department: extras.department,
      };
    }); // Generate department ratings analytics
    const departmentRatings = enhancedUsers.reduce(
      (acc: Record<string, DepartmentData>, user: User) => {
        const dept = user.department || "Unknown";
        if (!acc[dept]) {
          acc[dept] = { total: 0, count: 0, ratings: [] };
        }
        acc[dept].total += user.rating || 0;
        acc[dept].count += 1;
        acc[dept].ratings.push(user.rating || 0);
        return acc;
      },
      {}
    );

    const departmentRatingsData = Object.entries(departmentRatings).map(
      ([dept, data]) => {
        const d = data as DepartmentData;
        return {
          department: dept,
          averageRating: (d.total / d.count).toFixed(1),
          totalEmployees: d.count,
          maxRating: Math.max(...d.ratings),
          minRating: Math.min(...d.ratings),
        };
      }
    );

    // Generate rating distribution
    const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
      const rating = i + 1;
      const count = enhancedUsers.filter(
        (user: User) => user.rating === rating
      ).length;
      return {
        rating: `${rating} Star${rating !== 1 ? "s" : ""}`,
        count,
        percentage: ((count / enhancedUsers.length) * 100).toFixed(1),
      };
    }); // Generate department stats
    const departmentStats = Object.entries(
      enhancedUsers.reduce((acc: DepartmentStats, user: User) => {
        const dept = user.department || "Unknown";
        acc[dept] = (acc[dept] || 0) + 1;
        return acc;
      }, {})
    ).map(([department, count]) => ({
      department,
      count: Number(count), // Ensure count is a number
    }));

    // Generate bookmark trends (simulated monthly data)
    const bookmarkTrends = Array.from({ length: 6 }, (_, i) => {
      const monthsAgo = 5 - i;
      const date = new Date();
      date.setMonth(date.getMonth() - monthsAgo);

      return {
        month: date.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        bookmarks: Math.floor(Math.random() * 15) + 5 + i * 2, // Trending up
        newBookmarks: Math.floor(Math.random() * 8) + 2,
      };
    });

    // Calculate overall average rating
    const overallAvgRating =
      departmentRatingsData.length > 0
        ? (
            departmentRatingsData.reduce(
              (sum, dept) => sum + parseFloat(dept.averageRating),
              0
            ) / departmentRatingsData.length
          ).toFixed(1)
        : "0.0";

    return {
      departmentRatings: departmentRatingsData,
      bookmarkTrends,
      ratingDistribution,
      departmentStats,
      totalEmployees: enhancedUsers.length,
      totalDepartments: departmentStats.length,
      overallAvgRating,
    };
  } catch (error) {
    console.error("Error generating analytics:", error);
    return {
      departmentRatings: [],
      bookmarkTrends: [],
      ratingDistribution: [],
      departmentStats: [],
      totalEmployees: 0,
      totalDepartments: 0,
      overallAvgRating: "0.0",
    };
  }
}

const Analytics = async () => {
  const analyticsData = await getAnalyticsData();
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Activity className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-3xl font-bold text-white">HR Analytics</h1>
          <p className="text-gray-300 mt-1">
            Insights into employee ratings, departments, and bookmark trends
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">
                Total Employees
              </p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.totalEmployees}
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Departments</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.totalDepartments}
              </p>
            </div>
            <Building className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Avg Rating</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.overallAvgRating}
              </p>
            </div>
            <Star className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Max Rating</p>
              <p className="text-2xl font-bold text-white">
                {analyticsData.ratingDistribution.length}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      </div>

      {/* Charts Component */}
      <AnalyticsCharts analyticsData={analyticsData} />
    </div>
  );
};

export default Analytics;
