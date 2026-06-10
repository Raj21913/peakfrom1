import React, { useEffect, useRef, useState } from 'react';

// Highly optimized stock video sources from reliable CDNs
const VIDEO_SOURCES = {
  landing: 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054ba274eb4e6e6f0e49520e5ff30e9&profile_id=139', // gym training
  dashboard: 'https://player.vimeo.com/external/435674703.sd.mp4?s=7fdbc2227d890bf70335e954ef86cb4f20f04c6e&profile_id=165', // bar lifting
  workouts: 'https://player.vimeo.com/external/482810332.sd.mp4?s=d00e6da7de8b030e466b0ad71a1cfa4441584db9&profile_id=165', // crossfit box jump
  nutrition: 'https://player.vimeo.com/external/517604543.sd.mp4?s=d3862cd5d0859c00b0d35a519808ea22212f7166&profile_id=165', // food prepping / cooking
  coach: 'https://player.vimeo.com/external/459389137.sd.mp4?s=89e31d490c41d1902e1681286b2a0956b9c9f7b2&profile_id=165', // running athlete
  athlete: 'https://player.vimeo.com/external/459389137.sd.mp4?s=89e31d490c41d1902e1681286b2a0956b9c9f7b2&profile_id=165'
};

const BackgroundVideo = ({ type = 'landing' }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Get video URL based on page type, fall back to landing
  const videoUrl = VIDEO_SOURCES[type] || VIDEO_SOURCES.landing;

  useEffect(() => {
    // Interactive Canvas Particles Backdrop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Particle class definition
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -Math.random() * 0.4 - 0.1; // Float upwards
        this.opacity = Math.random() * 0.5 + 0.1;
        this.maxLife = Math.random() * 200 + 100;
        this.life = this.maxLife;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        // Fade out as it nears end of life
        this.opacity = (this.life / this.maxLife) * 0.4;

        if (this.life <= 0 || this.y < 0 || this.x < 0 || this.x > width) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Green particle highlights or cyan based on type
        const rgb = type === 'nutrition' ? '255, 109, 0' : type === 'coach' ? '124, 77, 255' : '0, 230, 118';
        ctx.fillStyle = `rgba(${rgb}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Initialize particle array
    const particles = Array.from({ length: 45 }, () => new Particle());

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw global dark backdrop color
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      // Draw static/pulsing aurora gradients
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.2, 0, width * 0.2, height * 0.2, width * 0.5);
      // Determine colors based on page context
      const accentColor = type === 'nutrition' ? 'rgba(255, 109, 0, 0.04)' : type === 'coach' ? 'rgba(124, 77, 255, 0.05)' : 'rgba(0, 230, 118, 0.05)';
      grad1.addColorStop(0, accentColor);
      grad1.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.8, 0, width * 0.8, height * 0.8, width * 0.5);
      const accentColor2 = type === 'nutrition' ? 'rgba(0, 229, 255, 0.04)' : type === 'workouts' ? 'rgba(255, 61, 0, 0.04)' : 'rgba(124, 77, 255, 0.04)';
      grad2.addColorStop(0, accentColor2);
      grad2.addColorStop(1, 'rgba(5, 5, 7, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  const handleVideoPlay = () => {
    setVideoLoaded(true);
  };

  return (
    <div style={styles.container}>
      {/* Fallback & Layering Canvas */}
      <canvas ref={canvasRef} style={styles.canvas} />

      {/* Cinematic Looping Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        onPlaying={handleVideoPlay}
        style={{
          ...styles.video,
          opacity: videoLoaded ? 0.08 : 0, // Keeps visuals dark and readability high
        }}
      />

      {/* Dark overlay filters for maximum text readability */}
      <div style={styles.overlay} />
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
    overflow: 'hidden',
    backgroundColor: '#050507'
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  video: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    transform: 'translate(-50%, -50%)',
    zIndex: 2,
    pointerEvents: 'none',
    transition: 'opacity 1s ease-in-out'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(5, 5, 7, 0.92) 0%, rgba(5, 5, 7, 0.85) 50%, rgba(5, 5, 7, 0.94) 100%)',
    zIndex: 3,
    pointerEvents: 'none'
  }
};

export default BackgroundVideo;
