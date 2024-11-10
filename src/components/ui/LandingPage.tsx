import { useState } from 'react'
import { CheckIcon, StarIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getMyProfile } from '../utils/http'
import { IProfileData } from '../utils/useProfileData'

export default function Component() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly')
  const navigate = useNavigate()

  const { } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profile = await getMyProfile(navigate);
      return profile as IProfileData;
    },
  });

  const features = [
    {"tag": "Cloud-Powered Storage", outline:"Store unlimited bookmarks in the cloud without impacting browser performance"},
    {"tag": "Universal Integration",outline:"Import from Chrome, Twitter, Reddit, and LinkedIn with one click"},
    {"tag": "AI Chat Assistant", outline: "Chat with your bookmarks using natural language to find exactly what you need"},
    // {"tag": "Chrome Extension", outline:""}
  ]


  const reviews = [
    { name: "John Doe", rating: 5, text: "Dumpstore has revolutionized how I handle waste disposal!" },
    { name: "Jane Smith", rating: 4, text: "Great service, but could use more dumpsters in rural areas." },
    { name: "Mike Johnson", rating: 5, text: "Saves me time and money. Highly recommended!" }
  ]

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <div className="absolute inset-0 bg-opacity-50 bg-gray-100" style={{backgroundImage: 'radial-gradient(#cbd5e0 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
      <div className="relative flex-grow flex flex-col">
        {/* Header */}
        <header className="py-4 px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-between items-center max-w-6xl mx-auto w-full">
            <div className="text-2xl font-bold">Dumpstore</div>
            <div className="hidden sm:flex space-x-4">
              <a href="#features" className="hover:text-blue-600">Features</a>
              <a href="#pricing" className="hover:text-blue-600">Pricing</a>
              <a href="#reviews" className="hover:text-blue-600">Reviews</a>
            </div>
            <div>
            <a onClick={() => navigate('/login')} className="hover:text-blue-600 cursor-pointer">Login ?</a>
            <button onClick={() => navigate('/singup')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ml-4">Sign Up</button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col">
          {/* Hero Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 text-center flex-grow flex flex-col justify-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Your Bookmarks Just Got Smarter</h1>
              <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto">Import from Chrome, Twitter, Reddit, and LinkedIn with one click</p>
              <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">Get Started</button>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <CheckIcon className="w-6 h-6 text-green-500 mr-2" />
                      <h3 className="font-semibold text-lg">{feature.tag}</h3>
                    </div>
                    <p className="text-gray-600">{feature.outline}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
              <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-8">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                  <h3 className="text-2xl font-bold mb-4">Monthly Plan</h3>
                  <p className="text-gray-600 mb-4">Perfect for short-term needs</p>
                  <p className="text-4xl font-bold mb-6">$5.99<span className="text-lg font-normal">/month</span></p>
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-semibold ${selectedPlan === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSelectedPlan('monthly')}
                  >
                    {selectedPlan === 'monthly' ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
                  <h3 className="text-2xl font-bold mb-4">Yearly Plan</h3>
                  <p className="text-gray-600 mb-4">Best value for long-term usage</p>
                  <p className="text-4xl font-bold mb-6">$35.99<span className="text-lg font-normal">/year</span></p>
                  <button 
                    className={`w-full py-2 px-4 rounded-lg font-semibold ${selectedPlan === 'yearly' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                    onClick={() => setSelectedPlan('yearly')}
                  >
                    {selectedPlan === 'yearly' ? 'Selected' : 'Select Plan'}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Reviews Section */}
          <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="font-semibold mr-2">{review.name}</div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">&copy; 2023 Dumpstore. All rights reserved.</div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}