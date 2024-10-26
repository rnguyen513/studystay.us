import React, { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Home, Building, Home as Townhouse, HelpCircle, Upload, DollarSign, LoaderCircle } from 'lucide-react'
import { leagueSpartan } from '@/utils/fonts'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { DateRange } from 'react-day-picker'
import AuthPopup from '@/components/AuthPopup'
import Link from 'next/link'

import { createClient } from '@/utils/supabase/component'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = currentStep === totalSteps ? 100 : ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
      <motion.div
        className="bg-[#004aad] h-2.5 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}

const ImagePreview = ({ images }: { images: File[] }) => (
  <div className="grid grid-cols-2 gap-4 mt-4">
    {images.map((image, index) => (
      <div key={index} className="relative aspect-square">
        <img
          src={URL.createObjectURL(image)}
          alt={`Preview ${index + 1}`}
          className="object-cover w-full h-full rounded-md"
        />
      </div>
    ))}
  </div>
);

export default function OnboardingForm() {
  const [step, setStep] = useState(0)
  const [typeOfProperty, settypeOfProperty] = useState('')
  const [address, setAddress] = useState('')
  const [guests, setGuests] = useState(1)
  const [bedrooms, setBedrooms] = useState(1)
  const [beds, setBeds] = useState(1)
  const [baths, setbaths] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [submitMessage, setSubmitMessage] = useState<{message: string, status: "pending" | "success" | "error"}>({message: "", status: "pending"})
  const [price, setPrice] = useState(-1)
  const [extraCosts, setExtraCosts] = useState<string[]>([])
  const [otherRoommates, setOtherRoommates] = useState<string[]>([])
  const [dates, setDates] = useState<DateRange | undefined>()
  const [views, setViews] = useState(0)
  const [error, setError] = useState<string | null>(null);

  const [showAuth, setShowAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingSubmit, setPendingSubmit] = useState(false);
  const [userData, setUserData] = useState<{user: SupabaseUser | null} | null>(null);
  const supabase = createClient();

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUserData(data);
      setLoading(false);
    }
    fetchUserData();
  }, [])

  const totalSteps = 7

  const introSteps = [
    {
      title: "Tell us about your place",
      description: "Share some basic info, like where it is and how many guests can stay.",
      icon: "/placeholder.svg?height=80&width=80"
    },
    {
      title: "Make it stand out",
      description: "Add photos, a title, and a description to showcase your place.",
      icon: "/placeholder.svg?height=80&width=80"
    },
    {
      title: "Finish up and publish",
      description: "Set your availability, price, and publish your listing.",
      icon: "/placeholder.svg?height=80&width=80"
    }
  ]

  const typeOfPropertys = [
    { name: "House", icon: Home },
    { name: "Apartment", icon: Building },
    { name: "Townhouse", icon: Townhouse },
  ]

  const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => prev + 1)
  }

  const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
    setter(prev => Math.max(1, prev - 1))
  }

  const handleFinish = async () => {
    console.log('submitting listing:', {
      typeOfProperty,
      address,
      guests,
      bedrooms,
      baths,
      title,
      description,
      images,
      price,
      extraCosts,
      otherRoommates,
      dates,
      views,
    })

    setPendingSubmit(true);

    try {
      let uploadedImages = [];
      
      for (const image of images) {
        setSubmitMessage({message: `Uploading image ${images.indexOf(image) + 1} of ${images.length}...`, status: "pending"});
        try {
          const { data, error } = await supabase.storage.from('uploadedimages').upload(image.name, image, {
            cacheControl: '3600',
            upsert: true
          });

          if (error) {
            setSubmitMessage({message: "Something went wrong with image upload. Please try again later or contact Ryan at amk3ef@virginia.edu. " + error, status: "error"});
            return console.error('Error uploading image:', error);
          } else {
            uploadedImages.push("https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/" + data.fullPath);
            console.log("https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/" + data.fullPath);
          }
        } catch (error) {
          setSubmitMessage({message: "Something went wrong with image upload. Please try again later or contact Ryan at amk3ef@virginia.edu. " + error, status: "error"});
          return console.error('Unexpected error uploading image:', error);
        }
      }

      setSubmitMessage({message:"Uploading your listing...hang tight...", status: "pending"});

      console.log('Uploaded images: ' + "{" + uploadedImages.join(",") + "}");
      console.log("uploaded images stringify: " + JSON.stringify(uploadedImages).replace("[","{").replace("]", "}"));

      const { error } = await supabase.from('listings').insert([{
        typeOfProperty: typeOfProperty,
        address: address,
        guests: guests,
        bedrooms: bedrooms,
        baths: baths,
        title: title,
        description: description,
        images: uploadedImages,
        price: price,
        extraCosts: extraCosts,
        otherRoommates: otherRoommates,
        dates: dates,
        views: views,
        postedby: userData?.user?.id
      }]);

      if (error) {
        console.error('Error submitting listing:', error);
      } else {
        console.log('Listing submitted successfully!');
        setSubmitMessage({message: "Done!", status: "success"});
        setPendingSubmit(false);
        router.push("/mylistings");
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      setSubmitMessage({message: "Something went wrong. Please try again later or contact Ryan at amk3ef@virginia.edu. ERROR_DATABASE_DOWN", status: "error"});
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files))
    }
  }

  const isStepValid = useCallback(() => {
    switch(step) {
      case 1:
        return typeOfProperty !== ''
      case 2:
        return address.trim() !== ''
      case 3:
        return guests > 0 && bedrooms > 0 && beds > 0 && baths > 0
      case 4:
        return title.trim() !== '' && description.trim() !== '' && images.length > 0
      case 5:
        return price !== -1 && dates !== undefined
      case 6:
        return true // All fields in this step are optional
      default:
        return true
    }
  }, [step, typeOfProperty, address, guests, bedrooms, beds, baths, title, description, images, price, dates])

  const handleNextStep = useCallback(() => {
    if (isStepValid()) {
      setStep(prev => prev + 1)
      setError(null)
    } else {
      setError("Please fill in all required fields before proceeding.")
    }
  }, [isStepValid])

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
          >
            <h1 className="text-4xl font-bold text-center">It&apos;s easy to get started on <a className="text-[#004aad] font-extrabold">StudyStay</a></h1>
            <div className="grid gap-8 md:grid-cols-3 w-full">
              {introSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-4">
                  <img src={step.icon} alt="" className="w-24 h-24 object-contain" />
                  <h2 className="text-xl font-semibold">{index + 1}. {step.title}</h2>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            <Button className="w-full max-w-md" size="lg" onClick={() => setStep(prev => prev + 1)}>Get started</Button>
          </motion.div>
        )
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-semibold text-center">Which of these best describes your place?</h2>
            <div className="grid grid-cols-3 gap-6">
              {typeOfPropertys.map((type, index) => (
                <Button
                  key={index}
                  variant={typeOfProperty === type.name ? "default" : "outline"}
                  className="h-auto py-6 flex flex-col items-center gap-4"
                  onClick={() => settypeOfProperty(type.name)}
                >
                  <type.icon className="w-8 h-8"/>
                  <span className="text-lg">{type.name}</span>
                </Button>
              ))}
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-semibold text-center">Where&apos;s your place located?</h2>
            <p className="text-center text-gray-600">Your address is only shared with guests after they&apos;ve made a reservation.</p>
            <div className="relative">
              <img src="/placeholder.svg?height=300&width=600" alt="Map" className="w-full h-64 object-cover rounded-lg" />
              <Input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="absolute bottom-4 left-4 right-4 bg-white shadow-lg max-w-md mx-auto"
              />
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-semibold text-center">Share some basics about your place</h2>
            <p className="text-center text-gray-600">You&apos;ll add more details later, like bed types.</p>
            {[
              { label: "Guests", value: guests, setter: setGuests },
              { label: "Bedrooms", value: bedrooms, setter: setBedrooms },
              { label: "Beds", value: beds, setter: setBeds },
              { label: "baths", value: baths, setter: setbaths },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <Label htmlFor={item.label} className="text-lg">{item.label}</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDecrement(item.setter)}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center text-lg">{item.value}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleIncrement(item.setter)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-semibold text-center">Make your listing stand out</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-lg">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a catchy title for your listing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-lg">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your place"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="images" className="text-lg">Upload Images</Label>
                <div className="mt-2">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>
                {images.length > 0 && <ImagePreview images={images} />}
              </div>
            </div>
          </motion.div>
        )
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-semibold text-center">Set your price and availability</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="price" className="text-lg">Price per month</Label>
                <div className="relative mt-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="extraCosts" className="text-lg">Extra costs  (optional)</Label>
                <Input
                  id="extraCosts"
                  placeholder="e.g., Cleaning fee, Security deposit"
                  value={"something"}
                  onChange={(e) => setExtraCosts([e.target.value])}
                />
              </div>
              <div className="flex flex-col items-center">
                <Label className="text-lg">Available dates</Label>
                <div className="mt-2">
                  <Calendar
                    mode="range"
                    selected={dates}
                    onSelect={setDates}
                    className="rounded-md border mx-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )
      case 6:
        return (
          <motion.div
            key="step6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <h2 className="text-3xl font-semibold text-center">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="otherRoommates" className="text-lg">Other Roommates</Label>
                <Input
                  id="otherRoommates"
                  placeholder="Describe other roommates, if any"
                  value={"something"}
                  onChange={(e) => setOtherRoommates([e.target.value])}
                />
              </div>
              <div>
                <Label htmlFor="views" className="text-lg">Views</Label>
                <Input
                  id="views"
                  placeholder="Describe the views from your place"
                  value={views}
                  onChange={(e) => setViews(parseInt(e.target.value))}
                />
              </div>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  if ((!userData?.user || !userData.user.email_confirmed_at) && !loading) {
    return (
      <>
      <div>You need to be signed in and confirmed to create a listing. Let&apos;s get started.</div>
      <Button onClick={() => setShowAuth(true)}>Sign In</Button>
      {showAuth && <div className="z-50">
        <AuthPopup onClose={() => setShowAuth(false)}/>
      </div>}
      </>
    );
  }

  // if (pendingSubmit) {
  //   return <div className="z-50">Submitting your listing, please wait...</div>
  // }

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col ${leagueSpartan.className}`}>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/in" className="text-[#004aad] text-2xl font-extrabold pointer-cursor">StudyStay</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/help")}>
              <HelpCircle className="h-5 w-5 mr-2" />
              <a className="pt-1">Questions?</a>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <div className="w-full max-w-3xl mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {step > 0 && (
          <div className="w-full max-w-3xl mb-8">
            <ProgressBar currentStep={step+1} totalSteps={totalSteps} />
          </div>
        )}
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>
      {step > 0 && (
        <footer className="bg-white shadow-sm-top">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setStep(prev => prev - 1)}>Back</Button>
            {step === totalSteps - 1 ? (
              <Button onClick={handleFinish}>Finish</Button>
            ) : (
              <Button onClick={handleNextStep}>Next</Button>
            )}
          </div>
        </footer>
      )}

      <AnimatePresence>
        {pendingSubmit && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full relative"
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-5">
                  <div className="rounded-full animate-spin">
                    <LoaderCircle className="w-16 h-16"/>
                  </div>
              </div>
              {/* <h2 className="text-2xl font-bold text-blue-800 mb-2">{popupMessage[0] == "S" ? "Uh oh..." : "Thank You for Joining!"}</h2> */}
              <p className="text-gray-600 mb-4">
                {submitMessage.message}
              </p>
              {submitMessage.status == "error" && (
                <p className="text-red-600 mb-4">
                  <Button onClick={() => setPendingSubmit(false)}>Please contact Ryan at <a href="mailto:amk3ef@virginia.edu" className="bold">amk3ef@virginia.edu</a></Button>
                </p>)}
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}