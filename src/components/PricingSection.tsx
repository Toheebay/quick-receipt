
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Crown, Palette, FileText, Users, BarChart3 } from 'lucide-react';
import PaymentForm from './PaymentForm';

const PricingSection = () => {
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'premium' | null>(null);
  const [showPayment, setShowPayment] = useState(false);

  const packages = [
    {
      id: 'basic' as const,
      name: 'Basic Package',
      price: 2000,
      icon: Palette,
      popular: false,
      features: [
        'Custom business branding',
        'Logo integration',
        'Color theme customization',
        'Print-ready receipt format',
        'Basic template design',
        'Email support'
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium Package',
      price: 4500,
      icon: Crown,
      popular: true,
      features: [
        'Everything in Basic Package',
        'Multiple receipt templates',
        'Customer database storage',
        'Monthly sales reports',
        'Advanced customization options',
        'Priority WhatsApp support',
        'Free updates for 6 months'
      ]
    }
  ];

  const handlePackageSelect = (packageId: 'basic' | 'premium') => {
    setSelectedPackage(packageId);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (reference: string) => {
    alert(`Payment successful! Reference: ${reference}\nWe'll contact you within 24 hours to set up your customized receipt app.`);
    setShowPayment(false);
    setSelectedPackage(null);
  };

  if (showPayment && selectedPackage) {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage)!;
    return (
      <PaymentForm 
        packageType={selectedPackage}
        amount={selectedPkg.price}
        onPaymentSuccess={handlePaymentSuccess}
      />
    );
  }

  return (
    <div className="py-8 sm:py-16 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Get Your Custom Receipt App
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Transform your business with a professional, branded receipt generator. 
            Perfect for restaurants, shops, services, and any business that needs professional receipts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {packages.map((pkg) => {
            const IconComponent = pkg.icon;
            return (
              <Card 
                key={pkg.id}
                className={`relative shadow-lg border-0 ${
                  pkg.popular 
                    ? 'ring-2 ring-purple-500 bg-white md:transform md:scale-105' 
                    : 'bg-white/80 backdrop-blur-sm'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4 p-4 sm:p-6">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-2xl font-bold">{pkg.name}</CardTitle>
                  <div className="text-2xl sm:text-4xl font-bold text-blue-600 mt-2">
                    ₦{pkg.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">One-time payment</p>
                </CardHeader>
                
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                  <ul className="space-y-2 sm:space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`w-full py-3 text-sm sm:text-lg font-semibold ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
                  >
                    Get Started Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">Why Choose Our Custom Receipt App?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-base sm:text-lg mb-2">Professional Receipts</h4>
              <p className="text-sm sm:text-base text-gray-600">Clean, professional receipt designs that make your business look trustworthy and established.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-base sm:text-lg mb-2">Customer Trust</h4>
              <p className="text-sm sm:text-base text-gray-600">Build customer confidence with branded, professional receipts that reflect your business quality.</p>
            </div>
            <div className="text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-base sm:text-lg mb-2">Business Growth</h4>
              <p className="text-sm sm:text-base text-gray-600">Track sales, manage customers, and grow your business with our integrated tools.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
