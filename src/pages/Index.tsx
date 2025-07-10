
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Plus, Trash2, Receipt, Download, Printer, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import PricingSection from '@/components/PricingSection';
import BusinessShowcase from '@/components/BusinessShowcase';

interface ReceiptItem {
  id: number;
  description: string;
  amount: number;
}

const Index = () => {
  const [businessName, setBusinessName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<ReceiptItem[]>([
    { id: 1, description: '', amount: 0 }
  ]);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Receipt-${customerName || 'Customer'}-${new Date().toLocaleDateString()}`,
  });

  const addItem = () => {
    const newId = Math.max(...items.map(item => item.id)) + 1;
    setItems([...items, { id: newId, description: '', amount: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: 'description' | 'amount', value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.amount || 0), 0);
  };

  const generateReceipt = () => {
    if (!businessName.trim()) {
      alert('Please enter business name');
      return;
    }
    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }
    if (items.every(item => !item.description.trim())) {
      alert('Please add at least one item');
      return;
    }
    setShowReceipt(true);
  };

  const resetForm = () => {
    setShowReceipt(false);
    setBusinessName('');
    setCustomerName('');
    setItems([{ id: 1, description: '', amount: 0 }]);
  };

  if (showCustomization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Receipt className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    QuickReceipt Pro
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-600">Get Your Custom Business App</p>
                </div>
              </div>
              <Button 
                onClick={() => setShowCustomization(false)}
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm"
              >
                ← Back to Demo
              </Button>
            </div>
          </div>
        </div>

        <PricingSection />
        <BusinessShowcase />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Receipt className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QuickReceipt
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">Professional Receipt Generator</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowCustomization(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs sm:text-sm"
              size="sm"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Get Custom Version
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 sm:py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs sm:text-sm">
            🌟 <strong>This is a demo version.</strong> Get your custom branded app with your logo, colors, and business info for just ₦2,000! 
            <button 
              onClick={() => setShowCustomization(true)}
              className="underline ml-1 sm:ml-2 hover:text-yellow-300"
            >
              Learn more →
            </button>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Input Form */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Receipt className="h-4 w-4 sm:h-5 sm:w-5" />
                  Receipt Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-sm font-medium text-gray-700">
                    Business Name *
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Enter your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                {/* Customer Name */}
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium text-gray-700">
                    Customer Name *
                  </Label>
                  <Input
                    id="customerName"
                    placeholder="Enter customer name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>

                {/* Items */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Items</Label>
                    <Button 
                      onClick={addItem}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                    >
                      <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {items.map((item, index) => (
                      <div key={item.id} className="flex gap-2 sm:gap-3 items-end">
                        <div className="flex-1">
                          <Input
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="border-gray-300 focus:border-blue-500 text-sm"
                          />
                        </div>
                        <div className="w-20 sm:w-32">
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={item.amount || ''}
                            onChange={(e) => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="border-gray-300 focus:border-blue-500 text-sm"
                          />
                        </div>
                        <Button
                          onClick={() => removeItem(item.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50 p-2"
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">₦{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={generateReceipt}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-sm sm:text-lg font-semibold"
                >
                  Generate Receipt
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Receipt Preview */}
          <div className="space-y-4 sm:space-y-6">
            {showReceipt && (
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gray-50 rounded-t-lg p-4 sm:p-6">
                  <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-base sm:text-lg">Receipt Preview</span>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handlePrint}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
                      >
                        <Printer className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Print
                      </Button>
                      <Button 
                        onClick={resetForm}
                        size="sm"
                        variant="outline"
                        className="text-xs sm:text-sm"
                      >
                        New Receipt
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div ref={receiptRef} className="p-4 sm:p-8 bg-white print:p-4">
                    {/* Receipt Header */}
                    <div className="text-center mb-4 sm:mb-6 pb-4 border-b-2 border-gray-300">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{businessName}</h2>
                      <p className="text-gray-600 text-sm sm:text-base">RECEIPT</p>
                      <p className="text-xs sm:text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-4 sm:mb-6">
                      <p className="text-gray-700 text-sm sm:text-base"><strong>Customer:</strong> {customerName}</p>
                    </div>

                    {/* Items List */}
                    <div className="mb-4 sm:mb-6">
                      <table className="w-full text-sm sm:text-base">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="text-left py-2 text-gray-700 text-xs sm:text-sm">Description</th>
                            <th className="text-right py-2 text-gray-700 text-xs sm:text-sm">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items
                            .filter(item => item.description.trim())
                            .map((item) => (
                            <tr key={item.id} className="border-b border-gray-100">
                              <td className="py-2 text-gray-800 text-xs sm:text-sm">{item.description}</td>
                              <td className="py-2 text-right text-gray-800 text-xs sm:text-sm">₦{item.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Total */}
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-lg sm:text-xl font-bold text-gray-800">
                      <span>TOTAL:</span>
                      <span>₦{calculateTotal().toLocaleString()}</span>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 sm:mt-8 pt-4 border-t border-gray-200 text-center">
                      <p className="text-xs sm:text-sm text-gray-600">Thank you for your business!</p>
                      <p className="text-xs text-gray-500 mt-2">Generated by QuickReceipt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!showReceipt && (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="bg-gray-100 rounded-full w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center mx-auto mb-4">
                    <Receipt className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Receipt Preview</h3>
                  <p className="text-sm sm:text-base text-gray-500">Fill in the details and click "Generate Receipt" to see your professional receipt here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-8 sm:mt-16">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">QuickReceipt Pro</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">Professional receipt generation for modern businesses</p>
            <div className="flex justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 flex-wrap">
              <span>✓ Fast & Reliable</span>
              <span>✓ Print Ready</span>
              <span>✓ Professional Design</span>
              <span>✓ Mobile Friendly</span>
            </div>
            
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
              <Button 
                onClick={() => setShowCustomization(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-xs sm:text-sm"
              >
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Get Your Custom Business App - Starting at ₦2,000
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
