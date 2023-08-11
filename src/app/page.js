'use client'
import useAuth from '@/hooks/useAuth'
import Image from 'next/image'

export default function Home() {
  const { loading, user } = useAuth()


  if (loading) return null
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
    </main>
  )
}
