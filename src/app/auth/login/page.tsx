import LoginForm from '@/features/auth/components/LoginForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Войти в Аккаунт',
}

export default function SingInPage() {
    return <LoginForm />
}