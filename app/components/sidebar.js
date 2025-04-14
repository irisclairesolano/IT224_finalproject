import React from 'react';

// const Sidebar = () => {
//     console.log("Sidebar component rendered");
//   return (
//     <aside className="w-64 bg-white shadow-md p-6 h-screen fixed left-0 top-0">
//       <h2 className="text-2xl font-bold mb-8 text-blue-600">🛠️ Admin Panel</h2>

    //   <nav className="space-y-4 text-gray-700">
    //     <div className="cursor-pointer hover:text-blue-500">📊 Dashboard</div>
    //     <div className="cursor-pointer hover:text-blue-500">👥 Manage Users</div>
    //     <div className="cursor-pointer hover:text-blue-500">📝 Manage Posts</div>
    //     <div className="cursor-pointer hover:text-blue-500">🚨 Report Center</div>
    //     <div className="cursor-pointer hover:text-blue-500">✉️ Admin Messages</div>
    //     <div className="cursor-pointer hover:text-blue-500">⚙️ App Settings</div>
    //     <div className="cursor-pointer hover:text-blue-500">📁 System Logs</div>
    //     <div className="cursor-pointer hover:text-blue-500">👑 My Admin Profile</div>
    //     <div className="cursor-pointer text-red-500 hover:text-red-700">🚪 Logout</div>
    //   </nav>
//     </aside>
//   );
// };

// export default Sidebar;


export default function Sidebar({ isOpen, toggleSidebar }) {
    return (
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-700"
        >
          ❌
        </button>
        <nav className="space-y-4 text-gray-700">
        <div className="cursor-pointer hover:text-blue-500">📊 Dashboard</div>
        <div className="cursor-pointer hover:text-blue-500">👥 Manage Users</div>
        <div className="cursor-pointer hover:text-blue-500">📝 Manage Posts</div>
        <div className="cursor-pointer hover:text-blue-500">🚨 Report Center</div>
        <div className="cursor-pointer hover:text-blue-500">✉️ Admin Messages</div>
        <div className="cursor-pointer hover:text-blue-500">⚙️ App Settings</div>
        <div className="cursor-pointer hover:text-blue-500">📁 System Logs</div>
        <div className="cursor-pointer hover:text-blue-500">👑 My Admin Profile</div>
        <div className="cursor-pointer text-red-500 hover:text-red-700">🚪 Logout</div>
      </nav>
      </aside>
    );
  }
  