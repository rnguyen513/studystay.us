import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Facebook, Phone } from 'lucide-react'

export default function AuthPopup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Log in or sign up</h2>
            <Button variant="ghost" size="icon" className="text-gray-500" onClick={onClose}>
              <X className="h-6 w-6"/>
            </Button>
          </div>
          
          <h1 className="text-2xl font-bold mb-6">Welcome</h1>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 mb-4">
            We'll email you to confirm your address. Your email is used to log in to your account.
          </p>
          
          <Button className="w-full bg-primary text-white">Continue</Button>
          
          <div className="mt-4 text-center text-sm text-gray-500">or</div>
          
          <div className="mt-4 space-y-3">
            <Button variant="outline" className="w-full justify-start">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M3.064 7.51A10 10 0 0 1 12 2c2.695 0 4.959.991 6.69 2.605l-2.867 2.868C14.786 6.482 13.468 5.977 12 5.977c-2.605 0-4.81 1.76-5.595 4.123c-.2.6-.314 1.24-.314 1.9s.114 1.3.314 1.9c.786 2.364 2.99 4.123 5.595 4.123c1.345 0 2.49-.355 3.386-.955a4.6 4.6 0 0 0 1.996-3.018H12v-3.868h9.418c.118.654.182 1.336.182 2.045c0 3.046-1.09 5.61-2.982 7.35C16.964 21.105 14.7 22 12 22A9.996 9.996 0 0 1 2 12c0-1.614.386-3.14 1.064-4.49"/></svg>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full justify-start">
            <svg className="mr-2"xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="black" d="M16.023 4.503c1.83-.126 3.244.942 4.185 2.174c.948 1.243 1.601 2.866 1.96 4.462c.357 1.596.453 3.311.156 4.773c-.285 1.404-1.046 3.01-2.767 3.525c-1.62.484-3.04-.22-4.052-1.072c-1.016-.855-1.876-2.053-2.552-3.176a25 25 0 0 1-.89-1.616a25 25 0 0 1-.889 1.615c-.676 1.124-1.536 2.322-2.552 3.177c-1.013.852-2.432 1.556-4.052 1.072c-1.721-.515-2.482-2.12-2.767-3.525c-.296-1.462-.2-3.177.157-4.773c.358-1.596 1.011-3.22 1.96-4.462c.94-1.232 2.354-2.3 4.184-2.174c1.716.12 2.963 1.283 3.74 2.269l.22.289l.219-.29c.777-.985 2.024-2.149 3.74-2.268M7.896 7.496c-.42-.029-.97.186-1.592 1.002c-.614.805-1.124 1.993-1.417 3.298s-.335 2.579-.144 3.52c.165.81.43 1.101.592 1.203l.068.034l.027.01c.232.07.614.05 1.26-.494c.645-.542 1.303-1.413 1.914-2.427c.272-.453.525-.917.752-1.363l.26-.525l.233-.497l.206-.458l.175-.407l.143-.346a9 9 0 0 0-.663-1.119c-.644-.916-1.29-1.394-1.814-1.43Zm8.335 0c-.524.037-1.17.515-1.814 1.431a9 9 0 0 0-.663 1.119l.227.543l.19.434l.107.234l.234.497l.26.525c.227.446.479.91.751 1.363c.611 1.014 1.27 1.885 1.913 2.427c.601.506.973.558 1.21.507l.052-.013c.13-.04.483-.249.686-1.248c.19-.94.149-2.214-.144-3.52c-.292-1.304-.802-2.492-1.417-3.297c-.623-.816-1.172-1.03-1.592-1.002"/></g></svg>
              Continue with Meta
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg className="mr-2"xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"/></svg>
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full justify-start">
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="black" d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317"/></svg>
              Continue with phone number
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}