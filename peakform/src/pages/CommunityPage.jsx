import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Heart, MessageCircle, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

const CommunityPage = () => {
  const { communityFeed, setCommunityFeed, challenges, toggleChallenge } = useApp();
  const [likedPosts, setLikedPosts] = useState({});

  const handleLike = (id) => {
    const alreadyLiked = likedPosts[id];
    setLikedPosts(prev => ({ ...prev, [id]: !alreadyLiked }));

    setCommunityFeed(prev => prev.map(post => {
      if (post.id === id) {
        return { ...post, likes: post.likes + (alreadyLiked ? -1 : 1) };
      }
      return post;
    }));
  };

  const leaderboards = [
    { rank: 1, name: 'Sarah Jenkins', volume: '62,400 kg', level: 'Level 14', xp: '18,450 XP', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80' },
    { rank: 2, name: 'Marcus Vance', volume: '54,200 kg', level: 'Level 13', xp: '16,210 XP', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80' },
    { rank: 3, name: 'Raj (You)', volume: '48,600 kg', level: 'Level 12', xp: '14,850 XP', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&q=80' },
    { rank: 4, name: 'Elena Rostova', volume: '42,100 kg', level: 'Level 11', xp: '12,900 XP', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80' }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.grid}>
        
        {/* --- LEFT COLUMN: STRAVA-STYLE WORKOUT FEED --- */}
        <div style={styles.leftCol}>
          <div style={styles.feedHeader}>
            <Users size={18} color="#00e676" />
            <h3 style={styles.panelTitle}>Athletic Telemetry Feed</h3>
          </div>
          
          <div style={styles.feedList}>
            {communityFeed.map(post => {
              const isLiked = likedPosts[post.id];
              return (
                <div key={post.id} className="glass-panel hover-glow" style={styles.postCard}>
                  
                  {/* User row */}
                  <div style={styles.userRow}>
                    <img src={post.avatar} alt={post.user} style={styles.avatarImg} />
                    <div style={styles.userMeta}>
                      <span style={styles.userName}>{post.user}</span>
                      <span style={styles.postTime}>{post.time}</span>
                    </div>
                  </div>

                  {/* Activity descriptions */}
                  <div style={styles.postBody}>
                    <p style={styles.postAction}>
                      {post.action}: <span style={styles.postMetric}>{post.metric}</span>
                    </p>
                  </div>

                  {/* Actions (Like, Comment) */}
                  <div style={styles.actionRow}>
                    <button 
                      onClick={() => handleLike(post.id)} 
                      style={{
                        ...styles.actionBtn,
                        color: isLiked ? '#ff3d00' : '#9ca3af'
                      }}
                    >
                      <Heart size={15} fill={isLiked ? '#ff3d00' : 'none'} />
                      <span>{post.likes}</span>
                    </button>
                    <button style={styles.actionBtn}>
                      <MessageCircle size={15} />
                      <span>{post.comments}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* --- RIGHT COLUMN: LEADERBOARDS & CHALLENGES --- */}
        <div style={styles.rightCol}>
          
          {/* Joinable Challenges Panel */}
          <div className="glass-panel" style={styles.panel}>
            <div style={styles.panelTitleRow}>
              <Sparkles size={18} color="#00e676" />
              <h3 style={styles.panelTitle}>Active Athletic Challenges</h3>
            </div>
            
            <div style={styles.challengeList}>
              {challenges.map(ch => (
                <div key={ch.id} style={styles.challengeItem} className="glass-panel">
                  <div style={styles.challengeInfo}>
                    <h4 style={styles.challengeTitle}>{ch.title}</h4>
                    <p style={ch.challengeParticipants}>{ch.participants.toLocaleString()} joined</p>
                  </div>
                  <button 
                    onClick={() => toggleChallenge(ch.id)}
                    style={{
                      ...styles.btnChallengeJoin,
                      ...(ch.joined ? styles.btnChallengeJoined : {})
                    }}
                  >
                    {ch.joined ? <CheckCircle2 size={14} /> : 'Join'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* XP Leaderboards */}
          <div className="glass-panel" style={styles.panel}>
            <div style={styles.panelTitleRow}>
              <Trophy size={18} color="#00e676" />
              <h3 style={styles.panelTitle}>Global Leaderboard</h3>
            </div>
            <p style={styles.panelDesc}>Weekly structural volume outputs.</p>

            <div style={styles.leadList}>
              {leaderboards.map(user => (
                <div key={user.rank} style={styles.leadItem}>
                  <div style={styles.leadRank}>#{user.rank}</div>
                  <img src={user.avatar} alt={user.name} style={styles.leadAvatar} />
                  <div style={styles.leadText}>
                    <span style={styles.leadName}>{user.name}</span>
                    <span style={styles.leadLvl}>{user.level}</span>
                  </div>
                  <span style={styles.leadVolume}>{user.volume}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '24px',
    alignItems: 'stretch'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  feedHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px'
  },
  panelTitle: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '1.15rem',
    fontWeight: '700',
    color: '#ffffff'
  },
  panelDesc: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    marginBottom: '16px'
  },
  feedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  postCard: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  userRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatarImg: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  userMeta: {
    display: 'flex',
    flexDirection: 'column'
  },
  userName: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#fff'
  },
  postTime: {
    fontSize: '0.72rem',
    color: '#9ca3af'
  },
  postBody: {
    fontSize: '0.92rem',
    color: '#e5e7eb',
    lineHeight: '1.5'
  },
  postAction: {
    fontWeight: '500'
  },
  postMetric: {
    color: '#00e676',
    fontWeight: '700',
    fontFamily: "'Outfit', sans-serif"
  },
  actionRow: {
    display: 'flex',
    gap: '16px',
    borderTop: '1px solid rgba(255,255,255,0.04)',
    paddingTop: '12px',
    marginTop: '4px'
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.78rem',
    cursor: 'pointer',
    transition: 'color 0.15s ease'
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  panel: {
    padding: '24px'
  },
  panelTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '18px'
  },
  challengeList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  challengeItem: {
    padding: '14px 18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px'
  },
  challengeInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  challengeTitle: {
    fontSize: '0.85rem',
    fontWeight: '700'
  },
  challengeParticipants: {
    fontSize: '0.72rem',
    color: '#9ca3af'
  },
  btnChallengeJoin: {
    padding: '6px 14px',
    borderRadius: '20px',
    backgroundColor: '#00e676',
    border: 'none',
    color: '#000',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: '700',
    fontSize: '0.78rem',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnChallengeJoined: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#00e676'
  },
  leadList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  leadItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.01)'
  },
  leadRank: {
    width: '28px',
    fontSize: '0.8rem',
    fontWeight: '800',
    color: '#00e676',
    fontFamily: "'Outfit', sans-serif"
  },
  leadAvatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  leadText: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  leadName: {
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  leadLvl: {
    fontSize: '0.72rem',
    color: '#9ca3af'
  },
  leadVolume: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#fff',
    fontFamily: "'Outfit', sans-serif"
  }
};

export default CommunityPage;
