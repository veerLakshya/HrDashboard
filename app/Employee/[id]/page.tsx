"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
} from "lucide-react";
import Image from "next/image";

export default function EmployeePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;
  const { user: employee, loading, error } = useUser(parseInt(employeeId));

  const [userExtras, setUserExtras] = useState<{
    rating: number;
    department: string;
  } | null>(null);

  useEffect(() => {
    if (employee) {
      const extras = getUserExtras(employee.id);
      setUserExtras(extras);
    }
  }, [employee]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }
  // to handle any undefined route param or errors
  if (!employee || error) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>{" "}
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              Employee Not Found
            </h1>
            <p className="text-gray-600 mb-4">
              The employee you&apos;re looking for doesn&apos;t exist.
            </p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden pb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-20" />

          <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-14 md:pt-6 md:pl-10">
            <div className="relative ">
              {employee.image ? (
                <Image
                  src={employee.image}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  width={120}
                  height={120}
                  className=" rounded-full border-4 border-white shadow-lg bg-white"
                />
              ) : (
                <div className="w-30 h-30 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {employee.firstName?.charAt(0)}
                    {employee.lastName?.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center md:ml-4">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {employee.firstName} {employee.lastName}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    <span>{userExtras?.department || "Engineering"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{userExtras?.rating || 1}/5</span>
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left side- contact info and quick stats card*/}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact information card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-800">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-gray-800">{employee.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <p className="text-gray-800">
                      {employee.address?.address}
                      <br />
                      {employee.address?.city}, {employee.address?.state}{" "}
                      {employee.address?.postalCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Quick Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Employee ID</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {employee.id}
                  </span>
                </div>{" "}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Department</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {userExtras?.department || "Engineering"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Performance</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (userExtras?.rating || 1)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">
                      ({userExtras?.rating || 1}/5)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* R side - detials */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal details card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Personal Details
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    First Name
                  </label>
                  <p className="text-gray-800 text-lg">{employee.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Last Name
                  </label>
                  <p className="text-gray-800 text-lg">{employee.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Gender
                  </label>
                  <p className="text-gray-800">
                    {employee.gender || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Age
                  </label>
                  <p className="text-gray-800">
                    {employee.age || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Birth Date
                  </label>
                  <p className="text-gray-800">
                    {employee.birthDate || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Blood Group
                  </label>
                  <p className="text-gray-800">
                    {employee.bloodGroup || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* Additional info card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Additional Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Height
                  </label>
                  <p className="text-gray-800">
                    {employee.height
                      ? `${employee.height} cm`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Weight
                  </label>
                  <p className="text-gray-800">
                    {employee.weight
                      ? `${employee.weight} kg`
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Eye Color
                  </label>
                  <p className="text-gray-800">
                    {employee.eyeColor || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Hair Color
                  </label>
                  <p className="text-gray-800">
                    {employee.hair?.color || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    University
                  </label>
                  <p className="text-gray-800">
                    {employee.university || "Not specified"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Company
                  </label>
                  <p className="text-gray-800">
                    {employee.company?.name || "Not specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* banking information card */}
            {/* {employee.bank && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Banking Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Bank Name
                    </label>
                    <p className="text-gray-800">
                      {employee.bank.cardType || "Not specified"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      IBAN
                    </label>
                    <p className="text-gray-800 font-mono text-sm">
                      {employee.bank.iban || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            )} */}
          </div>
        </div>

        {/* dummy action buttons */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Employee
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Send Message
          </button>
          <button className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}
