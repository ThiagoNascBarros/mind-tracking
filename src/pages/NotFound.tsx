import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

function NotFound() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-500 opacity-20 blur-2xl"
        initial={{ scale: 1.2, rotate: 0 }}
        animate={{ scale: 1.5, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* 404 Title */}
      <motion.h1
        className="text-6xl md:text-9xl font-extrabold mb-4 z-10 text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        404
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-lg md:text-2xl mb-6 z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Oops! A página que você procura não existe.
      </motion.p>

      {/* Link with Hover Effect */}
      <motion.div
        className="z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Link
          to="/"
          className="text-blue-400 text-base md:text-lg underline hover:text-blue-300 transition-colors duration-300"
        >
          Voltar para a página inicial
        </Link>
      </motion.div>

      {/* 3D Animation */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 2, 2]} />
          <OrbitControls enableZoom={false} />
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
              color="#4f46e5"
              attach="material"
              distort={0.5}
              speed={2}
            />
          </Sphere>
        </Canvas>
      </div>
    </motion.div>
  );
}

export default NotFound;