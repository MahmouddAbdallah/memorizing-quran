import React from 'react'
import Header from './components/Header'
import Advantage from './components/Advantage'
import PreviousWork from './components/PreviousWork'
import Footer from './components/Footer'
import SubscribePlan from './components/SubscribePlan'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getRole } from '@/lib/verfiyAuth'

export const dynamic = 'force-dynamic'
const Home = () => {
  const token = cookies().get('token')?.value;
  const user = getRole(token)
  if (token) {
    if (user?.role != 'admin') {
      redirect('/profile/schedule')
    }
  }
  return (
    <div>
      <Header />
      <Advantage />
      <PreviousWork />
      <SubscribePlan />
      <Footer />
    </div>
  )
}

export default Home