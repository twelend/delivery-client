import RegisterForm from '@/features/auth/components/RegisterForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Создать Аккаунт',
}

export default function RegisterPage() {
    return <RegisterForm />
}