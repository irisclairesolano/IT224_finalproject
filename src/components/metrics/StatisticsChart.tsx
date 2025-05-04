"use client";
import React, { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <div className="h-[310px] flex items-center justify-center">Loading activity data...</div>,
});

const timePeriods = [
  { label: "Weekly", value: "week" },
  { label: "Monthly", value: "month" },
  { label: "Quarterly", value: "quarter" },
  { label: "Annually", value: "year" }
];

export default function StatisticsChart() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeRange, setTimeRange] = useState("month");
  
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Generate data based on selected time range
  const generateData = () => {
    switch(timeRange) {
      case "week":
        return {
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          posts: [45, 52, 38, 60, 48, 90, 75],
          comments: [120, 150, 110, 180, 140, 210, 190],
          activity: [320, 400, 350, 450, 380, 500, 470]
        };
      case "quarter":
        return {
          categories: ["Q1", "Q2", "Q3", "Q4"],
          posts: [450, 520, 480, 600],
          comments: [1200, 1500, 1400, 1800],
          activity: [3200, 4000, 3800, 4500]
        };
      case "year":
        return {
          categories: ["2020", "2021", "2022", "2023", "2024"],
          posts: [1800, 2200, 2500, 3000, 3500],
          comments: [5000, 6500, 8000, 9500, 11000],
          activity: [15000, 20000, 25000, 30000, 35000]
        };
      case "month":
      default:
        return {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          posts: [150, 180, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
          comments: [400, 450, 420, 410, 430, 400, 420, 500, 550, 520, 600, 580],
          activity: [1200, 1400, 1300, 1250, 1350, 1300, 1400, 1600, 1800, 1700, 1900, 1850]
        };
    }
  };

  const { categories, posts, comments, activity } = generateData();

  const options: ApexOptions = {
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
      animations: {
        enabled: true,
        easing: "easeInOut",
        speed: 800,
      },
    },
    colors: ["#465FFF", "#FF8A56", "#6DD230"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100]
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      borderColor: '#f1f1f1',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => val.toLocaleString()
      }
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
        formatter: (val) => val.toLocaleString()
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
    },
  };

  const series = [
    {
      name: "Posts",
      data: posts,
    },
    {
      name: "Comments",
      data: comments,
    },
    {
      name: "User Activity",
      data: activity,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Community Activity
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Track user engagement across the platform
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {timePeriods.map((period) => (
              <button
                key={period.value}
                onClick={() => setTimeRange(period.value)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  timeRange === period.value
                    ? "bg-white dark:bg-gray-700 shadow-sm font-medium"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          {isMounted && (
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={310}
              width="100%"
            />
          )}
        </div>
      </div>
    </div>
  );
}