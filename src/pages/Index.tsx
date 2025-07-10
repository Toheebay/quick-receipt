
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Plus, Trash2, Receipt, Download, Print } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Receipt className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QuickReceipt
              </h1>
              <p className="text-sm text-gray-600">Professional Receipt Generator</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Receipt Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
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
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
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
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {/* Items */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium text-gray-700">Items</Label>
                    <Button 
                      onClick={addItem}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Item
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div key={item.id} className="flex gap-3 items-end">
                        <div className="flex-1">
                          <Input
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <div className="w-32">
                          <Input
                            type="number"
                            placeholder="Amount"
                            value={item.amount || ''}
                            onChange={(e) => updateItem(item.id, 'amount', parseFloat(e.target.value) || 0)}
                            className="border-gray-300 focus:border-blue-500"
                          />
                        </div>
                        <Button
                          onClick={() => removeItem(item.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          disabled={items.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">₦{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={generateReceipt}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                >
                  Generate Receipt
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Receipt Preview */}
          <div className="space-y-6">
            {showReceipt && (
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader className="bg-gray-50 rounded-t-lg">
                  <CardTitle className="flex items-center justify-between">
                    <span>Receipt Preview</span>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handlePrint}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Print className="h-4 w-4 mr-1" />
                        Print
                      </Button>
                      <Button 
                        onClick={resetForm}
                        size="sm"
                        variant="outline"
                      >
                        New Receipt
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div ref={receiptRef} className="p-8 bg-white print:p-4">
                    {/* Receipt Header */}
                    <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">{businessName}</h2>
                      <p className="text-gray-600">RECEIPT</p>
                      <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                    </div>

                    {/* Customer Info */}
                    <div className="mb-6">
                      <p className="text-gray-700"><strong>Customer:</strong> {customerName}</p>
                    </div>

                    {/* Items List */}
                    <div className="mb-6">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-300">
                            <th className="text-left py-2 text-gray-700">Description</th>
                            <th className="text-right py-2 text-gray-700">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items
                            .filter(item => item.description.trim())
                            .map((item) => (
                            <tr key={item.id} className="border-b border-gray-100">
                              <td className="py-2 text-gray-800">{item.description}</td>
                              <td className="py-2 text-right text-gray-800">₦{item.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Total */}
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                      <span>TOTAL:</span>
                      <span>₦{calculateTotal().toLocaleString()}</span>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                      <p className="text-sm text-gray-600">Thank you for your business!</p>
                      <p className="text-xs text-gray-500 mt-2">Generated by QuickReceipt</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!showReceipt && (
              <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <Receipt className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Receipt Preview</h3>
                  <p className="text-gray-500">Fill in the details and click "Generate Receipt" to see your professional receipt here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">QuickReceipt Pro</h3>
            <p className="text-gray-600 mb-4">Professional receipt generation for modern businesses</p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <span>✓ Fast & Reliable</span>
              <span>✓ Print Ready</span>
              <span>✓ Professional Design</span>
              <span>✓ Mobile Friendly</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
