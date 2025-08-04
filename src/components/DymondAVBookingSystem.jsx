import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, DollarSign, FileText, Send, CheckCircle, PenTool, Plus, Minus, Eye, ShoppingCart, Monitor, Music, Lightbulb } from 'lucide-react';

const DymondAVBookingSystem = () => {
  const [formData, setFormData] = useState({
    // Client Information
    clientName: '',
    email: '',
    phone: '',
    alternateContact: '',
    
    // Event Details
    eventType: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    venueAddress: '',
    venueName: '',
    estimatedGuests: '',
    
    // Equipment Selection (from configurator)
    uplighting: 0,
    movingHeads: 0,
    pinSpots: 0,
    tvScreens: 0,
    extraSpeakers: 0,
    subwoofers: 0,
    photoBooths: 0,
    danceFloorLighting: 0,
    fogMachine: 0,
    customGobo: 0,
    ceremonyAudio: 0,
    videoProjection: 0,
    intelligentTruss: 0,
    colorWashLighting: 0,
    
    // Event Specifics
    musicPreferences: '',
    specialRequests: '',
    setupRequirements: '',
    powerRequirements: '',
    dressCode: '',
    eventTheme: '',
    guestDemographics: '',
    keyMoments: '',
    doNotPlayList: '',
    timeline: '',
    
    // Business Details
    paymentMethod: '',
    hearAboutUs: '',
    travelDistance: '',
    specialDiscount: '',
    
    // Insurance Requirements
    venueInsuranceRequired: false,
    insuranceAmount: '1000000',
    additionalInsured: '',
    
    // Contract Agreement
    agreesToTerms: false,
    signatureName: '',
    signatureDate: '',
    signatureData: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showInsuranceEmail, setShowInsuranceEmail] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showFullContract, setShowFullContract] = useState(false);
  const [availabilityStatus, setAvailabilityStatus] = useState('checking');
  
  const canvasRef = useRef(null);
  const [signatureExists, setSignatureExists] = useState(false);

  // Mock booked dates
  const bookedDates = [
    '2025-08-15', '2025-08-22', '2025-09-05', '2025-09-12', '2025-09-20',
    '2025-10-03', '2025-10-10', '2025-10-18', '2025-10-25', '2025-11-01'
  ];

  const basePackage = {
    name: "Base DJ Package (4 hours)",
    price: 1950,
    includes: [
      "All Black DJ Booth Setup",
      "Numark NS7III Controller", 
      "Two QSC K12 Speakers on Stands",
      "Black Scrims for Clean Look",
      "QSC KW 181 Subwoofer (front of booth)",
      "Professional DJ Service"
    ]
  };

  const packages = {
    premium: { name: "Premium Wedding Package", price: 3500, includes: ["Base DJ Package", "Uplighting (8)", "Moving Heads (2)", "Photo Booth", "Dance Floor Lighting"] },
    corporate: { name: "Corporate Event Package", price: 2800, includes: ["Base DJ Package", "TV Screens (2)", "Video Projection", "Ceremony Audio"] },
    deluxe: { name: "Deluxe Celebration Package", price: 4200, includes: ["Base DJ Package", "Uplighting (8)", "Moving Heads (4)", "TV Screens (2)", "Photo Booth", "Custom Gobo"] }
  };

  const addOns = {
    uplighting: { name: "LED Uplighting (per light)", price: 50, max: 16, category: "lighting" },
    movingHeads: { name: "Intelligent Moving Head Lights (pair)", price: 350, max: 4, category: "lighting" },
    pinSpots: { name: "Pin Spotlights (set of 4)", price: 200, max: 2, category: "lighting" },
    danceFloorLighting: { name: "Premium Dance Floor Package", price: 600, max: 1, category: "lighting" },
    fogMachine: { name: "Fog/Haze Machine", price: 125, max: 2, category: "lighting" },
    customGobo: { name: "Custom Gobo Projection", price: 250, max: 2, category: "lighting" },
    colorWashLighting: { name: "Color Wash Wall Lighting", price: 450, max: 1, category: "lighting" },
    intelligentTruss: { name: "Intelligent Lighting & Truss", price: 800, max: 1, category: "lighting" },
    
    tvScreens: { name: "TV Screens on Stands (65\")", price: 300, max: 4, category: "audiovisual" },
    extraSpeakers: { name: "Additional Speaker System", price: 200, max: 3, category: "audiovisual" },
    subwoofers: { name: "Extra Subwoofer", price: 150, max: 2, category: "audiovisual" },
    photoBooths: { name: "Photo Booth (4 hours)", price: 1200, max: 1, category: "audiovisual" },
    ceremonyAudio: { name: "Ceremony Sound Setup", price: 350, max: 1, category: "audiovisual" },
    videoProjection: { name: "Video Projection Setup", price: 500, max: 2, category: "audiovisual" }
  };

  const travelFees = {
    local: { name: 'Local (0-15 miles)', price: 0 },
    regional: { name: 'Regional (16-30 miles)', price: 75 },
    extended: { name: 'Extended (31-50 miles)', price: 150 },
    distant: { name: 'Distant (50+ miles)', price: 250 }
  };

  const discounts = {
    offSeason: { name: 'Off-Season Discount (Jan-Mar)', percentage: 10 },
    weekday: { name: 'Weekday Discount (Mon-Thu)', percentage: 15 },
    military: { name: 'Military/First Responder', percentage: 10 },
    referral: { name: 'Referral Discount', percentage: 5 },
    multiService: { name: 'Multi-Service Bundle', percentage: 8 }
  };

  // Check availability when date changes
  const checkAvailability = (date) => {
    if (!date) {
      setAvailabilityStatus('checking');
      return;
    }
    
    const isBooked = bookedDates.includes(date);
    const selectedDate = new Date(date);
    const today = new Date();
    
    if (selectedDate < today) {
      setAvailabilityStatus('past');
    } else if (isBooked) {
      setAvailabilityStatus('booked');
    } else {
      setAvailabilityStatus('available');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (name === 'eventDate') {
      checkAvailability(value);
    }
  };

  const updateQuantity = (item, change) => {
    setFormData(prev => {
      const newQty = Math.max(0, Math.min(addOns[item].max, prev[item] + change));
      return { ...prev, [item]: newQty };
    });
  };

  const selectPackage = (packageKey) => {
    const pkg = packages[packageKey];
    const newFormData = { ...formData };
    
    // Reset equipment
    Object.keys(addOns).forEach(key => {
      newFormData[key] = 0;
    });
    
    // Set package items
    if (packageKey === 'premium') {
      newFormData.uplighting = 8;
      newFormData.movingHeads = 1;
      newFormData.photoBooths = 1;
      newFormData.danceFloorLighting = 1;
    } else if (packageKey === 'corporate') {
      newFormData.tvScreens = 2;
      newFormData.videoProjection = 1;
      newFormData.ceremonyAudio = 1;
    } else if (packageKey === 'deluxe') {
      newFormData.uplighting = 8;
      newFormData.movingHeads = 2;
      newFormData.tvScreens = 2;
      newFormData.photoBooths = 1;
      newFormData.customGobo = 1;
    }
    
    setFormData(newFormData);
  };

  const calculateTotal = () => {
    let subtotal = basePackage.price;
    
    // Add equipment costs
    Object.entries(formData).forEach(([key, qty]) => {
      if (addOns[key] && qty > 0) {
        if (key === 'uplighting') {
          const unitPrice = qty >= 8 ? addOns[key].price * 0.8 : addOns[key].price;
          subtotal += unitPrice * qty;
        } else {
          subtotal += addOns[key].price * qty;
        }
      }
    });

    // Travel fees
    if (formData.travelDistance && travelFees[formData.travelDistance]) {
      subtotal += travelFees[formData.travelDistance].price;
    }

    // Apply discounts
    let discountAmount = 0;
    if (formData.specialDiscount && discounts[formData.specialDiscount]) {
      discountAmount = subtotal * (discounts[formData.specialDiscount].percentage / 100);
    }

    return Math.max(0, subtotal - discountAmount);
  };

  const getUplightingPrice = () => {
    const qty = formData.uplighting;
    if (qty >= 8) {
      return addOns.uplighting.price * 0.8;
    }
    return addOns.uplighting.price;
  };

  const getDiscountInfo = () => {
    if (formData.specialDiscount && discounts[formData.specialDiscount]) {
      const discount = discounts[formData.specialDiscount];
      const subtotalBeforeDiscount = calculateTotal() / (1 - discount.percentage / 100);
      const discountAmount = subtotalBeforeDiscount * (discount.percentage / 100);
      return { subtotal: subtotalBeforeDiscount, discountAmount, discount };
    }
    return null;
  };

  // Signature functions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#ffffff';
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    setSignatureExists(true);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      const signatureData = canvas.toDataURL();
      setFormData(prev => ({
        ...prev,
        signatureData
      }));
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureExists(false);
    setFormData(prev => ({
      ...prev,
      signatureData: ''
    }));
  };

  const generateInsuranceEmail = () => {
    const subject = `Certificate of Insurance Request - ${formData.clientName} Event`;
    const body = `Hello,

Please provide a Certificate of Insurance for the following event:

EVENT DETAILS:
- Client Name: ${formData.clientName}
- Event Date: ${formData.eventDate}
- Event Hours: ${formData.startTime} to ${formData.endTime}
- Event Type: ${formData.eventType}

VENUE INFORMATION:
- Venue Name: ${formData.venueName}
- Venue Address: ${formData.venueAddress}

INSURANCE REQUIREMENTS:
- Coverage Amount: $${formData.insuranceAmount}
- Additional Insured: ${formData.additionalInsured || formData.venueName}

Please ensure the certificate includes the venue as additional insured for the specified event date and hours.

Thank you!`;

    return { subject, body };
  };

  const generateContract = () => {
    const total = calculateTotal();
    const deposit = total * 0.5;
    const balance = total - deposit;
    
    return `DYMOND AUDIO/VISUAL - EVENT SERVICES CONTRACT

Client Information:
Name: ${formData.clientName}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.alternateContact ? `Alternate Contact: ${formData.alternateContact}` : ''}

Event Details:
Event Type: ${formData.eventType}
Date: ${formData.eventDate}
Time: ${formData.startTime} to ${formData.endTime}
Venue: ${formData.venueName}
Address: ${formData.venueAddress}
Estimated Guests: ${formData.estimatedGuests}

Services & Equipment:
${basePackage.name} - $${basePackage.price}
${Object.entries(formData).map(([key, qty]) => {
  if (addOns[key] && qty > 0) {
    const price = key === 'uplighting' ? getUplightingPrice() * qty : addOns[key].price * qty;
    return `• ${addOns[key].name} x${qty} - $${price}`;
  }
  return '';
}).filter(Boolean).join('\n')}

${formData.travelDistance && travelFees[formData.travelDistance]?.price > 0 ? `• ${travelFees[formData.travelDistance].name} - $${travelFees[formData.travelDistance].price}` : ''}
${getDiscountInfo() ? `Discount Applied: ${getDiscountInfo().discount.name} (-$${getDiscountInfo().discountAmount.toFixed(0)})` : ''}

TOTAL CONTRACT VALUE: $${total.toLocaleString()}
Deposit Due (50%): $${deposit.toLocaleString()}
Balance Due Day of Event: $${balance.toLocaleString()}

Event Specifications:
DJ Dress Code: ${formData.dressCode}
Event Theme: ${formData.eventTheme}
Music Preferences: ${formData.musicPreferences}
Do Not Play: ${formData.doNotPlayList}
Special Requests: ${formData.specialRequests}
Key Moments: ${formData.keyMoments}
Timeline: ${formData.timeline}

Technical Requirements:
Setup Requirements: ${formData.setupRequirements}
Power Requirements: ${formData.powerRequirements}

TERMS AND CONDITIONS:
1. DEPOSIT: A deposit of $${deposit.toLocaleString()} (50% of total) is required to secure booking.
2. PAYMENT: Final payment of $${balance.toLocaleString()} is due on the day of the event.
3. CANCELLATION: 30+ days notice: Full refund | 14-29 days: 50% refund | <14 days: No refund
4. SETUP/BREAKDOWN: DJ requires 2 hours for setup and 1 hour for breakdown.
5. EQUIPMENT: Professional sound system suitable for ${formData.estimatedGuests || 'estimated guest count'}.
${formData.venueInsuranceRequired ? `6. INSURANCE: Certificate of insurance will be provided ($${formData.insuranceAmount} coverage).` : ''}

CLIENT SIGNATURE:
Signed: ${formData.signatureName}
Date: ${formData.signatureDate}

Contract effective upon receipt of signed agreement and deposit payment.`;
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    setShowInsuranceEmail(true);
    setShowContract(true);
  };

  const steps = [
    "Client & Event Details",
    "Equipment Configuration", 
    "Event Requirements",
    "Business & Insurance",
    "Review & Contract"
  ];

  // Visual setup renderer
  const SetupVisualizer = () => {
    return (
      <div className="relative w-full h-80 bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4a5568" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Base DJ Booth - Center */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            {/* DJ Booth */}
            <div className="w-16 h-10 bg-gray-800 border-2 border-blue-400 rounded shadow-lg shadow-blue-400/30">
              <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded flex items-center justify-center">
                <Music className="text-blue-400" size={12} />
              </div>
            </div>
            
            {/* Main Speakers (L/R) */}
            <div className="absolute -left-12 -top-6 w-4 h-12 bg-gray-700 border border-blue-300 rounded shadow-md">
              <div className="w-full h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded"></div>
            </div>
            <div className="absolute -right-8 -top-6 w-4 h-12 bg-gray-700 border border-blue-300 rounded shadow-md">
              <div className="w-full h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded"></div>
            </div>
            
            {/* Subwoofers */}
            {formData.subwoofers === 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-12 w-10 h-6 bg-gray-800 border border-blue-300 rounded shadow-md">
                <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded"></div>
              </div>
            )}
            
            {formData.subwoofers > 0 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-12 flex space-x-1">
                <div className="w-10 h-6 bg-gray-800 border border-blue-300 rounded shadow-md">
                  <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded"></div>
                </div>
                {Array.from({ length: formData.subwoofers }, (_, i) => (
                  <div key={i} className="w-10 h-6 bg-gray-800 border border-blue-300 rounded shadow-md">
                    <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Uplighting */}
        {formData.uplighting > 0 && (
          <>
            {formData.uplighting >= 1 && <div className="absolute left-6 top-6 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>}
            {formData.uplighting >= 2 && <div className="absolute left-6 top-16 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>}
            {formData.uplighting >= 3 && <div className="absolute left-6 bottom-16 w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>}
            {formData.uplighting >= 4 && <div className="absolute left-6 bottom-6 w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>}
            {formData.uplighting >= 5 && <div className="absolute right-6 top-6 w-2 h-2 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"></div>}
            {formData.uplighting >= 6 && <div className="absolute right-6 top-16 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"></div>}
            {formData.uplighting >= 7 && <div className="absolute right-6 bottom-16 w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>}
            {formData.uplighting >= 8 && <div className="absolute right-6 bottom-6 w-2 h-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>}
            
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/5 to-green-500/10"></div>
          </>
        )}

        {/* Moving Head Lights */}
        {formData.movingHeads > 0 && (
          <>
            <div className="absolute left-1/4 top-6 w-1 h-16 bg-gray-600 rounded shadow-lg">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded shadow-lg shadow-yellow-400/50">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-yellow-300 to-yellow-500 rounded"></div>
              </div>
            </div>
            <div className="absolute right-1/4 top-6 w-1 h-16 bg-gray-600 rounded shadow-lg">
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-cyan-400 rounded shadow-lg shadow-cyan-400/50">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-cyan-300 to-cyan-500 rounded"></div>
              </div>
            </div>
            
            <div className="absolute left-1/4 top-5 w-1 h-24 bg-gradient-to-b from-yellow-400/60 to-transparent transform rotate-12 animate-pulse"></div>
            <div className="absolute right-1/4 top-5 w-1 h-24 bg-gradient-to-b from-cyan-400/60 to-transparent transform -rotate-12 animate-pulse"></div>
          </>
        )}

        {/* TV Screens */}
        {formData.tvScreens > 0 && (
          <>
            <div className="absolute left-12 top-1/3 w-6 h-4 bg-gray-900 border border-gray-600 rounded shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded flex items-center justify-center">
                <Monitor className="text-white" size={8} />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-600"></div>
            </div>
            
            {formData.tvScreens > 1 && (
              <div className="absolute right-12 top-1/3 w-6 h-4 bg-gray-900 border border-gray-600 rounded shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded flex items-center justify-center">
                  <Monitor className="text-white" size={8} />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-600"></div>
              </div>
            )}
            
            {formData.tvScreens > 2 && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-1/4 w-6 h-4 bg-gray-900 border border-gray-600 rounded shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 rounded flex items-center justify-center">
                  <Monitor className="text-white" size={8} />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-600"></div>
              </div>
            )}
          </>
        )}

        {/* Photo Booth */}
        {formData.photoBooths > 0 && (
          <div className="absolute right-12 bottom-12 w-8 h-6 bg-gray-800 border-2 border-pink-400 rounded shadow-lg shadow-pink-400/30">
            <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 rounded flex items-center justify-center">
              <Eye className="text-pink-400" size={10} />
            </div>
          </div>
        )}

        {/* Custom Gobo */}
        {formData.customGobo > 0 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="text-lg font-bold text-blue-400 opacity-60 tracking-wider animate-pulse" style={{textShadow: '0 0 8px currentColor, 0 0 16px currentColor'}}>
              DAV
            </div>
          </div>
        )}

        {/* Dance Floor Lighting */}
        {formData.danceFloorLighting > 0 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-3 bg-gradient-to-r from-red-500/30 via-purple-500/30 to-blue-500/30 rounded-full shadow-lg animate-pulse"></div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="mb-4">
            <div className="text-5xl font-bold tracking-wider text-white mb-2">
              DYMOND
            </div>
            <div className="text-lg tracking-[0.3em] text-gray-300 font-light">
              AUDIO/VISUAL
            </div>
          </div>
          <p className="text-gray-400 text-lg">Professional Event Booking & Configuration System</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <span key={index} className={`text-sm ${index + 1 <= currentStep ? 'text-blue-400 font-medium' : 'text-gray-500'}`}>
                {step}
              </span>
            ))}
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Client & Event Details */}
        {currentStep === 1 && (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-400">
                  <User className="mr-2" size={20} />
                  Client Information
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="clientName"
                    placeholder="Full Name *"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Primary Phone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    name="alternateContact"
                    placeholder="Alternate Contact"
                    value={formData.alternateContact}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-400">
                  <Calendar className="mr-2" size={20} />
                  Event Details
                </h3>
                <div className="space-y-4">
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Event Type *</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="graduation">Graduation</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="holiday">Holiday Party</option>
                    <option value="other">Other</option>
                  </select>
                  
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  
                  {formData.eventDate && (
                    <div className={`p-2 rounded text-sm ${
                      availabilityStatus === 'available' ? 'bg-green-900/30 text-green-400 border border-green-500/30' :
                      availabilityStatus === 'booked' ? 'bg-red-900/30 text-red-400 border border-red-500/30' :
                      availabilityStatus === 'past' ? 'bg-gray-800 text-gray-400 border border-gray-600' :
                      'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {availabilityStatus === 'available' && '✅ Date Available!'}
                      {availabilityStatus === 'booked' && '❌ Sorry, this date is already booked'}
                      {availabilityStatus === 'past' && '⚠️ Please select a future date'}
                      {availabilityStatus === 'checking' && '🔍 Checking availability...'}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="time"
                      name="startTime"
                      placeholder="Start Time"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="time"
                      name="endTime"
                      placeholder="End Time"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <input
                    type="text"
                    name="venueName"
                    placeholder="Venue Name *"
                    value={formData.venueName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  
                  <textarea
                    name="venueAddress"
                    placeholder="Full Venue Address *"
                    value={formData.venueAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  
                  <input
                    type="number"
                    name="estimatedGuests"
                    placeholder="Estimated Number of Guests"
                    value={formData.estimatedGuests}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Equipment Configuration */}
        {currentStep === 2 && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Visual Setup */}
            <div className="space-y-6">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-400">
                  <Eye className="mr-2" />
                  Your Event Setup
                </h2>
                <SetupVisualizer />
                
                <div className="mt-4 text-sm text-gray-400">
                  <p>Real-time visualization of your selected equipment</p>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 rounded-lg border border-blue-500/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Package Total</h3>
                  <div className="text-3xl font-bold text-blue-400">
                    ${calculateTotal().toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Base Package (4 hours)</span>
                    <span>${basePackage.price.toLocaleString()}</span>
                  </div>
                  {Object.entries(formData).map(([key, qty]) => {
                    if (addOns[key] && qty > 0) {
                      const price = key === 'uplighting' ? getUplightingPrice() * qty : addOns[key].price * qty;
                      return (
                        <div key={key} className="flex justify-between text-blue-300">
                          <span>
                            {addOns[key].name} x{qty}
                            {key === 'uplighting' && qty >= 8 && <span className="text-green-400"> (20% OFF)</span>}
                          </span>
                          <span>+${price.toLocaleString()}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>

            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Packages Section */}
              <div className="bg-gray-900 p-4 rounded-lg border border-blue-500">
                <h4 className="font-semibold mb-3 flex items-center text-blue-400">
                  <ShoppingCart className="mr-2" size={18} />
                  Complete Packages
                </h4>
                <div className="space-y-3">
                  {Object.entries(packages).map(([key, pkg]) => (
                    <div key={key} className="p-3 bg-gray-800 rounded border border-gray-600 hover:border-blue-500 cursor-pointer transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{pkg.name}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {pkg.includes.join(", ")}
                          </div>
                          <div className="text-blue-400 font-semibold mt-2">${pkg.price.toLocaleString()}</div>
                        </div>
                        <button 
                          onClick={() => selectPackage(key)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Build */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Custom Build Your Experience</h3>
                
                {/* Base Package */}
                <div className="bg-gray-900 p-6 rounded-lg border border-blue-500">
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">Base Package - Included</h3>
                  <div className="text-sm space-y-1 text-gray-300">
                    {basePackage.includes.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-lg font-semibold">${basePackage.price.toLocaleString()}</div>
                </div>
                
                {/* Lighting Section */}
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-3 flex items-center text-purple-400">
                    <Lightbulb className="mr-2" size={18} />
                    Intelligent Lighting & Effects
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(addOns).filter(([key, item]) => item.category === 'lighting').map(([key, item]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600">
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {item.name}
                            {key === 'uplighting' && formData.uplighting >= 8 && (
                              <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded">20% OFF</span>
                            )}
                          </div>
                          <div className="text-blue-400 font-semibold">
                            ${key === 'uplighting' ? getUplightingPrice() : item.price}
                            {key === 'uplighting' && formData.uplighting >= 8 && (
                              <span className="text-xs text-gray-400 line-through ml-2">${item.price}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(key, -1)}
                            disabled={formData[key] === 0}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{formData[key]}</span>
                          <button 
                            onClick={() => updateQuantity(key, 1)}
                            disabled={formData[key] >= item.max}
                            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audio/Visual Section */}
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold mb-3 flex items-center text-green-400">
                    <Monitor className="mr-2" size={18} />
                    Audio & Visual Systems
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(addOns).filter(([key, item]) => item.category === 'audiovisual').map(([key, item]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-600">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.name}</div>
                          <div className="text-blue-400 font-semibold">${item.price}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateQuantity(key, -1)}
                            disabled={formData[key] === 0}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded flex items-center justify-center transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-semibold">{formData[key]}</span>
                          <button 
                            onClick={() => updateQuantity(key, 1)}
                            disabled={formData[key] >= item.max}
                            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded flex items-center justify-center transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Event Requirements */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Music & Entertainment</h4>
                <textarea
                  name="musicPreferences"
                  placeholder="Music preferences, genres, must-play songs..."
                  value={formData.musicPreferences}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                />
                <textarea
                  name="doNotPlayList"
                  placeholder="Do NOT play list (songs/artists to avoid)..."
                  value={formData.doNotPlayList}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Event Details</h4>
                <select
                  name="dressCode"
                  value={formData.dressCode}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                >
                  <option value="">DJ Dress Code</option>
                  <option value="casual">Casual</option>
                  <option value="business-casual">Business Casual</option>
                  <option value="semi-formal">Semi-Formal</option>
                  <option value="formal">Formal/Suit</option>
                  <option value="black-tie">Black Tie</option>
                  <option value="themed">Themed (specify below)</option>
                </select>
                <input
                  type="text"
                  name="eventTheme"
                  placeholder="Event theme/colors (if applicable)"
                  value={formData.eventTheme}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Guest Information</h4>
                <textarea
                  name="guestDemographics"
                  placeholder="Guest age range, crowd type, cultural considerations..."
                  value={formData.guestDemographics}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Key Moments & Announcements</h4>
                <textarea
                  name="keyMoments"
                  placeholder="First dance, cake cutting, special announcements, timeline..."
                  value={formData.keyMoments}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Special Requests</h4>
                <textarea
                  name="specialRequests"
                  placeholder="Any special requests, dedications, surprises..."
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Event Timeline</h4>
                <textarea
                  name="timeline"
                  placeholder="Rough schedule: cocktails 5-6pm, dinner 6-8pm, dancing 8pm-midnight..."
                  value={formData.timeline}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Setup Requirements</h4>
                <textarea
                  name="setupRequirements"
                  placeholder="Load-in details, setup time needed, access restrictions..."
                  value={formData.setupRequirements}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-400">Power & Technical</h4>
                <textarea
                  name="powerRequirements"
                  placeholder="Available power outlets, technical restrictions, sound limitations..."
                  value={formData.powerRequirements}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Business & Insurance */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-400">
                  <DollarSign className="mr-2" size={20} />
                  Payment & Travel
                </h3>
                <div className="space-y-4">
                  <select
                    name="travelDistance"
                    value={formData.travelDistance}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Travel Distance from Base</option>
                    {Object.entries(travelFees).map(([key, travel]) => (
                      <option key={key} value={key}>
                        {travel.name} {travel.price > 0 ? `- $${travel.price}` : '- No charge'}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    name="specialDiscount"
                    value={formData.specialDiscount}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any applicable discounts?</option>
                    {Object.entries(discounts).map(([key, discount]) => (
                      <option key={key} value={key}>
                        {discount.name} ({discount.percentage}% off)
                      </option>
                    ))}
                  </select>
                  
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Preferred Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="check">Check</option>
                    <option value="credit">Credit Card</option>
                    <option value="venmo">Venmo</option>
                    <option value="zelle">Zelle</option>
                  </select>
                  
                  <input
                    type="text"
                    name="hearAboutUs"
                    placeholder="How did you hear about us?"
                    value={formData.hearAboutUs}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-400">
                  <FileText className="mr-2" size={20} />
                  Insurance Requirements
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="venueInsuranceRequired"
                      checked={formData.venueInsuranceRequired}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span>Venue requires certificate of insurance</span>
                  </label>
                  
                  {formData.venueInsuranceRequired && (
                    <>
                      <select
                        name="insuranceAmount"
                        value={formData.insuranceAmount}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1000000">$1,000,000</option>
                        <option value="2000000">$2,000,000</option>
                        <option value="5000000">$5,000,000</option>
                      </select>
                      
                      <input
                        type="text"
                        name="additionalInsured"
                        placeholder="Additional Insured Party (venue management, etc.)"
                        value={formData.additionalInsured}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review & Contract */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p><strong>Client:</strong> {formData.clientName}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Event:</strong> {formData.eventType}</p>
                  <p><strong>Date:</strong> {formData.eventDate}</p>
                  <p><strong>Time:</strong> {formData.startTime} - {formData.endTime}</p>
                </div>
                <div>
                  <p><strong>Venue:</strong> {formData.venueName}</p>
                  <p><strong>Address:</strong> {formData.venueAddress}</p>
                  <p><strong>Guests:</strong> {formData.estimatedGuests}</p>
                  <p><strong>Total Quote:</strong> <span className="text-xl font-bold text-green-400">${calculateTotal().toLocaleString()}</span></p>
                  <p><strong>Insurance Required:</strong> {formData.venueInsuranceRequired ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              {calculateTotal() > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="font-semibold mb-2">Services Selected:</h4>
                  <div className="text-sm space-y-1">
                    <p>• {basePackage.name} - ${basePackage.price}</p>
                    {Object.entries(formData).map(([key, qty]) => {
                      if (addOns[key] && qty > 0) {
                        const price = key === 'uplighting' ? getUplightingPrice() * qty : addOns[key].price * qty;
                        return (
                          <p key={key}>• {addOns[key].name} x{qty} - ${price}</p>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="border border-gray-600 rounded-lg p-6 bg-gray-900">
              <h4 className="font-semibold mb-4">Terms and Conditions</h4>
              <div className="text-sm text-gray-400 mb-4 max-h-40 overflow-y-auto">
                <p>By signing this agreement, you acknowledge and agree to the following terms:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>A 50% deposit is required to secure your booking</li>
                  <li>Final payment is due on the day of the event</li>
                  <li>Cancellations must be made 30 days in advance for full refund</li>
                  <li>We are not responsible for venue-related issues or restrictions</li>
                  <li>Setup time and breakdown are included in the quoted price</li>
                  <li>Any additional time beyond the agreed schedule will incur overtime charges</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreesToTerms"
                    checked={formData.agreesToTerms}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 mt-1"
                    required
                  />
                  <span className="text-sm">I agree to the terms and conditions stated above</span>
                </label>
                
                <input
                  type="text"
                  name="signatureName"
                  placeholder="Full Legal Name"
                  value={formData.signatureName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center text-blue-400">
                    <PenTool className="mr-2" size={16} />
                    Electronic Signature
                  </label>
                  <div className="border-2 border-gray-600 rounded-lg p-4 bg-gray-800">
                    <canvas
                      ref={canvasRef}
                      width={400}
                      height={150}
                      className="border border-gray-500 cursor-crosshair w-full touch-none bg-gray-900"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">Sign above with your mouse or finger</span>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Signature Preview */}
                {signatureExists && (
                  <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                    <p className="text-sm text-blue-400 mb-2">Signature Preview:</p>
                    <div className="bg-gray-800 p-3 rounded border border-gray-600">
                      <p className="text-sm">Signed by: <strong>{formData.signatureName || '[Name Required]'}</strong></p>
                      <p className="text-sm">Date: <strong>{formData.signatureDate || '[Date Required]'}</strong></p>
                      <div className="mt-2 border-t border-gray-600 pt-2">
                        <img 
                          src={formData.signatureData} 
                          alt="Signature" 
                          className="max-h-16 border border-gray-500"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <input
                  type="date"
                  name="signatureDate"
                  value={formData.signatureDate}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < 5 ? (
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && availabilityStatus === 'booked'}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentStep === 1 && availabilityStatus === 'booked' ? 'Date Unavailable' : 'Next'}
            </button>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFullContract(true)}
                className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center"
              >
                <FileText className="mr-2" size={20} />
                Preview Contract
              </button>
              <button
                onClick={handleSubmit}
                disabled={!formData.agreesToTerms || !formData.signatureName || !formData.signatureDate || !signatureExists}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <CheckCircle className="mr-2" size={20} />
                Complete Booking
              </button>
            </div>
          )}
        </div>

        {/* Full Contract Modal */}
        {showFullContract && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-400">
                <FileText className="mr-2" />
                Complete Contract Preview
              </h3>
              <div className="bg-gray-800 p-6 rounded border border-gray-600">
                <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed text-gray-300">
                  {generateContract()}
                </pre>
                
                {/* Signature Display */}
                {signatureExists && (
                  <div className="mt-6 pt-4 border-t border-gray-600">
                    <p className="text-sm font-medium mb-2 text-blue-400">Client Signature:</p>
                    <img 
                      src={formData.signatureData} 
                      alt="Client Signature" 
                      className="border border-gray-500 p-2 bg-gray-900 max-h-20"
                    />
                  </div>
                )}
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateContract());
                    alert('Contract copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Copy Contract
                </button>
                <button
                  onClick={() => setShowFullContract(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pricing Breakdown Modal */}
        {showPricing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-400">
                <DollarSign className="mr-2" />
                Detailed Price Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-600 pb-2">
                  <span>{basePackage.name}</span>
                  <span className="font-medium">${basePackage.price}</span>
                </div>
                
                {Object.entries(formData).map(([key, qty]) => {
                  if (addOns[key] && qty > 0) {
                    const price = key === 'uplighting' ? getUplightingPrice() * qty : addOns[key].price * qty;
                    return (
                      <div key={key} className="flex justify-between border-b border-gray-600 pb-2">
                        <span>{addOns[key].name} x{qty}</span>
                        <span className="font-medium">${price}</span>
                      </div>
                    );
                  }
                  return null;
                })}
                
                {formData.travelDistance && travelFees[formData.travelDistance]?.price > 0 && (
                  <div className="flex justify-between border-b border-gray-600 pb-2">
                    <span>{travelFees[formData.travelDistance].name}</span>
                    <span className="font-medium">${travelFees[formData.travelDistance].price}</span>
                  </div>
                )}
                
                {getDiscountInfo() && (
                  <div className="flex justify-between border-b border-gray-600 pb-2 text-red-400">
                    <span>{getDiscountInfo().discount.name} (-{getDiscountInfo().discount.percentage}%)</span>
                    <span className="font-medium">-${getDiscountInfo().discountAmount.toFixed(0)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-xl font-bold pt-4 border-t-2 border-gray-600">
                  <span>Total:</span>
                  <span className="text-green-400">${calculateTotal().toLocaleString()}</span>
                </div>
                
                <div className="text-sm text-gray-400 mt-4">
                  <p><strong>Deposit:</strong> 50% (${(calculateTotal() * 0.5).toLocaleString()}) due to secure booking</p>
                  <p><strong>Balance:</strong> ${(calculateTotal() * 0.5).toLocaleString()} due day of event</p>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowPricing(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Email Modal */}
        {showInsuranceEmail && formData.venueInsuranceRequired && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-400">
                <Mail className="mr-2" />
                Insurance Certificate Email
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Subject:</label>
                  <input
                    type="text"
                    value={generateInsuranceEmail().subject}
                    readOnly
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Body:</label>
                  <textarea
                    value={generateInsuranceEmail().body}
                    readOnly
                    rows="12"
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-300 text-sm"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`Subject: ${generateInsuranceEmail().subject}\n\n${generateInsuranceEmail().body}`);
                      alert('Email copied to clipboard!');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Copy Email
                  </button>
                  <button
                    onClick={() => setShowInsuranceEmail(false)}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showContract && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md text-center border border-gray-700">
              <CheckCircle className="mx-auto mb-4 text-green-400" size={48} />
              <h3 className="text-xl font-semibold mb-2">Booking Complete!</h3>
              <p className="text-gray-400 mb-4">
                Your event booking has been submitted successfully. You will receive a confirmation email shortly with your contract and next steps.
              </p>
              <button
                onClick={() => setShowContract(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DymondAVBookingSystem;