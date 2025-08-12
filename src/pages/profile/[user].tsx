'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, User, GraduationCap, Linkedin, FileText, Camera, Edit, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { leagueSpartan } from '@/utils/fonts'
import { createClient } from '@/utils/supabase/component'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import Header from '@/components/header'
import StudyStayFooter from '@/components/StudyStayFooter'
import SeoHead from '@/components/SeoHead'
import ListingsArray from '@/components/ListingsArray'

interface ProfileData {
  first_name: string
  last_name: string
  profile_picture_url?: string
  gender: 'M' | 'F' | 'Other'
  gender_other_specify?: string
  description?: string
  school: string
  major: string
  linkedin_url?: string
  introduction?: string
}

export default function ProfileCompletion() {
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    profile_picture_url: '',
    gender: 'M',
    gender_other_specify: '',
    description: '',
    school: '',
    major: '',
    linkedin_url: '',
    introduction: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [currentUser, setCurrentUser] = useState<SupabaseUser | null>(null) // Currently logged in user
  const [profileOwner, setProfileOwner] = useState<any>(null) // Profile being viewed
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [hasExistingProfile, setHasExistingProfile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userListings, setUserListings] = useState<any[]>([])
  const [listingsLoading, setListingsLoading] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()
  const profileUserId = typeof router.query.user === 'string' ? router.query.user : undefined

  useEffect(() => {
    // Wait for router to be ready and we have a user id from the URL
    if (!router.isReady || !profileUserId) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Get currently logged in user (if any)
        const { data: { user } } = await supabase.auth.getUser()
        setCurrentUser(user)
        
        // Fetch profile data for the user ID in the URL
        const { data: profileData, error: profileError } = await supabase
          .from('public_user_data')
          .select('*')
          .eq('user_id', profileUserId)
          .single()
        
        if (profileError) {
          console.error('Error fetching profile:', profileError)
          setError('Failed to load profile')
          return
        }
        
        if (profileData) {
          // Check if profile is complete (has required fields filled)
          const isComplete = profileData.first_name && profileData.last_name && profileData.school && profileData.major
          
          setProfileData({
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            profile_picture_url: profileData.profile_picture_url || '',
            gender: profileData.gender || 'M',
            gender_other_specify: profileData.gender_other_specify || '',
            description: profileData.description || '',
            school: profileData.school || '',
            major: profileData.major || '',
            linkedin_url: profileData.linkedin_url || '',
            introduction: profileData.introduction || ''
          })
          setHasExistingProfile(isComplete)
          setProfileOwner(profileData)
        } else {
          // No profile found, this is a new user
          setHasExistingProfile(false)
          setProfileOwner(null)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load profile')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [supabase, profileUserId, router.isReady])

  // Set edit mode when profile is loaded (only once)
  useEffect(() => {
    if (!isLoading && !hasExistingProfile && !isEditing) {
      setIsEditing(true)
    }
  }, [isLoading, hasExistingProfile, isEditing])

  // Fetch user listings when profile is loaded
  useEffect(() => {
    const fetchUserListings = async () => {
      if (router.isReady && profileUserId && hasExistingProfile) {
        setListingsLoading(true)
        try {
          const { data: listings, error } = await supabase
            .from('listings')
            .select('*')
            .eq('postedby', profileUserId)
            .eq('available', true)
            .order('created_at', { ascending: false })
          
          if (error) {
            console.error('Error fetching listings:', error)
          } else {
            setUserListings(listings || [])
          }
        } catch (error) {
          console.error('Error fetching listings:', error)
        } finally {
          setListingsLoading(false)
        }
      }
    }
    
    fetchUserListings()
  }, [profileUserId, hasExistingProfile, supabase, router.isReady])

  const handleImageUpload = async (file: File) => {
    if (!currentUser) return
    
    setUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${currentUser.id}-${Date.now()}.${fileExt}`
      // Use user ID as the folder name to match storage policies
      const filePath = `${currentUser.id}/${fileName}`
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)
      
      if (uploadError) throw uploadError
      
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)
      
      setProfileData(prev => ({ ...prev, profile_picture_url: publicUrl }))
    } catch (error) {
      setError('Failed to upload image')
      console.error('Image upload error:', error)
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUser) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Validate required fields
      if (!profileData.first_name || !profileData.last_name || !profileData.school || !profileData.major) {
        throw new Error('Please fill in all required fields')
      }
      
      if (profileData.gender === 'Other' && !profileData.gender_other_specify) {
        throw new Error('Please specify your gender when selecting "Other"')
      }

      // Insert/update public_user_data table
      const { error: profileError } = await supabase
        .from('public_user_data')
        .upsert({
          user_id: currentUser.id,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          profile_picture_url: profileData.profile_picture_url || null,
          gender: profileData.gender,
          gender_other_specify: profileData.gender_other_specify || null,
          description: profileData.description || null,
          school: profileData.school,
          major: profileData.major,
          linkedin_url: profileData.linkedin_url || null,
          introduction: profileData.introduction || null
        })
      
      if (profileError) throw profileError

      setSuccess(true)
      // Redirect based on whether this was an edit or new profile
      setTimeout(() => {
        if (hasExistingProfile) {
          setIsEditing(false)
          setSuccess(false)
        } else {
          router.push('/in')
        }
      }, 2000)
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  // Show loading state until router is ready or we have a profileUserId, or while data is loading
  if (!router.isReady || !profileUserId || isLoading) {
    return (
      <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden flex flex-col`}>
        <SeoHead/>
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#004aad] mx-auto mb-4"></div>
              <p className="text-gray-600">
                {!router.isReady || !profileUserId ? 'Loading...' : 'Loading profile...'}
              </p>
            </div>
          </div>
        </main>
        <StudyStayFooter />
      </div>
    )
  }

  // Show error state if there was an error loading the profile
  if (error) {
    return (
      <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
        <SeoHead/>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <h2 className="text-2xl font-bold text-red-800 mb-2">Profile Not Found</h2>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700">
                Go Home
              </Button>
            </div>
          </div>
        </main>
        <StudyStayFooter />
      </div>
    )
  }

  if (success) {
    return (
      <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
        <SeoHead/>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <Card className="w-full max-w-md">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {hasExistingProfile ? 'Profile Updated!' : 'Profile Complete!'}
                </h2>
                <p className="text-gray-600 mb-4">
                  {hasExistingProfile 
                    ? 'Your profile has been successfully updated.' 
                    : 'Your profile has been successfully created.'
                  }
                </p>
                <p className="text-sm text-gray-500">Redirecting you to the main app...</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <StudyStayFooter />
      </div>
    )
  }

  // Only allow editing if current user is the profile owner
  if (isEditing && (!currentUser || currentUser.id !== profileUserId)) {
    router.push(`/profile/${profileUserId}`)
    return null
  }

  // Show view mode if profile exists and user is not editing
  if (hasExistingProfile && !isEditing && profileOwner) {
    return (
      <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
        <SeoHead/>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Profile Display - styled like a listing */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Profile Header */}
              <div className="relative bg-gradient-to-r from-[#004aad] to-[#0056cc] p-8 text-white">
                <div className="flex items-center space-x-6">
                  {profileData.profile_picture_url ? (
                    <Image
                      src={profileData.profile_picture_url}
                      alt="Profile"
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">
                      {profileData.first_name} {profileData.last_name}
                    </h2>
                    <div className="flex items-center space-x-4 text-lg">
                      <span className="flex items-center">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        {profileData.school}
                      </span>
                      <span className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        {profileData.major}
                      </span>
                    </div>
                  </div>
                  
                  {/* Only show edit button if current user is the profile owner */}
                  {currentUser && currentUser.id === profileUserId && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="bg-white text-[#004aad] hover:bg-gray-100 px-6 py-3 text-lg font-semibold"
                    >
                      <Edit className="w-5 h-5 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-8 space-y-6">
                {/* Basic Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-[#004aad]" />
                      <div>
                        <span className="font-medium text-gray-700">Gender:</span>
                        <span className="ml-2 text-gray-900">
                          {profileData.gender === 'Other' ? profileData.gender_other_specify : profileData.gender}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-[#004aad]" />
                      <div>
                        <span className="font-medium text-gray-700">School:</span>
                        <span className="ml-2 text-gray-900">{profileData.school}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {profileData.linkedin_url && (
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Linkedin className="w-5 h-5 text-[#004aad]" />
                        <a
                          href={profileData.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#004aad] hover:underline font-medium"
                        >
                          View LinkedIn Profile
                        </a>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-[#004aad]" />
                      <div>
                        <span className="font-medium text-gray-700">Profile Status:</span>
                        <span className="ml-2 text-green-600 font-semibold">Complete ✓</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Introduction */}
                {profileData.introduction && (
                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold text-gray-900 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-[#004aad]" />
                      About
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {profileData.introduction}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons - Only show for profile owner */}
                {currentUser && currentUser.id === profileUserId && (
                  <div className="flex space-x-4 pt-6 border-t border-gray-200">
                    <Button
                      onClick={() => router.push('/in')}
                      className="flex-1 bg-[#004aad] hover:bg-[#003d8f] text-white py-3 text-lg font-semibold"
                    >
                      Go Home
                    </Button>
                    <Button
                      onClick={() => router.push('/onboarding')}
                      variant="outline"
                      className="flex-1 py-3 text-lg font-semibold"
                    >
                      List a Stay
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* User's Listings Section */}
            {userListings.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {profileData.first_name}&apos;s Available Stays
                </h3>
                <ListingsArray listings={userListings} user={currentUser ?? undefined} />
              </div>
            )}

            {/* No Listings Message */}
            {!listingsLoading && userListings.length === 0 && hasExistingProfile && (
              <div className="mt-8 text-center">
                <div className="bg-gray-50 rounded-lg p-8">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Available Stays</h3>
                  <p className="text-gray-500">This user doesn&apos;t have any available stays at the moment.</p>
                </div>
              </div>
            )}

            {/* Listings Loading State */}
            {listingsLoading && (
              <div className="mt-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004aad] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading stays...</p>
              </div>
            )}
          </motion.div>
        </main>
        <StudyStayFooter />
      </div>
    )
  }

      // Only allow editing if current user is the profile owner and we have profile data
      if (!currentUser || currentUser.id !== profileUserId || !profileOwner) {
        return (
          <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
            <SeoHead/>
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                  <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
                  <p className="text-red-600 mb-4">You can only edit your own profile.</p>
                  <Button onClick={() => router.push(`/profile/${profileUserId}`)} className="bg-red-600 hover:bg-red-700">
                    View Profile
                  </Button>
                </div>
              </div>
            </main>
            <StudyStayFooter />
          </div>
        )
      }

      // Only allow profile completion if current user is the profile owner and we have a valid profileUserId
      if (!hasExistingProfile && (!currentUser || currentUser.id !== profileUserId || !profileUserId)) {
        return (
          <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
            <SeoHead/>
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                  <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-red-800 mb-2">Access Denied</h2>
                  <p className="text-red-600 mb-4">You can only complete your own profile.</p>
                  <Button onClick={() => router.push('/')} className="bg-red-600 hover:bg-red-700">
                    Go Home
                  </Button>
                </div>
              </div>
            </main>
            <StudyStayFooter />
          </div>
        )
      }

      // Show profile completion form for new users (incomplete profiles)
      if (!hasExistingProfile) {
        // Set editing mode to true so they can fill out their profile
        setIsEditing(true)
      }

      return (
      <div className={`min-h-screen bg-white text-black ${leagueSpartan.className} text-xl overflow-hidden`}>
        <SeoHead/>
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-5">
            {hasExistingProfile && (
              <Button
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="p-2"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            )}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Profile Edit Form - styled like the profile display */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-[#004aad] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">
                  {hasExistingProfile ? 'Edit Your Profile' : 'Complete Your Profile'}
                </CardTitle>
                <CardDescription className="text-lg">
                  {hasExistingProfile 
                    ? 'Update your profile information' 
                    : 'Help us get to know you better and verify your identity'
                  }
                </CardDescription>
            
                          </CardHeader>
              
              {/* Form Content */}
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 font-medium">{error}</p>
                    </div>
                  )}

                  {/* Profile Picture */}
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Profile Picture (Optional)</Label>
                    <div className="flex items-center space-x-4">
                      {profileData.profile_picture_url ? (
                        <div className="relative">
                          <Image
                            src={profileData.profile_picture_url} 
                            alt="Profile" 
                            className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => setProfileData(prev => ({ ...prev, profile_picture_url: '' }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
        <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              setProfilePicture(file)
                              handleImageUpload(file)
                            }
                          }}
                          className="hidden"
                          id="profile-picture"
                        />
                        <Label 
                          htmlFor="profile-picture" 
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploadingImage ? 'Uploading...' : 'Upload Photo'}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name" className="text-base font-medium">
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="first_name"
                        value={profileData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name" className="text-base font-medium">
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="last_name"
                        value={profileData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-base font-medium">
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select 
                      value={profileData.gender} 
                      onValueChange={(value: 'M' | 'F' | 'Other') => handleInputChange('gender', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="M">Male</SelectItem>
                        <SelectItem value="F">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {profileData.gender === 'Other' && (
                      <Input
                        placeholder="Please specify your gender"
                        value={profileData.gender_other_specify}
                        onChange={(e) => handleInputChange('gender_other_specify', e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>

                  {/* School and Major */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="school" className="text-base font-medium">
                        School <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="school"
                        value={profileData.school}
                        onChange={(e) => handleInputChange('school', e.target.value)}
                        placeholder="e.g., University of Virginia"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major" className="text-base font-medium">
                        Major <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="major"
                        value={profileData.major}
                        onChange={(e) => handleInputChange('major', e.target.value)}
                        placeholder="e.g., Computer Science"
                        required
                      />
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-2">
                    <Label htmlFor="linkedin_url" className="text-base font-medium flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn URL (Optional)
                    </Label>
                    <Input
                      id="linkedin_url"
                      type="url"
                      value={profileData.linkedin_url}
                      onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-base font-medium flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Description (Optional)
                    </Label>
                    <Textarea
                      id="description"
                      value={profileData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Tell us a bit about yourself to help verify your identity..."
                      rows={3}
                    />
                    <p className="text-sm text-gray-500">
                      This information helps us verify your identity and won&apos;t be publicly visible.
                    </p>
                  </div>

                  {/* Introduction */}
                  <div className="space-y-2">
                    <Label htmlFor="introduction" className="text-base font-medium">
                      Introduction (Optional)
                    </Label>
                    <Textarea
                      id="introduction"
                      value={profileData.introduction}
                      onChange={(e) => handleInputChange('introduction', e.target.value)}
                      placeholder="Write a brief introduction that other users can see..."
                      rows={4}
                    />
                    <p className="text-sm text-gray-500">
                      This will be visible to other users on the platform.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-[#004aad] hover:bg-[#003d8f] text-white py-3 text-lg font-semibold"
                    disabled={loading || uploadingImage}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving Profile...
                      </div>
                    ) : (
                      hasExistingProfile ? 'Update Profile' : 'Complete Profile'
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        </main>
        <StudyStayFooter />
        </div>
    )
}