import { Metadata } from 'next'
import React from 'react'
import ProfilePage from '@/features/user/ProfilePage'

export const metadata: Metadata = {
  title: 'Профиль',
  description: 'Профиль пользователя',
}

export default function Page() {
  return (
    <ProfilePage />
  )
}