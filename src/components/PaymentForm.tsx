
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2 } from 'lucide-react';

interface PaymentFormProps {
  packageType: 'basic' | 'premium';
  amount: number;
  onPaymentSuccess: (reference: string) => void;
}

declare global {
  interface Window {
    FlutterwaveCheckout: any;
  }
}

const PaymentForm: React.FC<PaymentFormProps> = ({ packageType, amount, onPaymentSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // You need to replace this with your actual Flutterwave public key
      const publicKey = "FLWPUBK_TEST-SANDBOX_PUBLIC_KEY_HERE"; // Replace with your actual public key
      
      if (!window.FlutterwaveCheckout) {
        alert('Payment system is loading. Please try again in a moment.');
        setIsLoading(false);
        return;
      }

      window.FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: `QR_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: amount,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        customer: {
          email: formData.email,
          phone_number: formData.phone,
          name: formData.name,
        },
        customizations: {
          title: "QuickReceipt Pro",
          description: `${packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package - Custom Receipt App`,
          logo: "",
        },
        callback: function (data: any) {
          console.log("Payment callback:", data);
          if (data.status === "successful") {
            onPaymentSuccess(data.tx_ref);
          } else {
            alert('Payment was not successful. Please try again.');
          }
          setIsLoading(false);
        },
        onclose: function () {
          console.log("Payment modal closed");
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      alert('There was an error processing your payment. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CreditCard className="h-5 w-5" />
            Customize Your Receipt App
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handlePayment} className="space-y-4">
            <div>
              <Label htmlFor="businessName" className="text-sm font-medium">Business Name *</Label>
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Your Business Name"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Contact Person *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="080XXXXXXXX"
                className="mt-1"
                required
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                {packageType.charAt(0).toUpperCase() + packageType.slice(1)} Package
              </h3>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">₦{amount.toLocaleString()}</p>
              <div className="text-sm text-gray-600 mt-2">
                {packageType === 'basic' ? (
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li>• Custom business branding</li>
                    <li>• Logo integration</li>
                    <li>• Color customization</li>
                    <li>• Print-ready receipts</li>
                  </ul>
                ) : (
                  <ul className="space-y-1 text-xs sm:text-sm">
                    <li>• Everything in Basic</li>
                    <li>• Multiple templates</li>
                    <li>• Customer database</li>
                    <li>• Monthly reports</li>
                    <li>• Priority support</li>
                  </ul>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ₦${amount.toLocaleString()} Now`
              )}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Note:</strong> After successful payment, we'll contact you within 24 hours to set up your customized receipt app with your branding and preferences.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentForm;
