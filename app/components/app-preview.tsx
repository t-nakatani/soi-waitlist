"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

interface AppPreviewProps {
  isVisible: boolean
}

export function AppPreview({ isVisible }: AppPreviewProps) {
  const [activeTab, setActiveTab] = useState("all")

  const articles = [
    {
      id: 1,
      title: "With naturally fluid animations you will elevate your UI & interactions",
      description: "Using react-spring for creating smooth animations in React applications.",
      category: "tech",
      time: "47 minutes ago",
    },
    {
      id: 2,
      title: "React Native + EXPO 触ってみた",
      description: "An introductory article on mobile app development using Expo and React Native.",
      category: "tech",
      time: "3 hours ago",
    },
    {
      id: 3,
      title: "Storeの永続化にredux-persistを使う",
      description: "Using redux-persist to store application state in localStorage or AsyncStorage.",
      category: "tech",
      time: "5 hours ago",
    },
    {
      id: 4,
      title: "GitHub - siyuan-note/siyuan",
      description: "A privacy-first, self-hosted personal knowledge management software.",
      category: "business",
      time: "1 day ago",
    },
  ]

  const filteredArticles = activeTab === "all" ? articles : articles.filter((article) => article.category === activeTab)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 h-[600px] max-w-2xl mx-auto"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Soi</h3>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === "all" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("tech")}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === "tech" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Tech
          </button>
          <button
            onClick={() => setActiveTab("business")}
            className={`px-3 py-1 rounded-full text-sm ${
              activeTab === "business" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Business
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="記事を検索..."
            className="w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4 overflow-auto max-h-[420px] pr-2">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: article.id * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <h4 className="font-medium text-gray-900">{article.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{article.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{article.time}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                  {article.category === "tech" ? "Technology" : "Business"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}

