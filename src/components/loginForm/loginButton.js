import { motion } from "framer-motion";

const LoginButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, backgroundColor: "var(--accent-derv)" }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: "rgb(1, 93, 180)",
        border: "none",
        borderRadius: "10px",
        padding: "10px 10px",
        fontSize: "1rem",
        fontWeight: 600,
        width: "50%",
        color: "var(--main)",
      }}
    >
      Login
    </motion.button>
  );
};
export default LoginButton