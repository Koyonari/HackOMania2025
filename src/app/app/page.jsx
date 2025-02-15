'use client'
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import Post from '@/components/Post'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default function HomePage() {

    const [stats, setStats] = useState({
      userCount: 0,
      postCount: 0,
      betTotal: 0,
    })

    useEffect(() => {
      async function fetchStats() {
        // Query the total number of users (members)
        const { count: userCount, error: userError } = await supabase
          .from('Users')
          .select('*', { count: 'exact', head: true })
        if (userError) {
          console.error('Error fetching user count:', userError)
        }

        // Query the total number of posts (active challenges)
        const { count: postCount, error: postError } = await supabase
          .from('Posts')
          .select('*', { count: 'exact', head: true })
        if (postError) {
          console.error('Error fetching post count:', postError)
        }

        // Query all bets and sum their bet_amount field
        const { data: betsData, error: betsError } = await supabase
          .from('Bets')
          .select('amount')
        let betTotal = 0
        if (betsError) {
          console.error('Error fetching bets:', betsError)
        } else if (betsData) {
          // Sum up the bet_amounts (assuming bet_amount is numeric)
          betTotal = betsData.reduce((sum, row) => sum + row.amount, 0)
        }

        setStats({
          userCount: userCount || 0,
          postCount: postCount || 0,
          betTotal: betTotal || 0,
        })
      }
      fetchStats()
    }, [])

    
    const users = [
        {
          title: "Quitting Gambling",
          username: "Simon Tan",
          timePosted: "2 hours ago",
          content: "Day 1 of my journey to quit gambling. Taking it one day at a time.",
          betPool: {
            "believe": 1000,
            "doubt": 1200
          },
          commentCount: 15
        },
        {
          title: "Quitting Smoking",
          username: "Alice Ong",
          timePosted: "5 hours ago",
          content: "Two weeks smoke-free! The community support has been incredible.",
            betPool: {
            "believe": 1000,
            "doubt": 1200
          },
          commentCount: 32
        },
        {
          title: "Quitting Drinking",
          username: "Mary Tay",
          timePosted: "1 day ago",
          content: "Starting my sobriety journey. Looking forward to the support.",
          betPool: {
            "believe": 1000,
            "doubt": 1200
          },
          commentCount: 27
        }
    ]

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-accent-secondary/10 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-primary to-accent-primary text-transparent bg-clip-text">BETterHelp</h1>
          <div className="flex items-center gap-4">
            <input 
              type="search"
              placeholder="Search BETterHelp"
              className="px-4 py-2 bg-white border border-accent-secondary/20 rounded-full w-64 font-mono text-sm text-text-primary"
            />
            <Button className="bg-brand-primary hover:bg-brand-primary/90">
                Create Post
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-6 flex gap-6 p-4">
        {/* Posts Feed */}
        <div className="flex-grow space-y-4">
        {users.map((post, index) => (
            <Post key={index} user={post} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-80 space-y-4">
          <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 font-mono text-brand-primary">Community Stats</h2>
            <div className="text-lg space-y-2 text-text-primary">
              <p>👥 {stats.userCount.toLocaleString()} Members</p>
              <p>🎯 {stats.postCount.toLocaleString()} Active Challenges</p>
              <p>💰 ${stats.betTotal.toLocaleString()} Total Bets</p>
            </div>
          </div>
          
          <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 font-mono text-brand-primary">Top Categories</h2>
            <div className="text-lg space-y-2">
              <Link href="#" className="block text-accent-secondary hover:text-accent-primary transition">🚬 Smoking</Link>
              <Link href="#" className="block text-accent-secondary hover:text-accent-primary transition">🍺 Alcohol</Link>
              <Link href="#" className="block text-accent-secondary hover:text-accent-primary transition">🎮 Gaming</Link>
              <Link href="#" className="block text-accent-secondary hover:text-accent-primary transition">📱 Social Media</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
