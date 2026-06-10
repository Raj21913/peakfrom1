import React, { useEffect, useRef } from 'react';

const ThreeDCanvas = ({ mode = 'athlete', activeExercise = 'squat' }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, lastX: 0, lastY: 0, rotX: 0.2, rotY: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement.clientHeight || 400);
    
    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Mouse interactive rotations
    const onMouseDown = (e) => {
      mouseRef.current.isDown = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        mouseRef.current.rotY += deltaX * 0.007;
        mouseRef.current.rotX += deltaY * 0.007;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
      // Track normal coordinates for hover effects
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const onMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // --- 3D Projection Helpers ---
    const project = (x, y, z) => {
      // 3D rotation on X axis
      const cosX = Math.cos(mouseRef.current.rotX);
      const sinX = Math.sin(mouseRef.current.rotX);
      let y1 = y * cosX - z * sinX;
      let z1 = y * sinX + z * cosX;

      // 3D rotation on Y axis
      const cosY = Math.cos(mouseRef.current.rotY);
      const sinY = Math.sin(mouseRef.current.rotY);
      let x2 = x * cosY + z1 * sinY;
      let z2 = -x * sinY + z1 * cosY;

      // Perspective projection
      const distance = 400;
      const scale = distance / (distance + z2);
      const projX = width / 2 + x2 * scale * 1.5;
      const projY = height / 2 + y1 * scale * 1.5;

      return { x: projX, y: projY, size: scale, depth: z2 };
    };

    // --- Model Definition: 3D Athlete Wireframe ---
    const athleteVertices = [
      { id: 0, x: 0, y: -120, z: 0, label: 'Head' }, // Head
      { id: 1, x: 0, y: -80, z: 0, label: 'Neck' },  // Neck
      { id: 2, x: -40, y: -70, z: 0, label: 'L Shoulder' }, // Left Shoulder
      { id: 3, x: 40, y: -70, z: 0, label: 'R Shoulder' },  // Right Shoulder
      { id: 4, x: -50, y: -10, z: -10, label: 'L Elbow' },  // Left Elbow
      { id: 5, x: 50, y: -10, z: -10, label: 'R Elbow' },   // Right Elbow
      { id: 6, x: -60, y: 40, z: -20, label: 'L Wrist' },   // Left Wrist
      { id: 7, x: 60, y: 40, z: -20, label: 'R Wrist' },    // Right Wrist
      { id: 8, x: 0, y: -20, z: 0, label: 'Spine Center' }, // Spine Center
      { id: 9, x: -25, y: 30, z: 0, label: 'L Hip' },    // Left Hip
      { id: 10, x: 25, y: 30, z: 0, label: 'R Hip' },     // Right Hip
      { id: 11, x: -30, y: 90, z: -10, label: 'L Knee' },  // Left Knee
      { id: 12, x: 30, y: 90, z: -10, label: 'R Knee' },   // Right Knee
      { id: 13, x: -35, y: 150, z: 0, label: 'L Ankle' },  // Left Ankle
      { id: 14, x: 35, y: 150, z: 0, label: 'R Ankle' }   // Right Ankle
    ];

    const athleteEdges = [
      [0, 1], // Head to Neck
      [1, 2], [1, 3], // Neck to shoulders
      [2, 8], [3, 8], // Shoulders to spine
      [2, 4], [4, 6], // Left arm
      [3, 5], [5, 7], // Right arm
      [8, 9], [8, 10], // Spine to hips
      [9, 11], [11, 13], // Left leg
      [10, 12], [12, 14] // Right leg
    ];

    // --- Model Definition: Brain Neural Synapses ---
    const brainNodes = Array.from({ length: 45 }, (_, i) => {
      // Shape points into a spherical shape representing a brain
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 80 + Math.random() * 30; // Radius
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta) * 0.7 - 20, // Flatten slightly to look like brain hemispheres
        z: r * Math.cos(phi),
        val: Math.random(),
        speed: Math.random() * 0.02 + 0.01
      };
    });

    // --- Model Definition: Form Scanner Web Cam Frame ---
    let scannerScanLine = 0;
    const scannerVideoBgParticles = Array.from({ length: 15 }, () => ({
      x: Math.random() * 300 - 150,
      y: Math.random() * 300 - 150,
      z: Math.random() * 100 - 50,
      speed: Math.random() * 1.5 + 0.5
    }));

    // --- Animation Logic ---
    let frame = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Autorotate slowly when not dragging mouse
      if (!mouseRef.current.isDown) {
        mouseRef.current.rotY += 0.003;
      }

      if (mode === 'athlete') {
        // --- ATHLETE WIREFRAME RENDERER ---
        // Draw futuristic scanning circle grids
        ctx.strokeStyle = 'rgba(0, 230, 118, 0.04)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2 + 30, 140, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 230, 118, 0.02)';
        ctx.strokeRect(width / 2 - 160, height / 2 - 160, 320, 320);

        // Project vertices
        const projectedVertices = athleteVertices.map(v => {
          // Add subtle dynamic breathing movement
          const breathe = Math.sin(frame * 0.04 + v.y * 0.01) * 2;
          const px = v.x + (v.id === 2 || v.id === 4 || v.id === 6 ? -breathe : breathe);
          return { ...project(px, v.y, v.z), label: v.label, id: v.id };
        });

        // Draw edges (lines)
        ctx.lineWidth = 1.5;
        athleteEdges.forEach(edge => {
          const p1 = projectedVertices[edge[0]];
          const p2 = projectedVertices[edge[1]];
          
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          grad.addColorStop(0, 'rgba(0, 230, 118, 0.35)');
          grad.addColorStop(0.5, 'rgba(0, 229, 255, 0.6)');
          grad.addColorStop(1, 'rgba(0, 230, 118, 0.35)');
          
          ctx.strokeStyle = grad;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw nodes (joints)
        projectedVertices.forEach(v => {
          // Check mouse hover
          const dx = mouseRef.current.x - v.x;
          const dy = mouseRef.current.y - v.y;
          const isHovered = Math.sqrt(dx * dx + dy * dy) < 18;

          ctx.beginPath();
          ctx.arc(v.x, v.y, (isHovered ? 8 : 4) * v.size, 0, Math.PI * 2);
          ctx.fillStyle = isHovered ? '#00e5ff' : '#00e676';
          ctx.shadowBlur = isHovered ? 15 : 5;
          ctx.shadowColor = isHovered ? '#00e5ff' : '#00e676';
          ctx.fill();
          ctx.shadowBlur = 0; // Reset shadow

          // Joint rings
          ctx.beginPath();
          ctx.arc(v.x, v.y, (isHovered ? 14 : 9) * v.size, 0, Math.PI * 2);
          ctx.strokeStyle = isHovered ? 'rgba(0, 229, 255, 0.5)' : 'rgba(0, 230, 118, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw floating label for hovered joints
          if (isHovered) {
            ctx.fillStyle = '#ffffff';
            ctx.font = "11px 'Outfit', sans-serif";
            ctx.fillText(v.label, v.x + 15, v.y - 5);
            ctx.fillStyle = 'rgba(0, 229, 255, 0.7)';
            ctx.font = "9px 'Inter', sans-serif";
            ctx.fillText(`Active • 100% Opt`, v.x + 15, v.y + 7);
          }
        });

        // Telemetry diagnostics sidebar text
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.font = "9px 'Inter', sans-serif";
        ctx.fillText(`BIOMETRIC SCANNER ACTIVE: 60FPS`, 20, 30);
        ctx.fillText(`ROT_X: ${mouseRef.current.rotX.toFixed(2)} | ROT_Y: ${mouseRef.current.rotY.toFixed(2)}`, 20, 42);
        
        ctx.fillStyle = 'rgba(0, 230, 118, 0.8)';
        ctx.fillText(`SYSTEM STATUS: OPTIMAL`, width - 130, 30);
      } 
      else if (mode === 'brain') {
        // --- NEURAL NETWORK / BRAIN SCANNER ---
        const projectedNodes = brainNodes.map((node, index) => {
          // Neural firing animations
          node.val += node.speed;
          if (node.val > Math.PI) node.val = 0;

          // Project coordinates
          return { ...project(node.x, node.y, node.z), node, index };
        });

        // Draw connections between close nodes
        ctx.lineWidth = 0.5;
        for (let i = 0; i < projectedNodes.length; i++) {
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const n1 = projectedNodes[i];
            const n2 = projectedNodes[j];
            
            // Calculate distance in 3D
            const dx = n1.node.x - n2.node.x;
            const dy = n1.node.y - n2.node.y;
            const dz = n1.node.z - n2.node.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 50) {
              const pulseVal = Math.sin(frame * 0.05 + dist * 0.1);
              const opacity = (1 - dist / 50) * 0.18;
              ctx.strokeStyle = pulseVal > 0.8 
                ? `rgba(124, 77, 255, ${opacity * 2.5})` 
                : `rgba(255, 255, 255, ${opacity})`;
              
              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.stroke();
            }
          }
        }

        // Draw active pulsing synapses
        projectedNodes.forEach(v => {
          const pulse = Math.sin(v.node.val);
          ctx.beginPath();
          ctx.arc(v.x, v.y, (1.5 + pulse * 2.5) * v.size, 0, Math.PI * 2);
          ctx.fillStyle = pulse > 0.8 ? '#7c4dff' : '#00e5ff';
          ctx.shadowBlur = pulse > 0.8 ? 10 : 0;
          ctx.shadowColor = '#7c4dff';
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Iron Man HUD text overlay
        ctx.fillStyle = 'rgba(124, 77, 255, 0.8)';
        ctx.font = "10px 'Outfit', sans-serif";
        ctx.fillText("NEURAL SYNAPSE GENERATOR v4.8", 20, height - 35);
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(`SYNAPSE COUNT: ${brainNodes.length} • STRENGTH PR: 98%`, 20, height - 20);
      } 
      else if (mode === 'exercise') {
        // --- SKELETON EXERCISE DEMO (SQUAT/BENCH) ---
        // Programmatic bone coordinates moving relative to squat or lift cycles
        const cycle = Math.sin(frame * 0.05); // Loop -1 to 1
        const progress = (cycle + 1) / 2;    // 0 to 1

        let squatY = 0;
        let kneeZ = 0;
        let hipZ = 0;

        if (activeExercise === 'squat') {
          // Squat cycle coordinates adjustment
          squatY = progress * 40; // Hips move down
          kneeZ = -progress * 25; // Knees move forward
          hipZ = progress * 20;   // Hips push back
        } else if (activeExercise === 'bench') {
          // Bench press cycle: hands/elbows move
          squatY = 0;
        }

        // Build active exercise skeleton vertices
        const exerciseVertices = [
          { id: 0, x: 0, y: -90 + (activeExercise === 'bench' ? 30 : 0), z: 0 }, // head
          { id: 1, x: 0, y: -60 + (activeExercise === 'bench' ? 30 : 0), z: 0 }, // neck
          
          // Shoulders
          { id: 2, x: -35, y: -50 + (activeExercise === 'bench' ? 30 : 0), z: 0 }, 
          { id: 3, x: 35, y: -50 + (activeExercise === 'bench' ? 30 : 0), z: 0 },
          
          // Elbows
          { id: 4, x: -45, y: -10 + (activeExercise === 'bench' ? (1 - progress) * 20 + 20 : 0), z: -10 - (activeExercise === 'bench' ? progress * 15 : 0) },
          { id: 5, x: 45, y: -10 + (activeExercise === 'bench' ? (1 - progress) * 20 + 20 : 0), z: -10 - (activeExercise === 'bench' ? progress * 15 : 0) },
          
          // Hands / Barbell path
          { id: 6, x: -50, y: -10 - (activeExercise === 'bench' ? progress * 50 - 20 : 0), z: -20 },
          { id: 7, x: 50, y: -10 - (activeExercise === 'bench' ? progress * 50 - 20 : 0), z: -20 },
          
          // Hips
          { id: 8, x: -20, y: 15 + squatY, z: hipZ },
          { id: 9, x: 20, y: 15 + squatY, z: hipZ },
          
          // Knees
          { id: 10, x: -25, y: 70, z: kneeZ },
          { id: 11, x: 25, y: 70, z: kneeZ },
          
          // Feet (fixed)
          { id: 12, x: -28, y: 130, z: 0 },
          { id: 13, x: 28, y: 130, z: 0 }
        ];

        const exerciseEdges = [
          [0, 1], [1, 2], [1, 3], // Upper
          [2, 4], [4, 6], // Left Arm
          [3, 5], [5, 7], // Right Arm
          [2, 8], [3, 9], [8, 9], // Torso
          [8, 10], [10, 12], // Left Leg
          [9, 11], [11, 13] // Right Leg
        ];

        // Project
        const projected = exerciseVertices.map(v => project(v.x, v.y, v.z));

        // Draw Barbell if Bench Press
        if (activeExercise === 'bench') {
          const barLeft = project(-95, -10 - (progress * 50 - 20), -20);
          const barRight = project(95, -10 - (progress * 50 - 20), -20);
          
          ctx.strokeStyle = '#9ca3af';
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.moveTo(barLeft.x, barLeft.y);
          ctx.lineTo(barRight.x, barRight.y);
          ctx.stroke();

          // Bar weight plates
          ctx.fillStyle = '#ff6d00';
          ctx.beginPath();
          ctx.arc(barLeft.x, barLeft.y, 20 * barLeft.size, 0, Math.PI * 2);
          ctx.arc(barRight.x, barRight.y, 20 * barRight.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw Edges
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 3;
        exerciseEdges.forEach(edge => {
          const p1 = projected[edge[0]];
          const p2 = projected[edge[1]];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        });

        // Draw Nodes
        projected.forEach(v => {
          ctx.beginPath();
          ctx.arc(v.x, v.y, 5 * v.size, 0, Math.PI * 2);
          ctx.fillStyle = '#00e676';
          ctx.fill();
        });

        // Text HUD
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = "12px 'Outfit', sans-serif";
        ctx.fillText(`BIOMECHANICAL TARGET: ${activeExercise.toUpperCase()}`, 20, 30);
        ctx.fillStyle = '#00e676';
        ctx.fillText(`PHASE: ${cycle > 0 ? 'ECCENTRIC' : 'CONCENTRIC'} (${Math.abs(Math.round(cycle * 100))}% Load)`, 20, 45);
      }
      else if (mode === 'scanner') {
        // --- SQUAT FORM ANALYZER CAMERA STREAM ---
        // Draw gridlines
        ctx.strokeStyle = 'rgba(255, 61, 0, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < width; i += 40) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
        }
        for (let i = 0; i < height; i += 40) {
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
        }

        // Animate scanner diagonal diagnostic grid
        scannerScanLine = (scannerScanLine + 2) % height;
        ctx.strokeStyle = 'rgba(0, 230, 118, 0.15)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, scannerScanLine);
        ctx.lineTo(width, scannerScanLine);
        ctx.stroke();

        // Draw a simulated 3D lifter squatting, showing knee caving or perfect angles
        const cycle = Math.sin(frame * 0.04);
        const progress = (cycle + 1) / 2; // 0 (stand) to 1 (deep squat)
        const squatDepthY = progress * 55;
        const kneeCavingX = progress * (activeExercise === 'poor_form' ? 12 : -4); // positive is caving inside, negative is pushing out

        const liftPoints = [
          { name: 'Hip', x: width / 2 - 30, y: height / 2 - 40 + squatDepthY },
          { name: 'Knee', x: width / 2 - 65 + kneeCavingX, y: height / 2 + 30 },
          { name: 'Ankle', x: width / 2 - 50, y: height / 2 + 110 }
        ];

        // Draw skeleton lines
        ctx.strokeStyle = activeExercise === 'poor_form' && progress > 0.6 ? '#ff3d00' : '#00e676';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(liftPoints[0].x, liftPoints[0].y);
        ctx.lineTo(liftPoints[1].x, liftPoints[1].y);
        ctx.lineTo(liftPoints[2].x, liftPoints[2].y);
        ctx.stroke();

        // Draw joint circles
        liftPoints.forEach(pt => {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
          ctx.fill();
        });

        // Draw HUD diagnostics
        const angle = Math.round(90 + (1 - progress) * 50 + (activeExercise === 'poor_form' ? 10 : 0));
        ctx.fillStyle = '#ffffff';
        ctx.font = "14px 'Outfit', sans-serif";
        ctx.fillText(`KNEE JOINT ANGLE: ${angle}°`, width / 2 - 120, height / 2 - 80);

        if (activeExercise === 'poor_form' && progress > 0.6) {
          ctx.fillStyle = '#ff3d00';
          ctx.font = "11px 'Outfit', sans-serif";
          ctx.fillText("CRITICAL WARNING: KNEE CAVING DETECTED (-8.2°)", 30, 40);
          ctx.fillText("ADVICE: DRIVE KNEES OUTWARD", 30, 55);
        } else {
          ctx.fillStyle = '#00e676';
          ctx.font = "11px 'Outfit', sans-serif";
          ctx.fillText("FORM STATUS: OPTIMAL DEPTH", 30, 40);
          ctx.fillText("TRACKING STABILITY: 98.4%", 30, 55);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode, activeExercise]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        cursor: mode === 'athlete' || mode === 'exercise' ? 'grab' : 'default',
        display: 'block'
      }}
    />
  );
};

export default ThreeDCanvas;
