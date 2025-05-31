"use client";

import React, { useState, useEffect } from "react";
import { Bookmark } from "lucide-react";

const BOOKMARKS_STORAGE_KEY = "hr_dashboard_bookmarks";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating?: number;
  department?: string;
};

type DepartmentRating = {
  department: string;
  averageRating: string;
  totalEmployees: number;
  maxRating: number;
  minRating: number;
};

type BookmarkTrend = {
  month: string;
  bookmarks: number;
  newBookmarks: number;
};

type RatingDistribution = {
  rating: string;
  count: number;
  percentage: string;
};

type DepartmentStat = {
  department: string;
  count: number;
};

type AnalyticsData = {
  departmentRatings: DepartmentRating[];
  bookmarkTrends: BookmarkTrend[];
  ratingDistribution: RatingDistribution[];
  departmentStats: DepartmentStat[];
  totalEmployees: number;
  totalDepartments: number;
  overallAvgRating: string;
};

interface AnalyticsChartsProps {
  analyticsData: AnalyticsData;
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ analyticsData }) => {
  const [bookmarkedUsers, setBookmarkedUsers] = useState<User[]>([]);

  // load bookmarks from locals
  useEffect(() => {
    const getBookmarksFromStorage = (): User[] => {
      if (typeof window === "undefined") return [];
      try {
        const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error("Error loading bookmarks:", error);
        return [];
      }
    };

    const bookmarks = getBookmarksFromStorage();
    setBookmarkedUsers(bookmarks);
  }, []);

  return (
    <>
      {/* Bookmarks Stats Card */}
      <div className="mb-8">
        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800 max-w-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">
                Total Bookmarks
              </p>
              <p className="text-2xl font-bold text-white">
                {bookmarkedUsers.length}
              </p>
            </div>
            <Bookmark className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Data Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Ratings Table */}
        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Average Rating by Department
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-4 text-gray-300">
                    Department
                  </th>
                  <th className="text-left py-2 px-4 text-gray-300">
                    Avg Rating
                  </th>
                  <th className="text-left py-2 px-4 text-gray-300">
                    Employees
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.departmentRatings.map((dept, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-700 hover:bg-zinc-800"
                  >
                    <td className="py-2 px-4 text-gray-200">
                      {dept.department}
                    </td>
                    <td className="py-2 px-4 text-gray-200">
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1">{dept.averageRating}</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-gray-200">
                      {dept.totalEmployees}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rating Distribution Table */}
        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Rating Distribution
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-4 text-gray-300">Rating</th>
                  <th className="text-left py-2 px-4 text-gray-300">Count</th>
                  <th className="text-left py-2 px-4 text-gray-300">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.ratingDistribution.map((rating, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-700 hover:bg-zinc-800"
                  >
                    <td className="py-2 px-4 text-gray-200">{rating.rating}</td>
                    <td className="py-2 px-4 text-gray-200">{rating.count}</td>
                    <td className="py-2 px-4 text-gray-200">
                      {rating.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Stats Table */}
        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Department Employee Count
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-4 text-gray-300">
                    Department
                  </th>
                  <th className="text-left py-2 px-4 text-gray-300">
                    Total Employees
                  </th>
                  <th className="text-left py-2 px-4 text-gray-300">
                    Bookmarked
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.departmentStats.map((dept, index) => {
                  const bookmarkedCount = bookmarkedUsers.filter(
                    (user) => user.department === dept.department
                  ).length;
                  return (
                    <tr
                      key={index}
                      className="border-b border-zinc-700 hover:bg-zinc-800"
                    >
                      <td className="py-2 px-4 text-gray-200">
                        {dept.department}
                      </td>
                      <td className="py-2 px-4 text-gray-200">{dept.count}</td>
                      <td className="py-2 px-4 text-gray-200">
                        {bookmarkedCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bookmark Trends Table */}
        <div className="bg-zinc-900 p-6 rounded-lg shadow-md border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-4">
            Bookmark Trends (Simulated)
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 px-4 text-gray-300">Month</th>
                  <th className="text-left py-2 px-4 text-gray-300">
                    Total Bookmarks
                  </th>
                  <th className="text-left py-2 px-4 text-gray-300">
                    New Bookmarks
                  </th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.bookmarkTrends.map((trend, index) => (
                  <tr
                    key={index}
                    className="border-b border-zinc-700 hover:bg-zinc-800"
                  >
                    <td className="py-2 px-4 text-gray-200">{trend.month}</td>
                    <td className="py-2 px-4 text-gray-200">
                      {trend.bookmarks}
                    </td>
                    <td className="py-2 px-4 text-gray-200">
                      {trend.newBookmarks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalyticsCharts;
