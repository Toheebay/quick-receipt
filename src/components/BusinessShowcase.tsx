
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle } from 'lucide-react';

const BusinessShowcase = () => {
  const showcaseBusinesses = [
    {
      name: "Mama's Kitchen Restaurant",
      type: "Restaurant",
      color: "from-red-500 to-orange-500",
      description: "Professional food receipts with custom branding",
      features: ["Custom logo", "Food-specific layout", "Tax calculations"]
    },
    {
      name: "TechFix Repairs",
      type: "Service Center", 
      color: "from-blue-500 to-cyan-500",
      description: "Service receipts with repair details and warranty info",
      features: ["Service breakdown", "Warranty tracking", "Customer database"]
    },
    {
      name: "Belle Fashion Boutique",
      type: "Retail Store",
      color: "from-pink-500 to-purple-500", 
      description: "Elegant retail receipts with product details",
      features: ["Product catalog", "Size/color variants", "Return policy"]
    },
    {
      name: "QuickMart Grocery",
      type: "Grocery Store",
      color: "from-green-500 to-emerald-500",
      description: "Detailed grocery receipts with item categories",
      features: ["Bulk item handling", "Category grouping", "Discounts"]
    }
  ];

  return (
    <div className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here's how different businesses use our customized receipt apps to enhance their professional image and streamline operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {showcaseBusinesses.map((business, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className={`h-32 bg-gradient-to-br ${business.color} relative`}>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{business.name}</h3>
                  <p className="text-sm opacity-90">{business.type}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 mb-4 text-sm">{business.description}</p>
                <ul className="space-y-2">
                  {business.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Your Custom App?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join hundreds of Nigerian businesses already using our custom receipt apps. 
            Professional, branded, and designed specifically for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              View Live Demo
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
            >
              Download Sample Receipt
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>💰 <strong>Business Opportunity:</strong> Earn ₦50,000 - ₦200,000 monthly by offering this service to local businesses!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessShowcase;
