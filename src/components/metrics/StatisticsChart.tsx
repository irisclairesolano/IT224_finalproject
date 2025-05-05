"use client";
import React, { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

type ChartData = {
  categories: string[];
  posts: number[];
  comments: number[];
  users: number[];
};

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[310px] flex items-center justify-center">
      Loading activity data...
    </div>
  ),
});

export default function StatisticsChart() {
  const [timeRange, setTimeRange] = useState<string>("month");
  const [chartData, setChartData] = useState<ChartData>({
    categories: [],
    posts: [],
    comments: [],
    users: [],
  });

  const getCategories = () => {
    switch (timeRange) {
      case "week":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "month":
        return ["Week 1", "Week 2", "Week 3", "Week 4"];
      case "quarter":
        return ["Month 1", "Month 2", "Month 3"];
      case "year":
        return [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      default:
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, commentsRes, usersRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/comments"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        const [posts, comments, users] = await Promise.all([
          postsRes.json(),
          commentsRes.json(),
          usersRes.json(),
        ]);

        // Process data to match categories
        const categories = getCategories();
        const postsCount = Array(categories.length).fill(posts.length);
        const commentsCount = Array(categories.length).fill(comments.length);
        const usersCount = Array(categories.length).fill(users.length);

        setChartData({
          categories,
          posts: postsCount,
          comments: commentsCount,
          users: usersCount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeRange]);

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
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      borderColor: "#f1f1f1",
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => val.toLocaleString(),
      },
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "#6B7280",
        },
        formatter: (val) => val.toLocaleString(),
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
    { name: "Posts", data: chartData.posts },
    { name: "Comments", data: chartData.comments },
    { name: "Users", data: chartData.users },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Statistics Overview
        </h3>
        <div className="flex gap-2">
          {["week", "month", "quarter", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === range
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <ReactApexChart options={options} series={series} type="area" height={310} />
    </div>
  );
}