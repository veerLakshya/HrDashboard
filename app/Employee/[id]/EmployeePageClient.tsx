"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs } from "@/components/Tabs";
import { useBookmarks } from "@/Hooks/useBookmarks";
import Image from "next/image";
import useUser from "@/Hooks/useEmployee";
import { getUserExtras } from "@/utils/userDataManager";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Star,
  Building,
  User,
  Bookmark,
} from "lucide-react";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  gender?: string;
  age?: number;
  birthDate?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color?: string;
  };
  university?: string;
  company?: {
    name?: string;
  };
  image?: string;
}

export default function EmployeePageClient() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;

  // parse the employeeid to handle invalid cases
  const parsedEmployeeId = employeeId ? parseInt(employeeId) : null;
  const validEmployeeId =
    parsedEmployeeId && !isNaN(parsedEmployeeId) ? parsedEmployeeId : null;

  const { user: employee, loading, error } = useUser(validEmployeeId);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  const [userExtras, setUserExtras] = useState<{
    rating: number;
    department: string;
  } | null>(null);

  // fetch (rating, department) usign extra
  useEffect(() => {
    if (employee) {
      const extras = getUserExtras(employee.id);
      setUserExtras(extras);
    }
  }, [employee]);

  // handle adding bookmark
  const handleBookmarkClick = () => {
    if (employee) {
      toggleBookmark({
        ...employee,
        rating: userExtras?.rating,
        department: userExtras?.department,
      });
    }
  };
  // handle loading
  if (loading && validEmployeeId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D6FF00] mx-auto mb-4"></div>
          <p className="text-lg text-gray-300">Loading employee details...</p>
        </div>
      </div>
    );
  }
  // show error or not found state
  if (
    (!validEmployeeId && employeeId) ||
    (!employee && !loading && employeeId) ||
    error
  ) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="bg-zinc-900 p-8 rounded-lg shadow-md max-w-md w-full border border-zinc-800">
          <div className="text-center">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">
              Employee Not Found
            </h1>
            <p className="text-gray-300 mb-4">
              {!validEmployeeId && employeeId
                ? "Invalid employee ID provided."
                : "The employee you're looking for doesn't exist."}
            </p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[#D6FF00] text-black rounded-lg hover:bg-[#B8E600] transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // if no employee, return null
  if (!employee) {
    return null;
  }

  return (
    <div className="mb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* back to dashboard*/}
        <div className="mt-10 mb-10">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-300 hover:text-[#] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
        </div>
        {/* header card */}
        <div className="bg-zinc-900 rounded-lg shadow-md mb-6 overflow-hidden pb-8 border border-zinc-800">
          {/*gradient */}
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-700 h-20" />
          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-14 md:pt-6 md:pl-10">
            {/* photo name info */}
            <div className="relative">
              {employee.image ? (
                <Image
                  src={employee.image}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-zinc-800 shadow-lg bg-zinc-900"
                />
              ) : (
                <div className="w-30 h-30 bg-gradient-to-br from-zinc-700 to-zinc-600 rounded-full flex items-center justify-center border-4 border-zinc-800 shadow-lg">
                  <span className="text-[#D6FF00] text-3xl font-bold">
                    {employee.firstName?.charAt(0)}
                    {employee.lastName?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between md:ml-4">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3 justify-center md:justify-start">
                  {employee.firstName} {employee.lastName}
                  <button
                    onClick={handleBookmarkClick}
                    className={`ml-2 p-2 rounded-lg transition-colors border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-zinc-900
                      ${
                        isBookmarked(employee.id)
                          ? "bg-zinc-800 text-yellow-500 hover:bg-zinc-700"
                          : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                      }`}
                    title={
                      isBookmarked(employee.id)
                        ? "Remove Bookmark"
                        : "Add Bookmark"
                    }
                  >
                    {/* bookmark svg, dont get confused again */}
                    <Bookmark
                      className={`w-5 h-5 ${
                        isBookmarked(employee.id) ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </h1>
                {/* small quick info to conver space*/}
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-300">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>{userExtras?.department || "Engineering"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{userExtras?.rating || 3}/5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main details */}
        <Tabs
          tabs={[
            {
              id: "overview",
              label: "Overview",
              content: (
                <OverviewTab employee={employee} userExtras={userExtras} />
              ),
            },
            {
              id: "projects",
              label: "Projects",
              content: <ProjectsTab />,
            },
            {
              id: "feedback",
              label: "Feedback",
              content: <FeedbackTab />,
            },
          ]}
          defaultTab="overview"
        />
      </div>
    </div>
  );
}

// overview of data from api
function OverviewTab({
  employee,
  userExtras,
}: {
  employee: Employee;
  userExtras: { rating: number; department: string } | null;
}) {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* LS - contact info and quick stats */}
      <div className="lg:col-span-1 space-y-8">
        {/* Contact information card */}
        <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
          <h2 className="text-xl font-semibold text-white mb-5">
            Contact Information
          </h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-[#D6FF00] mt-0.5" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Email</p>
                <p className="text-gray-200">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 text-[#D6FF00] mt-0.5" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Phone</p>
                <p className="text-gray-200">{employee.phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-[#D6FF00] mt-0.5" />
              <div>
                <p className="text-sm text-gray-400 mb-1">Address</p>
                <p className="text-gray-200">
                  {employee.address?.address}
                  <br />
                  {employee.address?.city}, {employee.address?.state}{" "}
                  {employee.address?.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* quick stats card */}
        <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
          <h2 className="text-xl font-semibold text-white mb-5">Quick Stats</h2>
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Employee ID</span>
              <span className="font-mono text-sm bg-zinc-800 text-white px-3 py-1.5 rounded border border-zinc-700">
                {employee.id}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Department</span>
              <span className="bg-zinc-800 text-[#D6FF00] px-4 py-1.5 rounded-full text-sm border border-zinc-700">
                {userExtras?.department || "Engineering"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Performance</span>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (userExtras?.rating || 1)
                        ? "text-[#D6FF00] fill-[#D6FF00]"
                        : "text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">
                  ({userExtras?.rating || 1}/5)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* RS - detailed info*/}
      <div className="lg:col-span-2 space-y-8">
        {/* personal details card */}
        <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
          <h2 className="text-xl font-semibold text-white mb-5">
            Personal Details
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                First Name
              </label>
              <p className="text-white text-lg">{employee.firstName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Last Name
              </label>
              <p className="text-white text-lg">{employee.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Gender
              </label>
              <p className="text-gray-200">
                {employee.gender || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Age
              </label>
              <p className="text-gray-200">{employee.age || "Not specified"}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Birth Date
              </label>
              <p className="text-gray-200">
                {employee.birthDate || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Blood Group
              </label>
              <p className="text-gray-200">
                {employee.bloodGroup || "Not specified"}
              </p>
            </div>
          </div>
        </div>{" "}
        {/* additional info card */}
        <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
          <h2 className="text-xl font-semibold text-white mb-5">
            Additional Information
          </h2>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Height
              </label>
              <p className="text-gray-200">
                {employee.height ? `${employee.height} cm` : "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Weight
              </label>
              <p className="text-gray-200">
                {employee.weight ? `${employee.weight} kg` : "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Eye Color
              </label>
              <p className="text-gray-200">
                {employee.eyeColor || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Hair Color
              </label>
              <p className="text-gray-200">
                {employee.hair?.color || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                University
              </label>
              <p className="text-gray-200">
                {employee.university || "Not specified"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Previous Companies
              </label>
              <p className="text-gray-200">
                {employee.company?.name || "Not specified"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// dummy projects display
function ProjectsTab() {
  const mockProjects = [
    {
      id: 1,
      name: "E-commerce Platform Redesign",
      status: "In Progress",
      progress: 75,
      deadline: "2024-12-15",
      priority: "High",
      description:
        "Complete redesign of the company's e-commerce platform to improve user experience and conversion rates.",
    },
    {
      id: 2,
      name: "Mobile App Development",
      status: "Completed",
      progress: 100,
      deadline: "2024-11-30",
      priority: "Medium",
      description:
        "Development of a mobile application for iOS and Android platforms.",
    },
    {
      id: 3,
      name: "Database Optimization",
      status: "Planning",
      progress: 25,
      deadline: "2025-01-20",
      priority: "Low",
      description:
        "Optimize database queries and improve overall system performance.",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
        <h2 className="text-xl font-semibold text-white mb-6">
          Current Projects
        </h2>
        <div className="space-y-5">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="border border-zinc-700 rounded-xl p-5 bg-zinc-800 hover:bg-zinc-750 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white text-lg mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-4 ${
                    project.status === "Completed"
                      ? "bg-green-900/50 text-green-200 border border-green-800"
                      : project.status === "In Progress"
                      ? "bg-[#D6FF00]/10 text-[#D6FF00] border border-[#D6FF00]/20"
                      : "bg-yellow-900/50 text-yellow-200 border border-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <span className="flex items-center gap-1">
                  <span className="text-[#D6FF00]">Progress:</span>{" "}
                  {project.progress}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="text-[#D6FF00]">Deadline:</span>{" "}
                  {project.deadline}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    project.priority === "High"
                      ? "bg-red-900/50 text-red-200 border border-red-800"
                      : project.priority === "Medium"
                      ? "bg-yellow-900/50 text-yellow-200 border border-yellow-800"
                      : "bg-green-900/50 text-green-200 border border-green-800"
                  }`}
                >
                  {project.priority} Priority
                </span>
              </div>

              <div className="w-full bg-zinc-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-[#D6FF00] to-[#B8E600] h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// dummy feedbacks data and form
function FeedbackTab() {
  const mockFeedback = [
    {
      id: 1,
      reviewer: "Sarah Johnson",
      role: "Team Lead",
      date: "2024-11-15",
      rating: 5,
      comment:
        "Excellent work on the recent project. Shows great leadership skills and technical expertise.",
      type: "Performance Review",
    },
    {
      id: 2,
      reviewer: "Mike Chen",
      role: "Project Manager",
      date: "2024-10-28",
      rating: 4,
      comment:
        "Great collaboration skills and always delivers on time. Could improve on documentation.",
      type: "Peer Review",
    },
    {
      id: 3,
      reviewer: "Lisa Wong",
      role: "Senior Developer",
      date: "2024-10-10",
      rating: 5,
      comment:
        "Very helpful mentor to junior developers. Technical knowledge is outstanding.",
      type: "360 Feedback",
    },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
        <h2 className="text-xl font-semibold text-white mb-6">
          Recent Feedback
        </h2>
        <div className="space-y-6">
          {mockFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="border-l-4 border-[#D6FF00] pl-5 py-3 bg-zinc-800/50 rounded-r-lg hover:bg-zinc-800 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white text-lg">
                    {feedback.reviewer}
                  </h3>
                  <p className="text-sm text-gray-400">{feedback.role}</p>
                </div>{" "}
                <div className="text-right mr-2">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 mr-0.5 ${
                          i < feedback.rating
                            ? "text-[#D6FF00] fill-[#D6FF00]"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">{feedback.date}</p>
                </div>
              </div>
              <p className="text-gray-300 mb-3 leading-relaxed">
                {feedback.comment}
              </p>
              <span className="inline-block px-3 py-1.5 bg-zinc-800 text-[#D6FF00] text-xs rounded-full border border-zinc-700">
                {feedback.type}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200">
        <h2 className="text-xl font-semibold text-white mb-6">
          Leave Feedback
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Feedback Type
            </label>
            <select className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#D6FF00] focus:border-[#D6FF00] transition-all duration-200">
              <option>Performance Review</option>
              <option>Peer Review</option>
              <option>360 Feedback</option>
              <option>General Feedback</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Feedback
            </label>
            <textarea
              className="w-full p-4 bg-zinc-800 text-white border border-zinc-700 rounded-lg focus:ring-2 focus:ring-[#D6FF00] focus:border-[#D6FF00] transition-all duration-200"
              rows={4}
              placeholder="Share your feedback..."
            />
          </div>
          <button className="px-6 py-3 bg-[#D6FF00] text-black rounded-lg hover:bg-[#B8E600] transition-colors font-medium">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
