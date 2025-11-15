import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Phone, Mail, MapPin, Languages, Plus, MoreHorizontal } from 'lucide-react';
import AvatarCircle from '../../../components/AvatarCircle';
import Badge from '../../../components/Badge';
import PatientVitals from './PatientVitals';
import PatientAppointments from './PatientAppointments';
import PatientMedicalHistory from './PatientMedicalHistory';
import PatientDocuments from './PatientDocuments';
import PatientDemographics from './PatientDemographics';

export default function PatientDetails() {
  const { id } = useParams();
  // in a real app, load by id from route and fetch details
  const patient = history.state?.usr?.patient || history.state?.patient || {};
  const name = patient.name || 'Rahul Sharma';
  const mrn = patient.patientId || 'P654321';
  const gender = patient.gender || 'M';
  const dob = patient.dob || '12/05/1985 (39y, 7m)';
  const blood = patient.blood || 'B+';

  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="bg-white px-4 py-3 rounded-md border border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AvatarCircle name={name} size="m" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-800">{name}</span>
              <span className="text-xs text-gray-500">{dob}</span>
              <span className="text-xs text-gray-500">{gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender}</span>
              <span className="text-xs text-gray-500">{blood}</span>
            </div>
            <div className="text-xs text-blue-600">
              MRN: {mrn} · ABHA ID: <a className="underline" href="#">ABHA-98765-XYZ</a> · <button className="underline">Add Tags</button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Badge type="ghost" color="blue">Start Visit</Badge>
          <Badge type="ghost" color="gray">Schedule</Badge>
          <Badge type="ghost" color="gray">Call</Badge>
          <Badge type="ghost" color="gray">Add Vitals</Badge>
          <button className="p-1.5 rounded hover:bg-gray-100"><MoreHorizontal className="h-4 w-4" /></button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 rounded-md border border-gray-200">
        <div className="flex items-center gap-6 text-sm h-10">
          <button onClick={() => setActiveTab('overview')} className={`h-10 ${activeTab==='overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Overview</button>
          <button onClick={() => setActiveTab('vitals')} className={`h-10 ${activeTab==='vitals' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Vitals & Biometrics</button>
          <button onClick={() => setActiveTab('appointment')} className={`h-10 ${activeTab==='appointment' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Appointment</button>
          <button onClick={() => setActiveTab('medical')} className={`h-10 ${activeTab==='medical' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Medical History</button>
          <button onClick={() => setActiveTab('documents')} className={`h-10 ${activeTab==='documents' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Documents</button>
          <button onClick={() => setActiveTab('demographics')} className={`h-10 ${activeTab==='demographics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>Demographics</button>
        </div>
        {activeTab === 'overview' && (
        <div className="grid grid-cols-3 gap-6 py-4">
          {/* Contact Info */}
          <div className="col-span-1">
            <div className="font-semibold text-gray-800 mb-2">Contact Info</div>
            <div className="flex flex-col gap-1 text-sm text-gray-700">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> +91 91753 67487 <Badge size="s" type="ghost" color="yellow">Primary</Badge></div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-gray-500" /> +91 87654 32109 <span className="text-xs text-gray-500">Secondary</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gray-500" /> Rahul.Sharma@gmail.com</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gray-500" /> Jawahar Nagar, Akola - 444001</div>
              <div className="flex items-center gap-2"><Languages className="h-4 w-4 text-gray-500" /> English/Hindi/Marathi</div>
            </div>
            <div className="mt-6">
              <div className="font-semibold text-gray-800 mb-2">Last Recorded Chief Complaint</div>
              <div className="text-sm text-gray-700">Cough <Badge size="s" type="ghost" color="red">Severe</Badge></div>
              <div className="text-xs text-gray-500">Since : 09/01/2025 (9 Days)</div>
            </div>
          </div>

          {/* Last Visit */}
          <div className="col-span-1">
            <div className="font-semibold text-gray-800 mb-2">Last Visit</div>
            <div className="grid grid-cols-3 gap-y-1 text-sm text-gray-700">
              <div className="text-gray-500">Date:</div>
              <div className="col-span-2">28 Dec 2023 at 2:30 PM</div>
              <div className="text-gray-500">Doctor:</div>
              <div className="col-span-2">Dr. Milind Chauhan</div>
              <div className="text-gray-500">Type:</div>
              <div className="col-span-2">Consultation</div>
              <div className="text-gray-500">Reason:</div>
              <div className="col-span-2">Hypertension evaluation</div>
              <div className="text-gray-500">Status:</div>
              <div className="col-span-2 text-green-600">Completed (05:30 Mins)</div>
              <div className="col-span-3 text-xs text-blue-600 mt-2"><button className="underline">View Prescription →</button></div>
            </div>
            <div className="mt-6">
              <div className="font-semibold text-gray-800 mb-2">Dependant <button className="text-xs text-blue-600 ml-2">+ Add New</button></div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <AvatarCircle name="Rashmi Sharma" size="s" />
                <div>
                  <div>Rashmi Sharma <span className="text-xs text-gray-500">Dependant</span></div>
                  <div className="text-xs text-gray-500">Wife · +91 91753 67487</div>
                </div>
                <button className="ml-auto p-1.5 rounded hover:bg-gray-100"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>
          </div>

          {/* Last Recorded Vitals & Biometrics */}
          <div className="col-span-1">
            <div className="font-semibold text-gray-800 mb-2">Last Recorded Vitals & Biometrics</div>
            <div className="text-xs text-gray-500 mb-1">Recorded on 06/01/2025 by Dr. Milind Chauhan</div>
            <div className="text-sm text-gray-700 space-y-1">
              <div className="flex justify-between"><span>Blood Pressure:</span> <span>130/85 <span className="text-red-500">↑</span></span></div>
              <div className="flex justify-between"><span>Oxygen Saturation:</span> <span>98%</span></div>
              <div className="flex justify-between"><span>Temperature:</span> <span>103 F <span className="text-red-500">↑</span></span></div>
              <div className="flex justify-between"><span>Weight:</span> <span>75 Kgs</span></div>
            </div>
          </div>
        </div>
        )}
        {activeTab === 'vitals' && (
          <div className="py-2">
            <PatientVitals embedded />
          </div>
        )}
        {activeTab === 'appointment' && (
          <div className="py-2">
            <PatientAppointments />
          </div>
        )}
        {activeTab === 'medical' && (
          <div className="py-2">
            <PatientMedicalHistory />
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="py-2">
            <PatientDocuments />
          </div>
        )}
        {activeTab === 'demographics' && (
          <div className="py-2">
            <PatientDemographics />
          </div>
        )}
      </div>
    </div>
  );
}
