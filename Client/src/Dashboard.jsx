import { useState } from "react";
import { motion } from "framer-motion";
import { FaUniversity, FaBook, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: user?.email || "",
    university: "",
    college: "",
    semester: "",
    goals: "",
    timeLeft: "",
    proficiency: "Beginner",
    studyHoursWeekdays: "",
    studyHoursWeekends: "",
  });

  const API_URL = "https://auth-v1-lahf.onrender.com";

  if (user?.profile) {
    window.location.href = "https://kplor.com/";
    return null;
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/profile`, profile);
      console.log("Profile created:", res.data);
      window.location.href = "https://kplor.com/";
    } catch (err) {
      console.error("Profile creation failed", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white shadow-xl p-8 rounded-2xl"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Email */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled
            />
          </motion.div>

          {/* University */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold flex items-center gap-2">
              <FaUniversity className="text-blue-700" /> Select University
            </label>
            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              placeholder="Your University Name"
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* College */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold flex items-center gap-2">
              <FaBook className="text-blue-700" /> College
            </label>
            <input
              type="text"
              name="college"
              value={profile.college}
              onChange={handleChange}
              placeholder="Your College Name"
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Semester */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold flex items-center gap-2">
              <FaCalendarAlt className="text-blue-700" /> Select Semester
            </label>
            <input
              type="text"
              name="semester"
              value={profile.semester}
              onChange={handleChange}
              placeholder="Enter Semester"
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Goals */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold">Goals</label>
            <textarea
              name="goals"
              value={profile.goals}
              onChange={handleChange}
              placeholder="What do you want to achieve?"
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </motion.div>

          {/* Study Time Left */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold">Time Left to Study (months)</label>
            <input
              type="number"
              name="timeLeft"
              min="0"
              max="12"
              value={profile.timeLeft}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Proficiency */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold">Proficiency Level</label>
            <select
              name="proficiency"
              value={profile.proficiency}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </motion.div>

          {/* Study Hours (Weekdays & Weekends) */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold">Study Hours (Weekdays)</label>
            <input
              type="number"
              name="studyHoursWeekdays"
              min="0"
              max="24"
              value={profile.studyHoursWeekdays}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <label className="block text-blue-900 font-semibold">Study Hours (Weekends)</label>
            <input
              type="number"
              name="studyHoursWeekends"
              min="0"
              max="24"
              value={profile.studyHoursWeekends}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            Continue
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Dashboard;
