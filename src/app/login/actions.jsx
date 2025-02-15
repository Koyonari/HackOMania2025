'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { data: authData, error: authError } = await supabase.auth.signInWithPassword(data)

  if (authError) {
    redirect('/error')
  }

  //check if user exists in the table
  const { data: userData, error: userError } = await supabase
    .from('Users')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (userError || !userData) {
    // Create user profile if it doesn't exist
    const { error: profileError } = await supabase
      .from('Users')
      .insert({
        id: authData.user.id,
        name: authData.user.name,
        email: authData.user.email,
      })

    if (profileError) {
      redirect('/error')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  // First create the auth user
  const { error: authError } = await supabase.auth.signUp(data)

  if (authError) {
    redirect('/error')
  }

  // Then store additional user data in your users table
  const { error: profileError } = await supabase
    .from('Users')
    .insert({
      email: data.email,
      name: formData.get('name'),
      // Add any other fields you want to collect
    })

  if (profileError) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}