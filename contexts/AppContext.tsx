import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Story, Reward, QAndA, ReadingLevel } from '../types';
import { INITIAL_REWARDS } from '../constants';

interface AppContextType {
  profile: Profile;
  setProfile: (profile: Profile) => void;
  stories: Story[];
  setStories: (stories: Story[]) => void;
  rewards: Reward[];
  setRewards: (rewards: Reward[]) => void;
  points: number;
  setPoints: (points: number) => void;
  qAndAs: QAndA[];
  setQAndAs: (qAndAs: QAndA[]) => void;
  addStory: (story: Story) => void;
  markStoryAsRead: (storyId: string) => void;
  addQAndA: (qAndA: QAndA) => void;
  unlockReward: (rewardId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    age: 7,
    classLevel: 1,
    level: ReadingLevel.Pemula,
    interests: []
  });

  const [stories, setStories] = useState<Story[]>([]);
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [points, setPoints] = useState<number>(0);
  const [qAndAs, setQAndAs] = useState<QAndA[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profile');
    const savedStories = localStorage.getItem('stories');
    const savedRewards = localStorage.getItem('rewards');
    const savedPoints = localStorage.getItem('points');
    const savedQAndAs = localStorage.getItem('qAndAs');

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedStories) {
      setStories(JSON.parse(savedStories));
    }
    if (savedRewards) {
      setRewards(JSON.parse(savedRewards));
    }
    if (savedPoints) {
      setPoints(parseInt(savedPoints));
    }
    if (savedQAndAs) {
      setQAndAs(JSON.parse(savedQAndAs));
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem('points', points.toString());
  }, [points]);

  useEffect(() => {
    localStorage.setItem('qAndAs', JSON.stringify(qAndAs));
  }, [qAndAs]);

  const addStory = (story: Story) => {
    setStories(prev => [story, ...prev]);
  };

  const markStoryAsRead = (storyId: string) => {
    setStories(prev => prev.map(story => 
      story.id === storyId ? { ...story, isRead: true } : story
    ));
    setPoints(prev => prev + 50); // Award points for reading
  };

  const addQAndA = (qAndA: QAndA) => {
    setQAndAs(prev => [qAndA, ...prev]);
    setPoints(prev => prev + 25); // Award points for asking questions
  };

  const unlockReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (reward && points >= reward.cost) {
      setRewards(prev => prev.map(r => 
        r.id === rewardId ? { ...r, unlocked: true } : r
      ));
      setPoints(prev => prev - reward.cost);
    }
  };

  const value: AppContextType = {
    profile,
    setProfile,
    stories,
    setStories,
    rewards,
    setRewards,
    points,
    setPoints,
    qAndAs,
    setQAndAs,
    addStory,
    markStoryAsRead,
    addQAndA,
    unlockReward
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};