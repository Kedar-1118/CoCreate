import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const backgroundVariants = {
    animate: {
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        transition: { duration: 30, repeat: Infinity, ease: "linear" },
    },
};

const floatVariants = {
    animate: {
        y: [0, -10, 0],
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
};

const pulseButton = {
    animate: {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
};

const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 1 },
    }),
};

const features = [
    { title: "Live Collaboration", desc: "Work with your team in real-time with synced edits and presence indicators." },
    { title: "Access Anywhere", desc: "Cloud-based, secure access from any device, any time." },
    { title: "Comments & Feedback", desc: "Inline comments and threads to make discussions contextual and clear." },
    { title: "Permissions Control", desc: "Control who can view or edit each document." },
    { title: "Version History", desc: "Go back in time with auto-saved versions and restore with one click." },
    { title: "Dark Mode", desc: "Pleasant reading & writing experience even at night." },
];

const useCases = [
    "Product teams brainstorming feature specs",
    "Startups creating business plans together",
    "Remote teams writing meeting notes collaboratively",
    "Agencies sharing drafts and revisions with clients",
];

const LandingPage = () => {
    return (
        <motion.div
            variants={backgroundVariants}
            animate="animate"
            className="min-h-screen flex flex-col text-white"
            style={{
                backgroundImage: "linear-gradient(135deg, #3b82f6, #ec4899, #6366f1)",
                backgroundSize: "400% 400%",
            }}
        >
            {/* Hero */}
            <div className="flex flex-col items-center justify-center px-6 py-24 text-center relative">
                <motion.h1 className="text-5xl md:text-6xl font-bold mb-4" variants={floatVariants} animate="animate">
                    Welcome to <span className="text-yellow-300">CoCreate</span>
                </motion.h1>
                <motion.p className="text-lg md:text-xl max-w-2xl text-slate-200 mb-6" variants={floatVariants} animate="animate">
                    Your real-time collaborative document workspace. Brainstorm, write, and build together.
                </motion.p>
                <motion.div variants={pulseButton} animate="animate">
                    <Link
                        to="/login"
                        className="no-underline bg-yellow-300 text-black font-bold py-3 px-8 rounded-full shadow-xl hover:bg-yellow-400 transition duration-300"
                    >
                        Login to CoCreate
                    </Link>
                </motion.div>

                {/* Floating Glow Elements */}
                <div className="absolute top-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute bottom-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-ping" />
                <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-bounce" />
            </div>

            {/* Features */}
            <div className="bg-white text-gray-800 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose CoCreate?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((f, i) => (
                            <motion.div
                                key={f.title}
                                className="bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-xl transition"
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                            >
                                <h3 className="text-xl font-semibold mb-2 text-blue-600">{f.title}</h3>
                                <p>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="bg-slate-800 text-white py-20 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8">Built for Teams Like Yours</h2>
                    <ul className="space-y-4 text-lg">
                        {useCases.map((u, i) => (
                            <motion.li
                                key={i}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={i}
                                className="text-slate-200"
                            >
                                ✅ {u}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Quote */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 px-6 text-center">
                <motion.blockquote
                    className="italic text-xl max-w-3xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    "The strength of the team is each individual member. The strength of each member is the team." – Phil Jackson
                </motion.blockquote>
            </div>

            {/* CTA */}
            <div className="bg-black text-white py-16 px-6 text-center">
                <motion.h2 className="text-3xl md:text-4xl font-bold mb-4" initial="hidden" whileInView="visible" variants={fadeIn}>
                    Ready to collaborate like never before?
                </motion.h2>
                <motion.div variants={fadeIn} animate="animate">
                    <Link
                        to="/register"
                        className="no-underline bg-yellow-400 text-black font-bold py-3 px-10 rounded-full shadow-xl hover:bg-yellow-300 transition duration-300"
                    >
                        Get Started
                    </Link>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
                © {new Date().getFullYear()} CoCreate — Made with 💡 for collaboration
            </div>
        </motion.div>
    );
};

export default LandingPage;
