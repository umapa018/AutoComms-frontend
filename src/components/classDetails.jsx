import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";

const ClassDetail = () => {
    const { classId, } = useParams();
    const navigate = useNavigate();
    const [classInfo, setClassInfo] = useState(null);
    const [googleForms, setGoogleForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);


    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/classes/${classId}`, {
                    method: "GET",
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch class details");
                const result = await response.json();
                setClassInfo(result.class);
                setGoogleForms(result.google_forms);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchClassDetails();
        // For demonstration, we are using static data.
        // setGoogleForms([
        //     {
        //         form_title: "Form 1",
        //         form_link: "https://forms.google.com/forms/form1",
        //         form_id: "1",
        //         form_description: "Sample description",
        //     },
        //     {
        //         form_title: "Form 2",
        //         form_link: "https://forms.google.com/forms/form2",
        //         form_id: "form2",
        //         form_description: "Sample description",
        //     },
        //     {
        //         form_title: "Form 3",
        //         form_link: "https://forms.google.com/forms/form3",
        //         form_id: "form3",
        //         form_description: "Sample description",
        //     },
        // ]);
        // setClassInfo({
        //     class_name: "Sample Class",
        //     description: "This is a sample description for the class.",
        // });
        // setLoading(false);
        // setError(null);
    }, [classId]);

    //Handler to delete a Google Form.
    const handleDeleteForm = async (formId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/google-form/delete/${formId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Failed to delete form");
            // Remove the form from state upon successful deletion.
            setGoogleForms((prev) => prev.filter((form) => form.form_id !== formId));
        } catch (err) {
            console.error("Error deleting form:", err);
        }
    };

    return (
        <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500 overflow-auto">
            {/* Background "AutoComms" Text */}
            <motion.h1
                className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 2 }}
            >
                AutoComms
            </motion.h1>

            {/* Main Content */}
            <div className="relative z-10 p-6">
                {/* Back to Classes Button */}
                <motion.button
                    className="flex rounded-xl items-center text-white mb-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/classes")}
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Classes
                </motion.button>

                {/* Edit Mode Toggle Button */}
                {/* <button
                        className="bg-purple-500  text-white px-4 py-2 rounded"
                        onClick={() => setEditMode((prev) => !prev)}
                    >
                        {editMode ? "Exit Edit Mode" : "Edit"}
                </button> */}

                {loading && (
                    <p className="border-4 rounded-xs text-white">
                        Loading class details...
                    </p>
                )}

                {error && <p className="text-red-400">{error}</p>}
                {!loading && !error && classInfo && (
                    <div className="bg-transparent mt-20 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-md mx-auto p-6">
                        <div className="absolute top-4 right-4 z-30">
                            <button
                                className="bg-purple-500 text-white px-3 py-1 rounded"
                                onClick={() => setEditMode((prev) => !prev)}
                            >
                                {editMode ? "Exit Edit Mode" : "Edit"}
                            </button>
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-center">
                            {classInfo.class_name}
                        </h2>
                        <h3 className="text-2xl font-semibold mb-2 mx-1">
                            Google Forms
                        </h3>
                        {googleForms.length > 0 ? (
                            <div className="space-y-3 hover:">
                                {googleForms.map((form) => (
                                    <motion.div
                                        key={form.form_id}
                                        className="p-4 bg-white shadow-md rounded-lg mb-4 flex flex-col md:flex-row items-start md:items-center justify-between w-full cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => navigate(`/classes/googleform/${classId}/${form.form_id}`)}
                                    >
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-black">
                                                {form.form_title}
                                            </h3>
                                        </div>
                                        {editMode && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent navigation if clicking the delete button.
                                                    handleDeleteForm(form.form_id);
                                                }}
                                                className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                                            >
                                                X
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                            // {data.map((item) => (
                            //     <motion.div
                            //         key={item.class_id}
                            //         className="p-4 bg-white shadow-md rounded-lg mb-4 flex flex-col md:flex-row items-start md:items-center justify-between w-full cursor-pointer"
                            //         whileHover={{ scale: 1.02 }}
                            //         transition={{ duration: 0.3 }}
                            //         onClick={() => navigate(`/classes/${item.class_id}`)}
                            //     >
                            //         <div className="flex-1">
                            //             <h3 className="text-lg font-bold text-black">
                            //                 {item.class_name}
                            //             </h3>
                            //         </div>
                            //     </motion.div>
                            // ))}
                        ) : (
                            <p className="text-gray-300">
                                No forms available for this class.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Create Button (Top-Right Corner) */}
            <motion.button
                className="fixed z-50 top-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
                style={{ pointerEvents: "auto" }}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 1.1 }}
                onClick={() => navigate(`/classes/googleform/create/${classId}`)}
            >
                <span className="text-lg font-medium">Create Form</span>
                <Plus size={24} />
            </motion.button>
            <motion.button
                className="fixed z-50 top-22 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
                style={{ pointerEvents: "auto" }}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 1.1 }}
                onClick={() => navigate(`/classes/googleform/Announcement/${classId}`)}
            >
                <span className="text-lg font-medium">Announcement</span>
                <Plus size={24} />
            </motion.button>
        </div>
    );
};

export default ClassDetail;






// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowLeft, Plus } from "lucide-react";

// const ClassDetail = () => {
//     const { classId } = useParams();
//     const navigate = useNavigate();
//     const [classInfo, setClassInfo] = useState(null);
//     const [googleForms, setGoogleForms] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [editMode, setEditMode] = useState(false);

//     useEffect(() => {
//         const fetchClassDetails = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/classes/${classId}`, {
//                     method: "GET",
//                     credentials: "include",
//                 });
//                 if (!response.ok) throw new Error("Failed to fetch class details");
//                 const result = await response.json();
//                 setClassInfo(result.class);
//                 setGoogleForms(result.google_forms);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchClassDetails();
//         // For demonstration, we are using static data.
//         // setGoogleForms([
//         //     {
//         //         form_title: "Form 1",
//         //         form_link: "https://forms.google.com/forms/form1",
//         //         form_id: "1",
//         //         form_description: "Sample description",
//         //     },
//         //     {
//         //         form_title: "Form 2",
//         //         form_link: "https://forms.google.com/forms/form2",
//         //         form_id: "form2",
//         //         form_description: "Sample description",
//         //     },
//         //     {
//         //         form_title: "Form 3",
//         //         form_link: "https://forms.google.com/forms/form3",
//         //         form_id: "form3",
//         //         form_description: "Sample description",
//         //     },
//         // ]);
//         // setClassInfo({
//         //     class_name: "Sample Class",
//         //     description: "This is a sample description for the class.",
//         // });
//         // setLoading(false);
//         // setError(null);
//     }, [classId]);

//     // Handler to delete a Google Form.
//     const handleDeleteForm = async (formId) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/google-form/${formId}`, {
//                 method: "DELETE",
//                 credentials: "include",
//             });
//             if (!response.ok) throw new Error("Failed to delete form");
//             // Remove the form from state upon successful deletion.
//             setGoogleForms((prev) => prev.filter((form) => form.form_id !== formId));
//         } catch (err) {
//             console.error("Error deleting form:", err);
//         }
//     };

//     return (
//         <div className="fixed inset-0 w-full h-screen bg-gradient-to-br from-cyan-950 via-blue-100 to-purple-500 overflow-auto">
//             {/* Background "AutoComms" Text */}
//             <motion.h1
//                 className="absolute inset-0 flex items-center justify-center text-[15vw] font-extrabold text-gray-300 opacity-55 select-none"
//                 initial={{ opacity: 0, scale: 0 }}
//                 animate={{ opacity: 0.2, scale: 1 }}
//                 transition={{ duration: 2 }}
//             >
//                 AutoComms
//             </motion.h1>

//             {/* Main Content */}
//             <div className="relative z-10 p-6">
//                 <div className="flex justify-between items-center mb-4">
//                     <motion.button
//                         className="flex rounded-xl items-center text-white px-4 py-2 bg-purple-600 hover:bg-purple-700 transition-colors"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate("/classes")}
//                     >
//                         <ArrowLeft size={20} className="mr-2" />
//                         Back to Classes
//                     </motion.button>
//                     {/* Edit Mode Toggle Button */}
//                     <button
//                         className="bg-blue-500  text-white px-4 py-2 rounded"
//                         onClick={() => setEditMode((prev) => !prev)}
//                     >
//                         {editMode ? "Exit Edit Mode" : "Edit"}
//                     </button>
//                 </div>

//                 {loading && <p className="border-4 rounded-xs text-white">Loading class details...</p>}
//                 {error && <p className="text-red-400">{error}</p>}
//                 {!loading && !error && classInfo && (
//                     <div className="bg-transparent mt-20 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-md mx-auto p-6">
//                         <h2 className="text-3xl font-bold mb-4 text-center">{classInfo.class_name}</h2>
//                         <p className="text-lg text-center mb-4">
//                             {classInfo.description || "No description available"}
//                         </p>
//                         <div className="flex justify-between items-center mb-2">
//                             <h3 className="text-2xl font-semibold">Google Forms</h3>
//                             {editMode && (
//                                 <span className="text-sm text-red-500">Delete mode enabled</span>
//                             )}
//                         </div>
//                         {googleForms.length > 0 ? (
//                             <ul className="space-y-3">
//                                 {googleForms.map((form) => (
//                                     <li key={form.form_id} className="p-4 bg-gray-800 rounded-lg flex items-center justify-between">
//                                         <a
//                                             href={form.form_link}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="text-blue-300 hover:underline flex-1"
//                                         >
//                                             {form.form_title}
//                                         </a>
//                                         {editMode && (
//                                             <button
//                                                 onClick={(e) => {
//                                                     e.stopPropagation(); // Prevent navigation if clicking the delete button.
//                                                     handleDeleteForm(form.form_id);
//                                                 }}
//                                                 className="bg-red-500 text-white px-2 py-1 rounded ml-4"
//                                             >
//                                                 X
//                                             </button>
//                                         )}
//                                     </li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-gray-300">No forms available for this class.</p>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Create and Announcement Buttons */}
//             <motion.button
//                 className="fixed z-50 top-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
//                 style={{ pointerEvents: "auto" }}
//                 whileHover={{ scale: 1.0 }}
//                 whileTap={{ scale: 1.1 }}
//                 onClick={() => navigate(`/classes/googleform/create/${classId}`)}
//             >
//                 <span className="text-lg font-medium">Create Form</span>
//                 <Plus size={24} />
//             </motion.button>
//             <motion.button
//                 className="fixed z-50 top-20 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-purple-700 focus:outline-none transition-transform"
//                 style={{ pointerEvents: "auto" }}
//                 whileHover={{ scale: 1.0 }}
//                 whileTap={{ scale: 1.1 }}
//                 onClick={() => navigate(`/classes/googleform/Announcement/${classId}`)}
//             >
//                 <span className="text-lg font-medium">Announcement</span>
//                 <Plus size={24} />
//             </motion.button>
//         </div>
//     );
// };

// export default ClassDetail;
