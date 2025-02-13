// import { motion } from "framer-motion";

// const Classes = () => {
//     return (
//         <div className="relative w-full min-h-screen overflow-hidden">
            
//             {/*  Background (Gradient + Large Text) */}
//             <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500">
                
//                 {/* Large "AutoComms" Text in Background */}
//                 <motion.h1 
//                     className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
//                     initial={{ opacity: 0, scale: 0 }}
//                     animate={{ opacity: 0.2, scale: 1 }}
//                     transition={{ duration: 2 }}
//                 >
//                     AutoComms
//                 </motion.h1>
//             </div>

//             {/*  Main Content Section */}
//             <section className="relative z-10 flex items-center justify-center min-h-screen">
//                 <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg">
//                     <h2 className="text-3xl font-bold">Hello Classes page</h2>
//                 </div>
//             </section>

//             {/** display */}

//         </div>
//     );
// };

// export default Classes;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Classes = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/classes/my-classes",{
                    method:"GET",
                    credentials:"include",
                }); 
                if (!response.ok) throw new Error("Failed to fetch data");
                const result = await response.json();
                await setData(result.classes);
                console.log(data,result.classes);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            {/* Background */}
            <div 
                className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500"
                style={{ pointerEvents: "none" }} // Prevents background from blocking interactions
            >
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
            <section className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
                <div className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl text-black text-center shadow-lg w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">Classes</h2>
                    
                    {/* Fetch Status */}
                    {loading && <p className="text-gray-700">Loading...◌</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {/* Data Display - List View */}
                    {!loading && !error && (
                        <div className="mt-4 w-full">
                            {data.map((item) => (
                                <motion.div
                                    key={item.class_id}
                                    className="p-4 bg-transparent shadow-md rounded-lg mb-4 flex flex-col md:flex-row items-start md:items-center justify-between w-full"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-black">
                                            Class Name: {item.class_name}
                                        </h3>
        
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
            
            {/* Floating Plus Button with higher z-index */}
            <motion.button
                className="fixed z-20 bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
                style={{ pointerEvents: "auto" }} // Ensures button is clickable
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/createclass")}
            >
                <Plus size={24} />
            </motion.button>
        </div>
    );
};

export default Classes;
