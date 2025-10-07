import { useState, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';


export function Navbar() {
  const [activeItem, setActiveItem] = useState('Design');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const navProgress = useTransform(scrollY, [0, 100], [0, 1]);

  const navItems = [
    { 
      name: 'Design', 
      href: '#design',
      icon: '◯',
      color: 'from-blue-400 to-purple-500'
    },
    { 
      name: 'Process', 
      href: '#process',
      icon: '◢',
      color: 'from-green-400 to-cyan-500'
    },
    { 
      name: 'Systems', 
      href: '#systems',
      icon: '⬢',
      color: 'from-orange-400 to-red-500'
    },
    { 
      name: 'Impact', 
      href: '#impact',
      icon: '◈',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <>
      {/* Cursor Follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-primary/20 to-transparent rounded-full pointer-events-none z-[60] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary origin-left"
          style={{ scaleX: navProgress }}
        />

        <div className="bg-background/60 backdrop-blur-xl border-b border-border/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              
              {/* Creative Logo */}
              <motion.div 
                className="relative group cursor-pointer"
                whileHover="hover"
              >
                <motion.div
                  className="flex items-center space-x-3"
                  variants={{
                    hover: { scale: 1.05 }
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center"
                      variants={{
                        hover: { rotate: 180 }
                      }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.span 
                        className="text-primary-foreground font-medium"
                        variants={{
                          hover: { rotate: -180 }
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        24
                      </motion.span>
                    </motion.div>
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-br from-primary/50 to-accent/50 rounded-lg opacity-0 blur-sm"
                      variants={{
                        hover: { opacity: 1 }
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <motion.h2 
                      className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent tracking-tight"
                      variants={{
                        hover: { backgroundPosition: "100% 0%" }
                      }}
                    >
                      Backend Developer
                    </motion.h2>
                    <motion.div
                      className="h-px bg-gradient-to-r from-primary to-transparent"
                      variants={{
                        hover: { scaleX: 1.2 }
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Morphing Navigation */}
              <div className="hidden lg:flex items-center">
                <motion.div 
                  className="relative bg-muted/30 backdrop-blur-sm rounded-2xl p-1 border border-border/50"
                  layout
                >
                  <div className="flex items-center space-x-1">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.name}
                        onClick={() => setActiveItem(item.name)}
                        className="relative px-4 py-2 rounded-xl transition-all duration-300 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        layout
                      >
                        {activeItem === item.name && (
                          <motion.div
                            layoutId="navbar-bg"
                            className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl opacity-20`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <motion.div
                          className="flex items-center space-x-2 relative z-10"
                          animate={{
                            color: activeItem === item.name ? 'var(--foreground)' : 'var(--muted-foreground)'
                          }}
                        >
                          <motion.span
                            className={`inline-block bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                            animate={{ 
                              rotate: activeItem === item.name ? [0, 360] : 0,
                              scale: activeItem === item.name ? [1, 1.2, 1] : 1
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            {item.icon}
                          </motion.span>
                          <span className="tracking-tight">{item.name}</span>
                        </motion.div>
                        
                        {/* Hover indicator */}
                        <motion.div
                          className={`absolute bottom-0 left-1/2 h-px bg-gradient-to-r ${item.color} origin-center`}
                          initial={{ width: 0, x: '-50%' }}
                          whileHover={{ width: '80%' }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center"
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="w-6 h-0.5 bg-foreground mb-1"
                  animate={{
                    rotate: isMenuOpen ? 45 : 0,
                    y: isMenuOpen ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-6 h-0.5 bg-foreground mb-1"
                  animate={{
                    opacity: isMenuOpen ? 0 : 1,
                    scale: isMenuOpen ? 0 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="w-6 h-0.5 bg-foreground"
                  animate={{
                    rotate: isMenuOpen ? -45 : 0,
                    y: isMenuOpen ? -6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Creative Mobile Menu */}
        <motion.div
          className="lg:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border/30"
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="p-6 space-y-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  setActiveItem(item.name);
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-4 w-full p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20,
                }}
                transition={{ 
                  delay: isMenuOpen ? index * 0.1 : 0,
                  duration: 0.3 
                }}
              >
                <motion.div
                  className={`w-8 h-8 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-white">{item.icon}</span>
                </motion.div>
                <div className="text-left">
                  <div className="text-foreground">{item.name}</div>
                  <div className="text-xs text-muted-foreground">View {item.name.toLowerCase()}</div>
                </div>
                <motion.div
                  className="ml-auto opacity-0 group-hover:opacity-100"
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.div>
              </motion.button>
            ))}
            

          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}