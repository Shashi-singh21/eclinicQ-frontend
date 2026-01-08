// src/hospitalfdmodule/queue/PreScreeningForm.jsx
// Complete Updated File with Patient Details Support

import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp, AlertTriangle, Heart, Smile, Syringe, Users, MessageCircle, Calendar } from 'lucide-react';

export default function PreScreeningForm({ token, patientData, onClose }) {
  const [vitalsOpen, setVitalsOpen] = useState(true);
  const [biometricsOpen, setBiometricsOpen] = useState(false);
  const [medicalOpen, setMedicalOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('problems');
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [formData, setFormData] = useState({
    bpSys: '', bpDia: '', o2: '', pulse: '', resp: '', temp: '', glucose: '',
    heightFt: '', heightIn: '', weight: '', waist: '', bmi: '',
    problems: [], allergies: []
  });

  const [currentItem, setCurrentItem] = useState({
    name: '', since: '', severity: '', status: 'Active', note: ''
  });

  const handleAdd = () => {
    if (currentItem.name) {
      const key = activeTab === 'problems' ? 'problems' : 'allergies';
      setFormData(prev => ({
        ...prev,
        [key]: [...prev[key], { ...currentItem, id: Date.now() }]
      }));
      setCurrentItem({ name: '', since: '', severity: '', status: 'Active', note: '' });
      setShowAddForm(false);
    }
  };

  // Helper function to get gender symbol
  const getGenderSymbol = (gender) => {
    if (gender === 'M' || gender === 'Male') return '♂';
    if (gender === 'F' || gender === 'Female') return '♀';
    return '⚥';
  };

  // Helper function to format MRN
  const getMRN = (token) => {
    return `P${String(token).padStart(6, '0')}`;
  };

  const VitalInput = ({ label, value, unit, onChange, placeholder = "Value" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">{unit}</span>
      </div>
    </div>
  );

  const tabs = [
    { id: 'problems', icon: AlertTriangle, label: 'Problems' },
    { id: 'conditions', icon: Heart, label: 'Conditions' },
    { id: 'allergies', icon: Smile, label: 'Allergies' },
    { id: 'immunizations', icon: Syringe, label: 'Immunizations' },
    { id: 'family', icon: Users, label: 'Family History' },
    { id: 'social', icon: MessageCircle, label: 'Social' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[100000] flex items-center justify-end">
      <div className="bg-white h-full w-full max-w-3xl flex flex-col shadow-2xl">
        
        {/* Header with Patient Details */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Add Pre-Screening</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Patient Details Card */}
          <div className="bg-gray-50 rounded-lg border border-gray-200">
            <div className="px-4 py-3">
              <p className="text-xs text-gray-500 mb-2">Patient Details</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                    {patientData?.patientName ? patientData.patientName.charAt(0).toUpperCase() : 'P'}
                  </div>
                  
                  {/* Patient Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800">{patientData?.patientName || 'Patient Name'}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-600 mt-0.5">
                      <span>{patientData?.dob || 'DD/MM/YYYY'} ({patientData?.age || 'N/A'})</span>
                      <span className="flex items-center gap-1">
                        <span className={patientData?.gender === 'M' || patientData?.gender === 'Male' ? 'text-blue-500' : 'text-pink-500'}>
                          {getGenderSymbol(patientData?.gender)}
                        </span>
                        {patientData?.gender === 'M' ? 'Male' : patientData?.gender === 'F' ? 'Female' : 'Other'}
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🩸</span> {patientData?.bloodGroup || 'N/A'}
                      </span>
                      <span>MRN: {getMRN(token)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Token Number */}
                {token && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Token Number</p>
                    <p className="text-2xl font-semibold text-blue-600">{String(token).padStart(2, '0')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          
          {/* Vitals */}
          <div className="mb-4 border rounded-lg">
            <button
              onClick={() => setVitalsOpen(!vitalsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
              <span className="font-medium text-gray-800">Vitals</span>
              {vitalsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {vitalsOpen && (
              <div className="px-4 pb-4 space-y-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Pressure</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Value"
                          value={formData.bpSys}
                          onChange={(e) => setFormData(p => ({ ...p, bpSys: e.target.value }))}
                          className="w-full px-3 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Sys</span>
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="1"
                          value={formData.bpDia}
                          onChange={(e) => setFormData(p => ({ ...p, bpDia: e.target.value }))}
                          className="w-full px-3 py-2 pr-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Dia</span>
                      </div>
                    </div>
                  </div>
                  <VitalInput label="Oxygen Saturation" value={formData.o2} unit="%" 
                    onChange={(e) => setFormData(p => ({ ...p, o2: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <VitalInput label="Pulse Rate" value={formData.pulse} unit="bpm" 
                    onChange={(e) => setFormData(p => ({ ...p, pulse: e.target.value }))} />
                  <VitalInput label="Respiratory Rate" value={formData.resp} unit="rpm" 
                    onChange={(e) => setFormData(p => ({ ...p, resp: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <VitalInput label="Body Temperature" value={formData.temp} unit="F" 
                    onChange={(e) => setFormData(p => ({ ...p, temp: e.target.value }))} />
                  <VitalInput label="Blood Glucose Level" value={formData.glucose} unit="mg/dl" 
                    onChange={(e) => setFormData(p => ({ ...p, glucose: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input type="text" placeholder="Value" value={formData.heightFt}
                          onChange={(e) => setFormData(p => ({ ...p, heightFt: e.target.value }))}
                          className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ft</span>
                      </div>
                      <div className="relative flex-1">
                        <input type="text" placeholder="1" value={formData.heightIn}
                          onChange={(e) => setFormData(p => ({ ...p, heightIn: e.target.value }))}
                          className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">in</span>
                      </div>
                    </div>
                  </div>
                  <VitalInput label="Weight" value={formData.weight} unit="kg" 
                    onChange={(e) => setFormData(p => ({ ...p, weight: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <VitalInput label="Waist Circumference" value={formData.waist} unit="cm" 
                    onChange={(e) => setFormData(p => ({ ...p, waist: e.target.value }))} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
                    <input type="text" placeholder="Value" value={formData.bmi}
                      onChange={(e) => setFormData(p => ({ ...p, bmi: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Biometrics */}
          <div className="mb-4 border rounded-lg">
            <button onClick={() => setBiometricsOpen(!biometricsOpen)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <span className="font-medium text-gray-800">Biometrics</span>
              {biometricsOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            {biometricsOpen && (
              <div className="px-4 pb-4 space-y-4 border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input type="text" placeholder="Value" className="w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ft</span>
                      </div>
                      <div className="relative flex-1">
                        <input type="text" placeholder="1" className="w-full px-3 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500" />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">in</span>
                      </div>
                    </div>
                  </div>
                  <VitalInput label="Weight" value="" unit="kg" onChange={() => {}} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <VitalInput label="Waist Circumference" value="" unit="cm" onChange={() => {}} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">BMI</label>
                    <input type="text" placeholder="Value" className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Medical History */}
          <div className="mb-4 border rounded-lg">
            <button onClick={() => setMedicalOpen(!medicalOpen)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50">
              <span className="font-medium text-gray-800">Medical History</span>
              {medicalOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            
            {medicalOpen && (
              <div className="border-t">
                <div className="flex border-b overflow-x-auto">
                  {tabs.map(({ id, icon: Icon, label }) => (
                    <button key={id} onClick={() => { setActiveTab(id); setShowAddForm(false); }}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                        activeTab === id ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-800'
                      }`}>
                      <Icon className="h-4 w-4" />
                      {label}
                    </button>
                  ))}
                </div>

                <div className="px-4 py-4">
                  {!showAddForm ? (
                    <div>
                      {formData[activeTab]?.length === 0 || !formData[activeTab] ? (
                        <div className="text-center py-8">
                          <p className="text-sm text-gray-500 mb-4">No {activeTab} added yet</p>
                          <button onClick={() => setShowAddForm(true)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            + Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                          </button>
                        </div>
                      ) : (
                        <div>
                          {formData[activeTab].map((item) => (
                            <div key={item.id} className="border rounded-lg p-3 mb-2">
                              <p className="font-medium text-gray-800">{item.name}</p>
                              <p className="text-sm text-gray-600">Since: {item.since}</p>
                            </div>
                          ))}
                          <button onClick={() => setShowAddForm(true)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2">
                            + Add {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {activeTab === 'problems' ? 'Problem' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)} <span className="text-red-500">*</span>
                        </label>
                        <input type="text" placeholder={`Search or Enter ${activeTab}`} value={currentItem.name}
                          onChange={(e) => setCurrentItem(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Since <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <input 
                              type="date" 
                              value={currentItem.since}
                              onChange={(e) => setCurrentItem(p => ({ ...p, since: e.target.value }))}
                              className="w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Severity <span className="text-red-500">*</span></label>
                          <select value={currentItem.severity}
                            onChange={(e) => setCurrentItem(p => ({ ...p, severity: e.target.value }))}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="">Select Severity</option>
                            <option value="Mild">Mild</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Status <span className="text-red-500">*</span></label>
                        <div className="flex gap-6">
                          {['Active', 'Inactive', 'Resolved', 'Enter In Error'].map((status) => (
                            <label key={status} className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="status" value={status}
                                checked={currentItem.status === status}
                                onChange={(e) => setCurrentItem(p => ({ ...p, status: e.target.value }))}
                                className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-gray-700">{status}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Note</label>
                        <textarea placeholder="Enter Note" value={currentItem.note}
                          onChange={(e) => setCurrentItem(p => ({ ...p, note: e.target.value }))}
                          rows={4} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                      </div>

                      <div className="flex gap-2 justify-end">
                        <button onClick={handleAdd}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border hover:bg-gray-50 rounded-md">
                          Save
                        </button>
                        <button onClick={() => setShowAddForm(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                          Discard
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}