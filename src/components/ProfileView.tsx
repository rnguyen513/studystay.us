'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/component'
import { getProfileData, ProfileData } from '@/utils/profileUtils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, GraduationCap, Linkedin, FileText, MapPin } from 'lucide-react'
import { leagueSpartan } from '@/utils/fonts'

interface ProfileViewProps {
  userId: string
  showFullProfile?: boolean
}

export default function ProfileView({ userId, showFullProfile = false }: ProfileViewProps) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileData(userId)
        setProfileData(data)
      } catch (err) {
        setError('Failed to load profile')
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004aad]"></div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">Profile not found or unavailable</p>
        </CardContent>
      </Card>
    )
  }

  const getGenderDisplay = (gender: string, specify?: string | null) => {
    switch (gender) {
      case 'M': return 'Male'
      case 'F': return 'Female'
      case 'Other': return specify || 'Other'
      default: return gender
    }
  }

  return (
    <Card className={`${leagueSpartan.className} ${showFullProfile ? 'w-full' : 'max-w-md'}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {profileData.profile_picture_url ? (
            <img
              src={profileData.profile_picture_url}
              alt={`${profileData.first_name} ${profileData.last_name}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#004aad]"
            />
          ) : (
            <div className="w-24 h-24 bg-[#004aad] rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
          )}
        </div>
        <CardTitle className="text-2xl font-bold">
          {profileData.first_name} {profileData.last_name}
        </CardTitle>
        <CardDescription className="text-lg">
          {profileData.school}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-[#004aad]" />
            <span className="font-medium">Major:</span>
            <span>{profileData.major}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-[#004aad]" />
            <span className="font-medium">Gender:</span>
            <span>{getGenderDisplay(profileData.gender, profileData.gender_other_specify)}</span>
          </div>
        </div>

        {/* Introduction */}
        {profileData.introduction && (
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900">About</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {profileData.introduction}
            </p>
          </div>
        )}

        {/* LinkedIn */}
        {profileData.linkedin_url && (
          <div className="flex items-center space-x-2">
            <Linkedin className="w-4 h-4 text-[#004aad]" />
            <a
              href={profileData.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#004aad] hover:underline text-sm"
            >
              View LinkedIn Profile
            </a>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {profileData.school}
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {profileData.major}
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            {getGenderDisplay(profileData.gender, profileData.gender_other_specify)}
          </Badge>
        </div>

        {/* Full Profile Details (only shown when showFullProfile is true) */}
        {showFullProfile && profileData.description && (
          <div className="space-y-2 pt-4 border-t">
            <h4 className="font-semibold text-gray-900 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-[#004aad]" />
              Additional Information
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {profileData.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
