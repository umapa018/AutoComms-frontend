
import { useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import { X } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const Ytupload = () => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState("");
    const [uploadMessage, setUploadMessage] = useState("");

    // Hardcoded analytics data for visualization
    const analyticsData = [
        { name: "Posts", value: 25 },
        { name: "Likes", value: 300 },
        { name: "Comments", value: 45 },
    ];

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setUploadMessage("");
        if (!file) {
            setUploadMessage("Please select an image to upload.");
            return;
        }
        // Simulate upload success for demonstration
        setUploadMessage("Post uploaded successfully!");
        setFile(null);
        setCaption("");
    };

    return (
        <div className="relative mt-30 w-full min-h-screen overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
                <motion.h1
                    className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.2, scale: 1 }}
                    transition={{ duration: 2 }}
                >
                    AutoComms
                </motion.h1>
            </div>

            {/* Main Content */}
            <section className="relative z-10 p-6">
                <div className="max-w-5xl mx-auto bg-transparent bg-opacity-10 backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
                    {/* Left Column: Instagram Profile & Upload Form */}
                    <div className="flex-1">
                        <div className="flex flex-col items-center">
                            <FaYoutube className="w-16 h-16 text-red-500" />
                            <h2 className="text-2xl font-bold text-black mt-2">YouTube</h2>
                            <p className="text-gray-700">@yourusername</p>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-xl font-semibold text-black text-center mb-4">
                                Upload Video
                            </h3>
                            {uploadMessage && (
                                <p className="text-center text-green-500 mb-2">{uploadMessage}</p>
                            )}
                            <form onSubmit={handleUpload} className="space-y-4">
                                {/* Upload Box */}
                                <div>
                                    {!file ? (
                                        <>
                                            <label
                                                htmlFor="instaFile"
                                                className="block text-sm font-medium text-black mb-2"
                                            >
                                                Upload Video
                                            </label>
                                            <div className="p-1 rounded-md">
                                                <div className="flex items-center justify-center px-4 py-3 border-2 border-dashed rounded-md bg-white hover:bg-gray-50 transition">
                                                    <span className="text-gray-600">
                                                        Drag and drop here, or{" "}
                                                    </span>
                                                    <label
                                                        htmlFor="instaFile"
                                                        className="ml-2 text-blue-600 hover:underline cursor-pointer"
                                                    >
                                                        browse
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="instaFile"
                                                        accept="video/*"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mt-2 flex items-center justify-between px-4 py-2 bg-white rounded shadow w-64">
                                            <span className="text-sm text-gray-700 truncate">
                                                {file.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => setFile(null)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {/* Caption Input */}
                                <div>
                                    <label
                                        htmlFor="caption"
                                        className="block text-sm font-medium text-black mb-1"
                                    >
                                        Caption
                                    </label>
                                    <input
                                        type="text"
                                        id="caption"
                                        placeholder="Enter caption"
                                        value={caption}
                                        onChange={(e) => setCaption(e.target.value)}
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 bg-transparent text-black"
                                    />
                                </div>
                                {/* Submit Button */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                                    >
                                        Upload Post
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Analytics Chart */}
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-black text-center mb-4">
                            Instagram Analytics
                        </h3>
                        <div className="w-full h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analyticsData}>
                                    <XAxis dataKey="name" stroke="#000" />
                                    <YAxis stroke="#000" />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8B5CF6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Ytupload;
