"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Home,
    Building,
    HelpCircle,
    Upload,
    DollarSign,
    LoaderCircle,
    CalendarDays,
    Camera,
    NotebookPen,
    School,
    LogIn,
} from "lucide-react"
import { leagueSpartan } from "@/utils/fonts"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import type { DateRange } from "react-day-picker"
import AuthPopup from "@/components/AuthPopup"
import Link from "next/link"
import Image from "next/image"
import { GoogleMapsEmbed } from "@next/third-parties/google"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

import { v4 } from "uuid"

import { createClient } from "@/utils/supabase/component"
import type { User as SupabaseUser } from "@supabase/supabase-js"

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
                <Image
                    src={URL.createObjectURL(image) || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    width={0}
                    height={0}
                    className="object-cover w-full h-full rounded-md"
                />
            </div>
        ))}
    </div>
)

export default function OnboardingForm() {
    const [step, setStep] = useState(0)
    const [typeOfProperty, settypeOfProperty] = useState("")
    const [address, setAddress] = useState("")
    const [guests, setGuests] = useState(1)
    const [bedrooms, setBedrooms] = useState(1)
    const [beds, setBeds] = useState(1)
    const [baths, setbaths] = useState(1)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState<File[]>([])
    const [uploadedImages, setUploadedImages] = useState<string[]>([])
    const [submitMessage, setSubmitMessage] = useState<{ message: string; status: "pending" | "success" | "error" }>({
        message: "",
        status: "pending",
    })
    const [price, setPrice] = useState<number>(0)
    const [extraCosts, setExtraCosts] = useState<string[]>([])
    const [otherRoommates, setOtherRoommates] = useState<string[]>([])
    const [dates, setDates] = useState<DateRange | undefined>()
    const [gender, setGender] = useState("")
    const [additionalContact, setAdditionalContact] = useState("")
    const [sharedBathroom, setSharedBathroom] = useState(false)
    const [available_semester, setAvailable_semester] = useState("Summer")
    const [available_year, setAvailable_year] = useState(2025)
    const [furnished, setFurnished] = useState(false)
    const [petsAllowed, setPetsAllowed] = useState(false)
    const [carParkingSpace, setCarParkingSpace] = useState(false)
    const [washerAndDryer, setWasherAndDryer] = useState(false)
    const [handicapAccessible, setHandicapAccessible] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [agreementFile, setAgreementFile] = useState<File | null>(null)
    const [uploadedAgreementUrl, setUploadedAgreementUrl] = useState<string | null>(null)
    const [signedAgreementUrl, setSignedAgreementUrl] = useState<string | null>(null)

    const [sellerSignature, setSellerSignature] = useState("")

    const [showAuth, setShowAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const [pendingSubmit, setPendingSubmit] = useState(false)
    const [userData, setUserData] = useState<{ user: SupabaseUser | null } | null>(null)
    const supabase = createClient()

    const router = useRouter()

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await supabase.auth.getUser()
            setUserData(data)
            setLoading(false)
        }
        fetchUserData()
    }, [supabase])

    const totalSteps = 10

    const introSteps = [
        {
            title: "Tell us about your place",
            description: "Share some basic info, like where it is and how many guests can stay.",
            icon: "NotebookPen",
        },
        {
            title: "Make it stand out",
            description: "Add photos, a title, and a description to showcase your place.",
            icon: "Camera",
        },
        {
            title: "Finish up and publish",
            description: "Set your availability, price, and publish your listing.",
            icon: "CalendarDays",
        },
    ]

    const typeOfProperties = [
        { name: "House", icon: Home },
        { name: "Apartment", icon: Building },
        { name: "Townhouse", icon: School },
    ]

    const handleIncrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter((prev) => prev + 1)
    }

    const handleDecrement = (setter: React.Dispatch<React.SetStateAction<number>>) => {
        setter((prev) => Math.max(1, prev - 1))
    }

    const handleFinish = async () => {
        if (pendingSubmit) return

        setPendingSubmit(true)

        try {
            const uploadedImages = []

            for (const image of images) {
                setSubmitMessage({
                    message: `Uploading image ${images.indexOf(image) + 1} of ${images.length}...`,
                    status: "pending",
                })
                try {
                    const { data, error } = await supabase.storage.from("uploadedimages").upload(v4(), image, {
                        cacheControl: "3600",
                        upsert: true,
                    })

                    if (error) {
                        setSubmitMessage({
                            message:
                                "Something went wrong with image upload. Please try again later or contact Ryan at amk3ef@virginia.edu. " +
                                error,
                            status: "error",
                        })
                        return console.error("Error uploading image:", error)
                    } else {
                        uploadedImages.push("https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/" + data.fullPath)
                        console.log("https://zinuafgdmiwpkvlixboz.supabase.co/storage/v1/object/" + data.fullPath)
                    }
                } catch (error) {
                    setSubmitMessage({
                        message:
                            "Something went wrong with image upload. Please try again later or contact Ryan at amk3ef@virginia.edu. " +
                            error,
                        status: "error",
                    })
                    return console.error("Unexpected error uploading image:", error)
                }
            }

            if (!uploadedAgreementUrl) {
                setSubmitMessage({
                    message: "Please upload the sublease agreement before submitting.",
                    status: "error",
                })
                return
            }

            setSubmitMessage({ message: "Uploading your listing...hang tight...", status: "pending" })

            const { error } = await supabase.from("listings").insert([
                {
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
                    postedby: userData?.user?.id,
                    postedbyemail: userData?.user?.email,
                    location: "University of Virginia (UVA)",
                    gender: gender.toLowerCase(),
                    available: true,
                    sharedbathroom: sharedBathroom,
                    available_semester: available_semester,
                    available_year: available_year,
                    furnished: furnished,
                    pets_allowed: petsAllowed,
                    car_parking_space: carParkingSpace,
                    washer_and_dryer: washerAndDryer,
                    handicap_accessible: handicapAccessible,
                    agreementUrl: uploadedAgreementUrl,
                    seller_signature: sellerSignature
                },
            ])

            if (error) {
                console.error("Error submitting listing:", error)
            } else {
                console.log("Listing submitted successfully!")
                setSubmitMessage({ message: "Done!", status: "success" })
                router.push("/mylistings")
            }
        } catch (error) {
            console.error("Error submitting listing:", error)
            setSubmitMessage({
                message:
                    "Something went wrong. Please try again later or contact Ryan at amk3ef@virginia.edu. ERROR_DATABASE_DOWN",
                status: "error",
            })
        }
    }

    const handleAgreementUpload = async (file: File) => {
        try {
            const filePath = `agreements/${v4()}-${file.name}` // Ensure filename includes folder
            const { data, error } = await supabase.storage
                .from("uploadedagreements")
                .upload(filePath, file, {
                    cacheControl: "3600",
                    upsert: true,
                })

            if (error) {
                console.error("Error uploading agreement:", error)
                setSubmitMessage({ message: "Failed to upload agreement file", status: "error" })
                return
            }

            // Save the exact file path for database insert later
            setUploadedAgreementUrl(filePath)

            // Generate a signed URL
            const { data: signedData, error: signedError } = await supabase.storage
                .from("uploadedagreements")
                .createSignedUrl(filePath, 60 * 60) // 1 hour

            if (signedError || !signedData?.signedUrl) {
                console.error("Failed to generate signed URL:", signedError)
                setSubmitMessage({ message: "Failed to create signed link", status: "error" })
                return
            }

            setSignedAgreementUrl(signedData.signedUrl)
            console.log("Agreement uploaded and signed URL generated:", signedData.signedUrl)

        } catch (err) {
            console.error("Unexpected error uploading agreement:", err)
            setSubmitMessage({ message: "Unexpected upload error", status: "error" })
        }
    }

    const generateAndUploadSignedAgreement = async (fullName: string) => {
        try {
            const existingPdfBytes = await fetch("/studystay-seller-agreement.pdf").then(res => res.arrayBuffer())
            const pdfDoc = await PDFDocument.load(existingPdfBytes)

            const pages = pdfDoc.getPages()
            const firstPage = pages[1]
            const { height, width } = firstPage.getSize()

            const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
            const smallFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

            const signatureX = width * 0.5
            const signatureY = height * 0.5

            // 🔏 Signature block
            firstPage.drawText(`${fullName}`, {
                x: signatureX * 0.5 + 80,
                y: signatureY + 20,
                size: 12,
                font,
                color: rgb(0, 0, 0),
            })

            firstPage.drawText(`${new Date().toLocaleDateString()}`, {
                x: signatureX * 1.5 - 10,
                y: signatureY + 20,
                size: 12,
                font,
                color: rgb(0, 0, 0),
            })

            firstPage.drawText(`${new Date().toLocaleDateString()}`, {
                x: signatureX * 1.5 - 5,
                y: signatureY - 30,
                size: 12,
                font,
                color: rgb(0, 0, 0),
            })

            // 💧 Watermark footer
            firstPage.drawText("Digitally signed via StudyStay", {
                x: width / 2 - 100,
                y: height / 2 - 50,
                size: 10,
                font: smallFont,
                color: rgb(0.5, 0.5, 0.5),
            })

            const signedPdfBytes = await pdfDoc.save()
            const signedBlob = new Blob([signedPdfBytes], { type: "application/pdf" })
            const signedFile = new File([signedBlob], `signed-seller-agreement-${v4()}.pdf`, { type: "application/pdf" })

            const filePath = `agreements/${signedFile.name}`

            const { data, error } = await supabase.storage
                .from("uploadedagreements")
                .upload(filePath, signedFile, { upsert: true })

            if (error) {
                throw new Error("Upload failed: " + error.message)
            }

            setUploadedAgreementUrl(filePath)

            const { data: signedUrlData } = await supabase.storage
                .from("uploadedagreements")
                .createSignedUrl(filePath, 60 * 60)

            if (signedUrlData?.signedUrl) {
                setSignedAgreementUrl(signedUrlData.signedUrl)
            }

            console.log("Signed agreement uploaded successfully:", filePath)
        } catch (err) {
            console.error("Error generating/saving signed agreement:", err)
            setSubmitMessage({ message: "Failed to sign and upload agreement.", status: "error" })
        }
    }

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(Array.from(event.target.files))
        }
    }

    const isStepValid = useCallback(() => {
        switch (step) {
            case 0:
                return price > 0 // Rent screen requires price
            case 1:
                return true // Intro screen is always valid
            case 2:
                return typeOfProperty !== ""
            case 3:
                return address.trim() !== ""
            case 4:
                return guests > 0 && bedrooms > 0 && beds > 0 && baths > 0
            case 5:
                return title.trim() !== "" && description.trim() !== "" && images.length > 0
            case 6:
                return price > 0 && dates !== undefined
            case 7:
                return true // All fields in this step are optional
            case 8:
                return uploadedAgreementUrl
            case 9:
                return sellerSignature.trim().length > 0
            default:
                return true
        }
    }, [step, typeOfProperty, address, guests, bedrooms, beds, baths, title, description, images, price, dates, uploadedAgreementUrl, sellerSignature])

    const handleNextStep = useCallback(() => {
        if (isStepValid()) {
            setStep((prev) => prev + 1)
            setError(null)
        } else {
            setError("Please fill in all required fields before proceeding.")
        }
    }, [isStepValid])

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto space-y-8 mt-[-10rem]"
                    >
                        <h2 className="text-4xl font-semibold text-center">How much is your rent?</h2>
                        <div className="flex flex-col items-center w-full space-y-6">
                            <div className="relative mt-1 w-full">
                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="Enter your monthly rent"
                                    value={price || ""}
                                    onChange={(e) => setPrice(Number.parseInt(e.target.value) || 0)}
                                    className="pl-10 w-full"
                                />
                            </div>

                            <p className="text-gray-500">Pro tip: most sublettors price the rent at 50-75% of their actual rent to attract buyers.</p>

                            <div>
                                <Button
                                    className="h-auto flex flex-col items-center gap-4 hover:bg-green-200"
                                    variant="outline"
                                    disabled={price ? false : true}
                                    onClick={() => setStep(1)}
                                >
                                    Confirm
                                </Button>
                            </div>

                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                <Button
                                    className="h-auto py-6 flex flex-col items-center gap-4 hover:bg-green-200"
                                    variant="outline"
                                    disabled={price ? false : true}
                                    onClick={async () => {
                                        const { error } = await supabase.from("sell_now_emails").insert([
                                            {
                                                price: Math.max(Math.floor(price * 0.1),50),
                                                email: userData?.user?.email,
                                            },
                                        ])
                                        if (!error) {
                                            alert("The StudyStay Team has been notified. You'll hear back soon.")
                                            router.push("/in")
                                        }
                                    }}
                                >
                                    <DollarSign className="w-8 h-8" />
                                    <span className="text-lg">
                                        Sell now for <a className="font-black">${price ? Math.max(Math.floor(price * 0.1),50) : "__"}</a>
                                    </span>
                                    <span className="text-sm text-muted-foreground text-wrap">
                                        StudyStay will buy your sublease. You&apos;ll be paid immediately.
                                    </span>
                                </Button>

                                <Button
                                    className="h-auto py-6 flex flex-col items-center gap-4"
                                    variant="outline"
                                    disabled={price ? false : true}
                                    onClick={() => setStep(1)}
                                >
                                    <Building className="w-8 h-8" />
                                    <span className="text-lg">List for 100%: <a className="font-black">${price ? Math.floor(price) : "__"}</a></span>
                                    <span className="text-sm text-muted-foreground text-wrap">
                                        Your sublease will be posted to the market. This amount may decrease over time based on demand.
                                    </span>
                                </Button>
                            </div> */}
                        </div>
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
                        className="max-w-3xl mx-auto space-y-8 flex flex-col items-center"
                    >
                        <h1 className="text-4xl font-bold text-center">
                            It&apos;s easy to get started on <a className="text-[#004aad] font-extrabold">StudyStay</a>
                        </h1>
                        <div className="grid gap-8 md:grid-cols-3 w-full">
                            <div className="flex flex-col items-center text-center gap-4">
                                <NotebookPen className="w-24 h-24" />
                                <h2 className="text-xl font-semibold">1. {introSteps[0].title}</h2>
                                <p className="text-gray-600">{introSteps[0].description}</p>
                            </div>
                            <div className="flex flex-col items-center text-center gap-4">
                                <Camera className="w-24 h-24" />
                                <h2 className="text-xl font-semibold">2. {introSteps[1].title}</h2>
                                <p className="text-gray-600">{introSteps[1].description}</p>
                            </div>
                            <div className="flex flex-col items-center text-center gap-4">
                                <CalendarDays className="w-24 h-24" />
                                <h2 className="text-xl font-semibold">3. {introSteps[2].title}</h2>
                                <p className="text-gray-600">{introSteps[2].description}</p>
                            </div>
                        </div>
                        <Button className="w-full max-w-md" size="lg" onClick={() => setStep(2)}>
                            Get started
                        </Button>
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
                        <h2 className="text-3xl font-semibold text-center">Which of these best describes your place?</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {typeOfProperties.map((type, index) => (
                                <Button
                                    key={index}
                                    variant={typeOfProperty === type.name ? "default" : "outline"}
                                    className="h-auto py-6 flex flex-col items-center gap-4"
                                    onClick={() => settypeOfProperty(type.name)}
                                >
                                    <type.icon className="w-8 h-8" />
                                    <span className="text-lg">{type.name}</span>
                                </Button>
                            ))}
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
                        className="max-w-2xl mx-auto space-y-8"
                    >
                        <h2 className="text-3xl font-semibold text-center">Where&apos;s your place located?</h2>
                        <p className="text-center text-gray-600">
                            This information will be available to the public. Use the name of your apartment complex or just a general
                            location.
                        </p>
                        <div className="relative bg-gray-400 rounded-lg">
                            <div className="hidden md:block">
                                <GoogleMapsEmbed
                                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
                                    height={300}
                                    width={600}
                                    mode="place"
                                    loading="eager"
                                    q={address == "" ? "University of Virginia, Charlottesville, VA" : address}
                                />
                            </div>
                            <div className="block md:hidden">
                                <GoogleMapsEmbed
                                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
                                    height={200}
                                    width={400}
                                    mode="place"
                                    loading="eager"
                                    q={address == "" ? "University of Virginia, Charlottesville, VA" : address}
                                />
                            </div>
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
            case 4:
                return (
                    <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-xl mx-auto space-y-8"
                    >
                        <h2 className="text-3xl font-semibold text-center">Share some basics about your place</h2>
                        <p className="text-center text-gray-600">
                            You&apos;ll add more details later, like a description and amenities
                        </p>
                        {[
                            { label: "Spots available", value: guests, setter: setGuests },
                            { label: "Bedrooms for lease", value: bedrooms, setter: setBedrooms },
                            { label: "Bathrooms for lease", value: baths, setter: setbaths },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <Label htmlFor={item.label} className="text-lg">
                                    {item.label}
                                </Label>
                                <div className="flex items-center space-x-4">
                                    <Button variant="outline" size="icon" onClick={() => handleDecrement(item.setter)}>
                                        -
                                    </Button>
                                    <span className="w-8 text-center text-lg">{item.value}</span>
                                    <Button variant="outline" size="icon" onClick={() => handleIncrement(item.setter)}>
                                        +
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <div className={`flex items-center justify-between ${sharedBathroom ? "" : "opacity-50"}`}>
                            <Label htmlFor="sharedBathroom" className="text-lg">
                                - Shared bathroom?
                            </Label>
                            <Checkbox checked={sharedBathroom} onCheckedChange={() => setSharedBathroom(!sharedBathroom)} />
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
                        <h2 className="text-3xl font-semibold text-center">Make your listing stand out</h2>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title" className="text-lg">
                                    Title
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Enter a catchy title for your listing"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-lg">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your place"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={5}
                                />
                            </div>
                            <div>
                                <div className="flex flex-row items-center space-x-2">
                                    <Upload className="w-6 h-6" />
                                    <Label htmlFor="images" className="text-lg">
                                        Upload Images
                                    </Label>
                                </div>
                                <div className="mt-2">
                                    <Input id="images" type="file" accept="image/*" multiple onChange={handleImageUpload} />
                                </div>
                                {images.length > 0 && <ImagePreview images={images} />}
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
                        <h2 className="text-3xl font-semibold text-center">Set your price and availability</h2>
                        <div className="space-y-4">
                            {/* <div>
                                <Label htmlFor="price" className="text-lg">
                                    Price per month
                                </Label>
                                <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <Input
                                        id="price"
                                        type="number"
                                        placeholder="0"
                                        value={price}
                                        onChange={(e) => setPrice(Number.parseInt(e.target.value))}
                                        className="pl-10"
                                    />
                                </div>
                            </div> */}
                            <div>
                                <Label htmlFor="extraCosts" className="text-lg">
                                    Extra costs (optional)
                                </Label>
                                <Input
                                    id="extraCosts"
                                    placeholder="e.g., Cleaning fee, Security deposit"
                                    value={extraCosts[0]}
                                    onChange={(e) => setExtraCosts([e.target.value])}
                                />
                            </div>
                            <div className="flex flex-row gap-4 items-center">
                                <div className="flex flex-col items-center">
                                    <Label className="text-lg">Available dates</Label>
                                    <div className="mt-2">
                                        <Calendar mode="range" selected={dates} onSelect={setDates} className="rounded-md border mx-auto" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Semester and Year</h3>
                                    <div className="grid gap-2">
                                        {["Summer"].map((semester) => (
                                            <Button
                                                key={semester}
                                                variant="outline"
                                                className={`w-full hover:bg-black hover:text-white ${available_semester === semester ? "bg-[#004aad] text-white" : ""}`}
                                                onClick={() => setAvailable_semester(semester)}
                                            >
                                                {semester}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="grid gap-2">
                                        {[2025].map((year) => (
                                            <Button
                                                key={year}
                                                variant="outline"
                                                className={`w-full hover:bg-black hover:text-white ${available_year == year ? "bg-[#004aad] text-white" : ""}`}
                                                onClick={() => setAvailable_year(year)}
                                            >
                                                {year}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            case 7:
                return (
                    <motion.div
                        key="step7"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto space-y-8"
                    >
                        <h2 className="text-3xl font-semibold text-center">Additional Information</h2>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="otherRoommates" className="text-lg">
                                        Other Roommates
                                    </Label>
                                    <Input
                                        id="otherRoommates"
                                        placeholder="Describe other roommates, if any"
                                        value={otherRoommates[0]}
                                        onChange={(e) => setOtherRoommates([e.target.value])}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="gender" className="text-lg">
                                        Preferred gender
                                    </Label>
                                    <Input id="gender" placeholder="If any" value={gender} onChange={(e) => setGender(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="additionalContact" className="text-lg">
                                        Additional contact
                                    </Label>
                                    <Input
                                        id="additionalContact"
                                        placeholder="Ex. instagram: @studystay.us, phone: 123-456-7890"
                                        value={additionalContact}
                                        onChange={(e) => setAdditionalContact(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="furnished"
                                        checked={furnished}
                                        onCheckedChange={(checked) => setFurnished(checked.valueOf() ? true : false)}
                                    />
                                    <Label htmlFor="furnished">Furnished</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="petsAllowed"
                                        checked={petsAllowed}
                                        onCheckedChange={(checked) => setPetsAllowed(checked.valueOf() ? true : false)}
                                    />
                                    <Label htmlFor="petsAllowed">Pets Allowed</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="carParkingSpace"
                                        checked={carParkingSpace}
                                        onCheckedChange={(checked) => setCarParkingSpace(checked.valueOf() ? true : false)}
                                    />
                                    <Label htmlFor="carParkingSpace">Car Parking Space</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="washerAndDryer"
                                        checked={washerAndDryer}
                                        onCheckedChange={(checked) => setWasherAndDryer(checked.valueOf() ? true : false)}
                                    />
                                    <Label htmlFor="washerAndDryer">Washer and Dryer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="handicapAccessible"
                                        checked={handicapAccessible}
                                        onCheckedChange={(checked) => setHandicapAccessible(checked.valueOf() ? true : false)}
                                    />
                                    <Label htmlFor="handicapAccessible">Handicap Accessible</Label>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            case 8:
                return (
                    <motion.div
                        key="step8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto space-y-6"
                    >
                        <h2 className="text-3xl font-semibold text-center">Upload your signed sublease agreement</h2>
                        <p className="text-center text-gray-600">
                            This should be a PDF or image that is already signed on your behalf. Append all other forms (landlord consent, move-in condition report, etc.) to the same file, if applicable.
                        </p>

                        <Input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    await handleAgreementUpload(file)
                                    setStep((prev) => prev + 1)
                                }
                            }}
                        />

                        {signedAgreementUrl && (
                            <p className="text-green-600 text-center">
                                Agreement uploaded successfully.
                                <br />
                                <Link href={signedAgreementUrl} target="_blank" rel="noopener noreferrer" className="underline">
                                    View uploaded file
                                </Link>
                            </p>
                        )}

                        <div className="flex flex-col justify-center items-center">
                            <p>Don&apos;t have that yet?</p>
                            <a href="/sublease-template.pdf" download>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded">Download Template</button>
                            </a>
                        </div>
                    </motion.div>
                )
            case 9:
                return (
                    <motion.div
                        key="step9"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-2xl mx-auto space-y-6"
                    >
                        <h2 className="text-3xl font-semibold text-center">Sign the StudyStay Seller Agreement</h2>
                        <p className="text-center text-gray-600">
                            This document outlines your agreement with StudyStay. Please read it carefully and sign below.
                        </p>

                        <div className="border rounded-md overflow-hidden shadow">
                            <iframe
                                src="/studystay-seller-agreement.pdf"
                                width="100%"
                                height="500px"
                                className="w-full"
                                title="StudyStay Seller Agreement"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="signature" className="text-lg">Full Name (Typed Signature)</Label>
                            <Input
                                id="signature"
                                placeholder="e.g., John Doe"
                                value={sellerSignature}
                                onChange={(e) => setSellerSignature(e.target.value)}
                            />
                        </div>

                        <p className="text-sm text-muted-foreground">
                            By typing your name, you agree to the terms of the agreement above. This will serve as your official signature.
                        </p>

                        <Button
                            disabled={!sellerSignature.trim()}
                            onClick={async () => {
                                await generateAndUploadSignedAgreement(sellerSignature);
                                handleFinish()
                            }}
                        >
                            Sign and Continue
                        </Button>

                    </motion.div>
                )
            default:
                return null
        }
    }

    if ((!userData?.user || !userData.user.email_confirmed_at) && !loading) {
        return (
            <div className={`min-h-screen bg-gray-50 flex flex-col ${leagueSpartan.className}`}>
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/in" className="text-[#004aad] text-2xl font-extrabold pointer-cursor">
                                studystay
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm">
                                <HelpCircle className="h-5 w-5 mr-2" />
                                <a href="mailto:ryan@studystay.us" className="pt-1">
                                    Let us help!
                                </a>
                            </Button>
                        </div>
                    </div>
                </header>
                <Card className="w-full max-w-md my-auto mx-auto">
                    <CardHeader>
                        <CardTitle>Authentication Required</CardTitle>
                        <CardDescription>You need to be signed in and confirmed to create a listing</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6">
                        <div className="rounded-full bg-muted p-6">
                            <LogIn className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <div className="text-center space-y-4">
                            <p className="text-muted-foreground">Let&apos;s get started by signing into your account</p>
                            <Button size="lg" className="w-full" onClick={() => setShowAuth(true)}>
                                Sign In
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                {showAuth && (
                    <div>
                        <AuthPopup onClose={() => setShowAuth(false)} />
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className={`min-h-screen bg-gray-50 flex flex-col ${leagueSpartan.className}`}>
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/in" className="text-[#004aad] text-2xl font-extrabold pointer-cursor">
                            studystay
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm">
                            <HelpCircle className="h-5 w-5 mr-2" />
                            <a href="mailto:amk3ef@virginia.edu" className="pt-1">
                                Questions?
                            </a>
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="w-full max-w-3xl mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
                )}
                {step > 0 && (
                    <div className="w-full max-w-3xl mb-8">
                        <ProgressBar currentStep={step + 1} totalSteps={totalSteps} />
                    </div>
                )}
                <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
            </main>
            {step > 1 && (
                <footer className="bg-white shadow-sm-top">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                        <Button variant="ghost" onClick={() => setStep((prev) => prev - 1)}>
                            Back
                        </Button>
                        {step === totalSteps - 1 ? (
                            <Button disabled className="hidden" onClick={handleFinish}>Finish</Button>
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
                                        <LoaderCircle className="w-16 h-16" />
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{submitMessage.message}</p>
                                {submitMessage.status == "error" && (
                                    <p className="text-red-600 mb-4">
                                        <Button onClick={() => setPendingSubmit(false)}>
                                            Send an email to <a href="mailto:ryan@studystay.us" className="bold ml-1">ryan@studystay.us</a>
                                        </Button>
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
